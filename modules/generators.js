
require('../config/globalConfig');
const Stellar = require('stellar-sdk');
const rp = require('request-promise');
const log = require('npmlog');
const { HORIZON_ENDPOINT } = require('../config');
const { showWallets } = require('../modules/wallet');
const payment = require('../modules/payment');
const { trustAssets } = require('../modules/asset');
const { loadAccount } = require('../modules/account');

async function generatePair(){

  const pair = Stellar.Keypair.random();

  await rp.get({
    url: `${HORIZON_ENDPOINT}/friendbot`,
    qs: { addr: pair.accountId() },
    json: true
  });

  // log.info('generatePair', `Success|accountId:${pair.accountId()}`);

  return pair;