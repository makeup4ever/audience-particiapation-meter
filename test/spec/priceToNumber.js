const { priceToNumber } = require('../../modules/utils');

describe('PriceToNumber', () => {

  it('Should get int', () => {

    expect(priceToNumber({
      n: '1', d: '2'
    }) ).to.deep.equals({
      n