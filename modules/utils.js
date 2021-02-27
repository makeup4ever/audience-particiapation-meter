
const BigNumber = require('bignumber.js');

function sleep(time){

  return new Promise(resolve => setTimeout(resolve, time) );

}

function parseAsync(jsonRes){

  return Promise.resolve(JSON.parse(jsonRes) );
