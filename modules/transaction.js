const log = require('npmlog');
const Stellar = require('stellar-sdk');
const { HORIZON_ENDPOINT, SERVER_CONFIG } = require('../config');
const server = new Stellar.Se