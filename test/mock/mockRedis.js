const redis = require('redis');
const { DB_HOST } = require('../../config/index');

module.exports = function mockCreateClient(){

  return redis.create