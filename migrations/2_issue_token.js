var ntds_token = artifacts.require("NTDS");

module.exports = function(deployer) {
  const name = 'NTDSecurities';
  const symbol = 'NTDS';
  const decimals = 18;

  deployer.deploy(ntds_token, name, symbol, decimals);
};
