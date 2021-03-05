const log = require('npmlog');
const BigNumber = require('bignumber.js');
const { assetUid } = require('../modules/asset');

function showWallets(account){

  return account.bal