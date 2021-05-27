const Decimal = require('decimal.js');
const log = require('npmlog');
const { DB_HOST } = require('../config/index');
const redis = require('redis