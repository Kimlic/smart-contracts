
const KimlicToken = artifacts.require("./KimlicToken.sol");

const { getNetworkDeployedConfig, deployedConfigPathConsts, saveDeployedConfig } = require("../deployedConfigHelper");
const { sendEthToAccount } = require("../commonLogic/commonEthereumLogic");
const { setValueByPath, getValueByPath, combinePath } = require("../commonLogic/commonLogic");

// Parameters

const rpName = "demoKimlic"
const rpAddress = "0x7104d3f287274ff695893350c845633e4369126f" // RP coinbase address
const rpTokens = 10000

/**
 * Script to be run by Kimlic team to perform RP registration procedure
 */

// TODO: Successfully started from master node

module.exports = async function (callback) { //Temp script for manual add AP/RP
  const tokensToSendAmount = rpTokens * Math.pow(10, 18);
  console.log(`tokensToSendAmount: ${tokensToSendAmount}`)
  const deployedConfig = getNetworkDeployedConfig(web3.version.network);
  console.log(`deployedConfig: ${deployedConfig}`)
  const mainAddressPath = deployedConfigPathConsts.deployerAddress.path;
  console.log(`mainAddressPath: ${mainAddressPath}`)
  const mainAddress = getValueByPath(deployedConfig, mainAddressPath, "0x0");
  console.log(`mainAddress: ${mainAddress}`)

  sendEthToAccount(web3, mainAddress, rpAddress);

  console.log(`Send tokens to "${rpName}" account`);

  const kimlicTokenInstancePath = deployedConfigPathConsts.deployedContracts.kimlicTokenAddress.path;
  const kimlicTokenInstanceAddress = getValueByPath(deployedConfig, kimlicTokenInstancePath, "0x0");
  console.log(`kimlicTokenInstanceAddress: ${kimlicTokenInstanceAddress}`)
  const kimlicTokenInstance = await KimlicToken.at(kimlicTokenInstanceAddress);

  console.log(`send tokens to account "${tokensToSendAmount / Math.pow(10, 18)}"`);//10^18 its token decimals
  console.log(`main acc balance: ${await kimlicTokenInstance.balanceOf(mainAddress)}`);
  await kimlicTokenInstance.transfer(rpAddress, tokensToSendAmount, { from: mainAddress });
  console.log(`balance of RP: ${await kimlicTokenInstance.balanceOf(rpAddress)}`);

  const partyConfigPath = deployedConfigPathConsts.partiesConfig.createdParties.party.address.pathTemplate;
  setValueByPath(deployedConfig, combinePath(partyConfigPath, { partyName: rpName }), rpAddress);

  console.log("save")
  saveDeployedConfig()

  callback.call()
}