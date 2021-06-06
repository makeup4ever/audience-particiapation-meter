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

  } else if(amountMin.isPositi