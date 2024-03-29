/*jshint esversion: 6 */
const AccountStorage = artifacts.require("./AccountStorage.sol");
const KimlicContextStorage = artifacts.require("./KimlicContextStorage.sol");
const KimlicContractsContext = artifacts.require("./KimlicContractsContext.sol");
const AccountStorageAdapter = artifacts.require("./AccountStorageAdapter.sol");
const VerificationContractFactory = artifacts.require("./VerificationContractFactory.sol");
const ProvisioningContractFactory = artifacts.require("./ProvisioningContractFactory.sol");
const KimlicToken = artifacts.require("./KimlicToken.sol");
const RewardingContract = artifacts.require("./RewardingContract.sol");
const RelyingPartyStorageAdapter = artifacts.require("./RelyingPartyStorageAdapter.sol");
const RelyingPartyStorage = artifacts.require("./RelyingPartyStorage.sol");
const AttestationPartyStorageAdapter = artifacts.require("./AttestationPartyStorageAdapter.sol");
const AttestationPartyStorage = artifacts.require("./AttestationPartyStorage.sol");

const { getFormatedConsoleLabel, setValueByPath, uuidv4 } = require("../commonLogic/commonLogic");
const { deployedConfigPathConsts, saveDeployedConfig, getNetworkDeployedConfig } = require("../deployedConfigHelper");
const { createAccountAndSet1EthToBalance } = require("../commonLogic/commonEthereumLogic");

const transactionKicker = () => {
  web3.eth.sendTransaction({
      from: web3.eth.coinbase,
      to: web3.eth.coinbase,
      value: 0x0
  })
}

/**
 * deployment of all smart contracts, saving their addresses to config file
 */
module.exports = function (deployer) {
  console.log(getFormatedConsoleLabel("deploy all contracts: "));

  let deployedConfig = getNetworkDeployedConfig(web3.version.network);
  const contractPathConsts = deployedConfigPathConsts.deployedContracts;

  deployer.then(async () => {
    await deployer.deploy(KimlicContextStorage);
    console.log(`KimlicContextStorage deployed at address ${KimlicContextStorage.address}`);
    setValueByPath(deployedConfig, contractPathConsts.kimlicContextStorageAddress.path, KimlicContextStorage.address);

    transactionKicker()

    await deployer.deploy(KimlicContractsContext, KimlicContextStorage.address);
    console.log(`KimlicContractsContext deployed at address ${KimlicContractsContext.address}`);
    setValueByPath(deployedConfig, contractPathConsts.kimlicContractsContextAddress.path, KimlicContractsContext.address);

    transactionKicker()
    
    await deployer.deploy(AccountStorage, KimlicContextStorage.address);
    console.log(`AccountStorage deployed at address ${AccountStorage.address}`);
    setValueByPath(deployedConfig, contractPathConsts.accountStorageAddress.path, AccountStorage.address);

    transactionKicker()

    const accountStorageAdapterOwner = await createAccountAndSet1EthToBalance(web3, deployedConfig.deployerAddress, uuidv4());
    await deployer.deploy(AccountStorageAdapter, KimlicContextStorage.address, { from: accountStorageAdapterOwner.accountAddress });
    console.log(`AccountStorageAdapter deployed at address ${AccountStorageAdapter.address}`);
    setValueByPath(deployedConfig, contractPathConsts.accountStorageAdapterAddress.path, AccountStorageAdapter.address);

    setValueByPath(deployedConfig, deployedConfigPathConsts.accountStorageAdapter.owner.path, accountStorageAdapterOwner);

    await deployer.deploy(RelyingPartyStorageAdapter, KimlicContextStorage.address);
    console.log(`RelyingPartyStorageAdapter deployed at address ${RelyingPartyStorageAdapter.address}`);
    setValueByPath(deployedConfig, contractPathConsts.relyingPartyStorageAdapterAddress.path, RelyingPartyStorageAdapter.address);

    transactionKicker()

    await deployer.deploy(RelyingPartyStorage, KimlicContextStorage.address);
    console.log(`RelyingPartyStorage deployed at address ${RelyingPartyStorage.address}`);
    setValueByPath(deployedConfig, contractPathConsts.relyingPartyStorageAddress.path, RelyingPartyStorage.address);

    transactionKicker()

    await deployer.deploy(AttestationPartyStorageAdapter, KimlicContextStorage.address);
    console.log(`AttestationPartyStorageAdapter deployed at address ${AttestationPartyStorageAdapter.address}`);
    setValueByPath(deployedConfig, contractPathConsts.attestationPartyStorageAdapterAddress.path, AttestationPartyStorageAdapter.address);

    transactionKicker()

    await deployer.deploy(AttestationPartyStorage, KimlicContextStorage.address);
    console.log(`AttestationPartyStorage deployed at address ${AttestationPartyStorage.address}`);
    setValueByPath(deployedConfig, contractPathConsts.attestationPartyStorageAddress.path, AttestationPartyStorage.address);

    transactionKicker()

    await deployer.deploy(VerificationContractFactory, KimlicContextStorage.address);
    console.log(`VerificationContractFactory deployed at address ${VerificationContractFactory.address}`);
    setValueByPath(deployedConfig, contractPathConsts.verificationContractFactoryAddress.path, VerificationContractFactory.address);

    transactionKicker()

    await deployer.deploy(ProvisioningContractFactory, KimlicContextStorage.address);
    console.log(`ProvisioningContractFactory deployed at address ${ProvisioningContractFactory.address}`);
    setValueByPath(deployedConfig, contractPathConsts.provisioningContractFactoryAddress.path, ProvisioningContractFactory.address);

    transactionKicker()

    await deployer.deploy(KimlicToken);
    console.log(`KimlicToken deployed at address ${KimlicToken.address}`);
    setValueByPath(deployedConfig, contractPathConsts.kimlicTokenAddress.path, KimlicToken.address);

    transactionKicker()

    await deployer.deploy(RewardingContract, KimlicContextStorage.address);
    console.log(`RewardingContract deployed at address ${RewardingContract.address}`);

    setValueByPath(deployedConfig, contractPathConsts.rewardingContractAddress.path, RewardingContract.address);

    saveDeployedConfig()
  })
}
