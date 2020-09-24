require('../config/globalConfig');
const log = require('npmlog');
const jsonFile = require('jsonfile');

const { genIssuer, genAnchor, genBot } = require('../modules/generators');

async function launch(){

  const issuers = await Promise.all([genIssuer('USD'), genIssuer('EUR'), genIssuer('JPY')]);
  const anchors = await Promise.all(issuers.map(issuer => genAnchor(iss