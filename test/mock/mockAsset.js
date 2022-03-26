function MockStellarAsset(code, issuer){

  this.code = code;
  this.issuer = issuer;

}

MockStellarAsset.prototype.isNative = function isNative(){

  return typeof this.issuer !== 'string'