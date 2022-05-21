
/* eslint camelcase: 0 */

require('./../../config/globalConfig');
require('./../test.config.js');
const log = require('npmlog');
const redis = require('redis');
const { assetInstance } = require('../../modules/utils');

const walletsTrade = [
  {
    min: '100',
    perc: '0.8',
    asset: assetInstance({
      asset_code: 'AS1', asset_issuer: 'AS1_ISSUER'
    }),
    rates: [
      {
        asset: assetInstance({
          asset_code: 'AS2', asset_issuer: 'AS2_ISSUER'