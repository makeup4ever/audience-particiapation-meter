
const log = require('npmlog');
const Stellar = require('stellar-sdk');
const { HORIZON_ENDPOINT, SERVER_CONFIG } = require('../config');
const server = new Stellar.Server(HORIZON_ENDPOINT, SERVER_CONFIG);
const { assetInstance } = require('../modules/asset');

async function loadAccountFromSeed(seed){