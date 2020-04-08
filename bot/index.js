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

      running = await this.makeOffers().catch(err =>