const log = require('npmlog');
const Stellar = require('stellar-sdk');
const { HORIZON_ENDPOINT, SERVER_CONFIG } = require('../config');
const server = new Stellar.Server(HORIZON_ENDPOINT, SERVER_CONFIG);
const { assetInstance, assetUid } = require('../modules/asset');

function deleteOfferOperation(offer){

  log.info('offer', `Delete|assetSelling:${assetUid(offer.selling.asset)}|assetBuying:${assetUid(offer.buying.asset)}|LastAmount:${offer.amount}`); // eslint-disable-line max-len

  return Stellar.Operation.manageOffer({
    selling: offer.selling.asset,
    buying: offer.buying.asset,
    amount: '0',
    pri