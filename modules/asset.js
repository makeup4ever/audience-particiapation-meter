
const log = require('npmlog');
const Stellar = require('stellar-sdk');
const { HORIZON_ENDPOINT, SERVER_CONFIG } = require('../config');
const server = new Stellar.Server(HORIZON_ENDPOINT, SERVER_CONFIG);

const { bulkOperations, getTransactionUrl } = require('./transaction');

function assetInstance(asset){

  if(asset instanceof Stellar.Asset){

    return asset;

  }

  if(asset.asset_type === 'native'){

    return Stellar.Asset.native();

  }

  return new Stellar.Asset(asset.asset_code, asset.asset_issuer);

}

function assetUid(rawAsset){

  const asset = assetInstance(rawAsset);

  if(asset.isNative() ){

    return 'native';
  
  }