const log = require('npmlog');
const Stellar = require('stellar-sdk');
const { HORIZON_ENDPOINT, SERVER_CONFIG } = require('../config');
const server = new Stellar.Server(HORIZON_ENDPOINT, SERVER_CONFIG);

function bulkOperations(transactionBuilder, operations){

  operations.forEach(operation => transactionBuilder.addOperation(operation) );

}

function getTransactionUrl(transactionRes){

  return transactionRes._links.transaction.href; // eslint-disable-line no-underscore-dangle

}

async function submitTransaction(operations, account, pair){

  if(operations.length === 0){

    log.info('submitTransaction', 'No operations');

    return false;

  }

  log.info('transaction', `SendOperations:${operations.length}|Accou