require('../config/globalConfig');

const log = require('npmlog');
const rp = require('request-promise');
const { ORACLE_CHECK_PRICE_TIMER } = require('../config');
const { parseAsync, sleep, priceToNumber } = require('../modules/utils');
const assetCodes = ['EUR', 'USD', 'JPY'];
const base = 'USD';
const apiUrlRealWorld = `http://api.fixer.io/latest?base=${base}`;

fu