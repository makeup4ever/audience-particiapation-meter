
const log = require('npmlog');
const { ORACLE_CHECK_PRICE_TIMER } = require('../config');
const { sleep } = require('../modules/utils');

class Oracle {

  constructor({ checkPriceTimer = ORACLE_CHECK_PRICE_TIMER, bidNative = false, pricesHash = {}, autoRun = false }){