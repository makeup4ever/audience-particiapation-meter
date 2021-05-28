const Decimal = require('decimal.js');
const log = require('npmlog');
const { DB_HOST } = require('../config/index');
const redis = require('redis');
const client = redis.createClient({ host: DB_HOST });

func