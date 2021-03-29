require('../config/globalConfig');

const log = require('npmlog');
const rp = require('request-promise');
const { ORACLE_CHECK_PRICE_TIMER } = require('../config');
const { parseAsync