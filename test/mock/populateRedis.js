
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
        }),
        value: '0.7'
      },
      {
        asset: assetInstance({ asset_type: 'native' }),
        value: '1.1'
      }
    ]
  },
  {
    min: '200',
    perc: '0.5',
    asset: assetInstance({
      asset_code: 'AS2', asset_issuer: 'AS2_ISSUER'
    }),
    rates: [
      {
        asset: assetInstance({
          asset_code: 'AS1', asset_issuer: 'AS1_ISSUER'
        }),
        value: '1.5'
      },
      {
        asset: assetInstance({ asset_type: 'native' }),
        value: '0.4'
      }
    ]
  },
  {
    min: '500',
    perc: '0.1',
    asset: assetInstance({ asset_type: 'native' }),