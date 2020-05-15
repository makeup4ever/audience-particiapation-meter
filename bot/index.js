const log = require('npmlog');
const Stellar = require('stellar-sdk');
const { HORIZON_ENDPOINT, SERVER_CONFIG, BOT_CHECK_BALANCE_TIMER, TRANSACTION_MAX_TIME } = require('../config');
const server = new Stellar.Server(HORIZON_ENDPOINT, SERVER_CONFIG);
const { sleep } = require('../modules/utils');
const { showWallets } = require('../modules/wallet');
const { removePrevUpOffers, deleteOfferOperation, patchOffers, fetchOffers, filterOffers } = require('../modules/offers');
const { submitTransaction } = require('../modules/transaction');
const { loadAccountFromSeed } = require('../modules/account');
const { assetUid } = require('../modules/asset');
const BigNumber = require('bignumber.js');

class Bot {

  constructor(seed, oracle){

    this.seed = seed;
    this.oracle = oracle;

  }

  async run(){

    const { account, pair } = await loadAccountFromSeed(this.seed);
    const actualOffers = await fetchOffers(account);

    patchOffers(actualOffers, account);

    this.account = account;
    this.keypair = pair;

    if(actualOffers.length > 0){

      await submitTransaction(actualOffers.map(deleteOfferOperation), this.account, this.keypair);
      await sleep(TRANSACTION_MAX_TIME);

    }

    this.startTime = Date.now();
    let running = true;

    while(running){

      running = await this.makeOffers().catch(err => log.error('makeOffers', err) );
      await sleep(BOT_CHECK_BALANCE_TIMER * 1000);

    }

    return true;

  }

  async makeOffers(){

    const newBotAccount = await server.loadAccount(this.keypair.accountId() );
    const actualOffers = await fetchOffers(newBotAccount);

    patchOffers(actualOffers, newBotAccount);

    log.info('offer', `Offers:${actualOffers.length}|Balance:${showWallets(newBotAccount)}|Time:${(Date.now() - this.startTime) / 1000}`); // eslint-disable-line max-len

    const operations = await this.updateOffers(newBotAccount.balances, actualOffers);

    if(operations.length > 0){

      await submitTransaction(operations, newBotAccount, this.keypair);

    }

    return true;

  }

  async operationsTradeWallet({ actualOffers, wallet, walletTrade }){ // eslint-disable-line max-statements, complexity

    let operations = [];
    const lastOffers = filterOffers(actualOffers, wallet.asset, walletTrade.asset);
    const bnActualBalance = new BigNumber(wallet.balance);
    const price = await this.oracle.getPrice(wallet.asset, walletTrade.asset);

    if(bnActualBalance.isZero() || !price || wallet.asset.isNative() ){

      return lastOffers.map(deleteOfferOperation);

    }

    const updateAmount = await this.oracle.getAmount(wallet);
    const bnUpdateAmount = new BigNumber(updateAmount);

    if(lastOffers.length > 0){

      const lastOffer = lastOffers[0];
      const bnActualOfferAmount = new BigNumber(lastOffer.amount);

      operations = operations.concat(removePrevUpOffers(lastOffers) );


      if(bnActualOfferAmount.equals(bnUpdateAmount) && lastOffer.price_r.n === price.n && lastOffer.price_r.d === price.d){

        // log.silly('price', `NoChangeOffer|
        // Selling:${assetUid(wallet.asset)}|
        // Buying:${assetUid(lastOffer.buying.asset)}|
        // Price:${price}|Balance:${wallet.balance}`);

      } else{

        log.info('price', `UpdateOffer|Selli