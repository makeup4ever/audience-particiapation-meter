const log = require('npmlog');
const BigNumber = require('bignumber.js');
const { assetUid } = require('../modules/asset');

function showWallets(account){

  return account.balances.map(wallet => `${assetUid(wallet.asset)}|Balance:${wallet.balance}`); // eslint-disable-