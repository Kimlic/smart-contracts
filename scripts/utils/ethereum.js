const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const DESTRUCTED_ADDRESS = '0x'
const SUCCESS = '0x1'

const createEmptyAccount = async (web3, password = "p@ssw0rd") => {
  const account = await web3.personal.newAccount(password)
  await web3.personal.unlockAccount(account, password, 1000)

  return account
}

const createAccount = async (web3, password = "p@ssw0rd", ethers = 5) => {
  const account = await web3.personal.newAccount(password)
  await web3.personal.unlockAccount(account, password, 1000)
  await web3.eth.sendTransaction({ "from": web3.eth.coinbase, "to": account, "value": web3.toWei(ethers, 'ether') })

  return account
}

const balance = web3 => address => {
  return web3.eth.getBalance(address).toNumber()
}

const estimateGas = async (method, account) => {
  return await method.estimateGas({ from: account })
}

module.exports = { 
  ZERO_ADDRESS, 
  DESTRUCTED_ADDRESS, 
  SUCCESS, 
  createEmptyAccount, 
  createAccount, 
  balance, 
  estimateGas 
}