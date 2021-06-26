const Decimal = require('decimal.js');
const log = require('npmlog');
const { DB_HOST } = require('../config/index');
const redis = require('redis');
const client = redis.createClient({ host: DB_HOST });

function magicChoice(balance, bnRate, bnPerc, bnMin){

  const bnBalance = new Decimal(balance);
  const amountPerc = bnPerc.mul(bnBalance);
  const amountMin = bnBalance.sub(bnMin);

  if(amountPerc.greaterThan(amountMin) && amountPerc.isPositive() && !amountPerc.isZero() ){

    return {
      amount: amountPerc,
      value: bnRate
    };

  } else if(amountMin.isPositive() && !amountMin.isZero() ){

    return {
      amount: amountMin,
      value: bnRate
    };

  }

  log.info('getPrice', `NoTrade|bgMin:${bnMin}|bgPerc${bnPerc}|Rate:${bnRate.toString()}|Balance:${balance}`);

  return false;

}

class Oracle {
  static async getPrice(assetSelling, assetBuying){ // eslint-disable-line max-statements, complexity

    const key = `${assetSelling.isNative() ? 'NATIVE-' : ''}${assetBuying.getCode()}:${assetBuying.isNative() ? 'NATIVE-' : ''}${assetBuying.getCode()}`; // eslint-disable-line max-len
    const rateRes = await client.hmgetAsync(key, 'price');

    if(typeof rateRes[0] !== 'string'){

      log.error('getPrice', `NoRate:${key}|Balance:${assetSelling.balance}`);

      return false;

    }

    const bnRate = new Decimal(rateRes[0]);
    const assetKey = `${assetSelling.isNative() ? 'NATIVE-' : ''}${assetSelling.getCode()}`;
    const assetRes = a