/* eslint max-nested-callbacks:[2, 5], array-callback-return: 0, camelcase: 0 */

const { getUpWallets, showWallets } = require('../../modules/wallet');
const { assetInstance } = require('../../modules/asset');

describe('Wallet', () => {

  describe('getUpWal