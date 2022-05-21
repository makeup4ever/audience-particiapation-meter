
/* eslint max-nested-callbacks:[2, 5], array-callback-return: 0, camelcase: 0 */

const Stellar = require('stellar-sdk');
const { filterOffers } = require('../../modules/offers');
const { assetInstance } = require('../../modules/asset');

describe('filterOffers', () => {

  describe('One match', () => {

    it('Should one match', () => {

      const assetSelling = new Stellar.Asset('AS1', 'AS1_ISSUER');
      const assetBuying = new Stellar.Asset('AS2', 'AS2_ISSUER');

      const offers = [
        {
          _links: {
            self: { href: 'https://horizon-testnet.stellar.org/offers/1' },
            offer_maker: { href: 'https://horizon-testnet.stellar.org/accounts/BOT_ACCOUNT_ID' }
          },
          id: 1,
          paging_token: '1',
          seller: 'BOT_ACCOUNT_ID',
          selling: {
            asset_type: 'credit_alphanum4',
            asset_code: 'AS1',