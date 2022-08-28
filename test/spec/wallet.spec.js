/* eslint max-nested-callbacks:[2, 5], array-callback-return: 0, camelcase: 0 */

const { getUpWallets, showWallets } = require('../../modules/wallet');
const { assetInstance } = require('../../modules/asset');

describe('Wallet', () => {

  describe('getUpWallets', () => {

    it('Should return empty for zero wallet', () => {

      expect(getUpWallets([]) ).to.deep.equals([]);

    });

    it('Should return one up wallet', () => {

      const wallets = [
        {
          balance: '944.0000000',
          limit: '10000',
          asset_type: 'credit_alphanum4',
          asset_code: 'AS1',
          asset_issuer: 'AS1_ISSUER',
          asset: assetInstance({
            asset_code: 'AS1', asset_issuer: 'AS1_ISSUER'
          })
        },
        {
          balance: '0.0000000',
          limit: '10000',
          asset_type: 'credit_alphanum4',
          asset_code: 'AS2',
          asset_issuer: 'AS2_ISSUER',
          asset: assetInstance({
            asset_code: 'AS2', asset_issuer: 'AS2_ISSUER'
          })
        }
      ];

      expect(getUpWallets(wallets) ).to.deep.equals([wallets[0]]);

    });

    it('Should return native type wallet', () => {

      const wallets = [
        {
          balance: '944.0000000',
          limit: '10000',
          asset_type: 'credit_alphanum4',
          asset_code: 'AS1',
          asset_issuer: 'AS1_ISSUER',
          asset: assetInstance({
            asset_code: 'AS1', asset_issuer: 'AS1_ISSUER'
          })
        },
        {
          balance: '1.0000000',
          limit: '