const log = require('npmlog');
const Stellar = require('stellar-sdk');
const { HORIZON_ENDPOINT, SERVER_CONFIG, BOT_CHECK_BALANCE_TIMER, TRANSACTION_MAX_TIME } = require('../config');
const server = new Stellar.Server(HORIZON_ENDPOINT, SERVER_CONFIG);
const { sleep } = require('../modules/utils');
const { showWallets } = require('../modules/wallet');
const { removePrevUpOffers, deleteOfferOperation, patchOffers, fetchOffers, fi