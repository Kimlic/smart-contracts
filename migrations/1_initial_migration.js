var Migrations = artifacts.require("./Migrations.sol")

const transactionKicker = () => {
  web3.eth.sendTransaction({
      from: web3.eth.coinbase,
      to: web3.eth.coinbase,
      value: 0x0
  })
}

module.exports = function (deployer) {
  transactionKicker()
  deployer.deploy(Migrations)
  transactionKicker()
}
