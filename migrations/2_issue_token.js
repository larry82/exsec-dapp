var ntdsToken = artifacts.require('NTDS')

module.exports = function (deployer) {
  const name = 'NTDSecurities'
  const symbol = 'NTDS'
  const decimals = 18

  deployer.deploy(ntdsToken, name, symbol, decimals)
}
