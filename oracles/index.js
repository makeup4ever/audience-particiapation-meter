
const log = require('npmlog');
const { ORACLE_CHECK_PRICE_TIMER } = require('../config');
const { sleep } = require('../modules/utils');

class Oracle {

  constructor({ checkPriceTimer = ORACLE_CHECK_PRICE_TIMER, bidNative = false, pricesHash = {}, autoRun = false }){

    this.run = false;
    this.pricesHash = pricesHash;
    this.checkPriceTimer = checkPriceTimer;
    this.bidNative = bidNative;

    if(autoRun){

      this.update();

    }

  }

  async getPrice(assetSelling, assetBuying){

    if(assetSelling.isNative() && !this.bidNative){

      return false;

    }

    if(typeof this.pricesHash[assetSelling.code] === 'object' && typeof this.pricesHash[assetSelling.code][assetBuying.code] === 'object'){

      // log.info('getPrice', `assetSelling:${assetUid(assetSelling)}|Price:${0}|assetBuying:${assetUid(assetBuying)}`);

      return this.pricesHash[assetSelling.code][assetBuying.code];

    }

    return false;

  }
