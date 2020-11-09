const log = require('npmlog');
const Stellar = require('stellar-sdk');
const { HORIZON_ENDPOINT, SERVER_CONFIG } = require('../config');
const server = new Stellar.Server(HORIZON_ENDPOINT, SERVER_CONFIG);
const { assetInstance, assetUid } = require('../modules/asset');

function deleteOfferOperation(offer){

  log.info('offer', `Delete|assetSelling:${assetUid(offer.selling.asset)}|assetBuying:${a