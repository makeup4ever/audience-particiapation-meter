require('../config/globalConfig');

const log = require('npmlog');
const rp = require('request-promise');
const { ORACLE_CHECK_PRICE_TIMER } = require('../config');
const { parseAsync, sleep, priceToNumber } = require('../modules/utils');
const assetCodes = ['EUR', 'USD', 'JPY'];
const base = 'USD';
const apiUrlRealWorld = `http://api.fixer.io/latest?base=${base}`;

function fixerCall(){

  return rp(apiUrlRealWorld)
    .then(parseAsync)
    .then(priceRes => assetCodes.filter(assetCode => assetCode !== base).reduce( (acc, assetCode) => acc.concat([
      {
        selling: priceRes.base,
        buying: assetCode,
        rate: priceToNumber({
          n: '1',
          d: priceRes.rates[assetCode].toString()
        })
      },
      {
        selling: assetCode,
        buying: priceRes.base,
        rate: priceToNumber({
          n: priceRes.rates[assetCode].toString(),
          d: '1'
        })
      }
    ]), []) )
    .catch(err => log.error('fixerCall', err) );

}

class Oracle {

  constructor(){

    this.run = false;
    this.pricesHash = {};

  }

  async getPrice(assetSelling, assetBuying){

    if(assetSelling.isNative() ){

      return false;

    }

    if(typeof this.pricesHash[assetSelling.code] === 'object' && typeof this.pricesHash[assetSelling.code][assetBuying.code] === 'object'){

      // log.info('getPrice', `assetSelling:${assetUid(assetSelling)}|Price:${0}|assetBuying:${assetUid(assetBuying)}`);

      return this.pricesHash[assetSelling.code][assetBuying.code];

    }

    return false;

  }

  setPrice(assetSelling, assetBuying, price){

    if(typeof this.pricesHash[assetSelling.code] 