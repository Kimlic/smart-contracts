let fs = require("fs")

const fileName = "./artifacts/deployConfig.json"
let deployConfig = {}
let isConfigLoaded = false

// Public

const saveConfig = () => {
  console.log("Saving deploy config")
  if (!isConfigLoaded) throw "Config not loaded! Use loadConfig method first."

  const config = JSON.stringify(deployConfig, null, 2)
  fs.writeFileSync(fileName, config)
}

const networkConfig = network => {
  if (network.length < 0) throw "Network inaccessable"

  loadConfig(network)

  if (!deployConfig[network]) deployConfig[network] = {}

  return deployConfig[network]
}

const cleanConfig = network => {
  if (network.length < 0) throw "Network inaccessable"

  loadConfig(network)
  deployConfig[network] = {}
}

const setValueByPath = (object, path, data) => {
  var selectedValue = object
  const pathParts = path.split(".")

  for (let index = 0; index < pathParts.length - 1; index++) {
    let pathPart = pathParts[index]
    if (!selectedValue[pathPart]) selectedValue[pathPart] = {}
    selectedValue = selectedValue[pathPart]
  }

  const lastPathPart = pathParts.pop()
  selectedValue[lastPathPart] = data
}

const configScheme = {
  wallets: {
    path: "wallets",

    Lender: {
      path: "wallets.Lender"
    },
    DemoStore: {
      path: "wallets.DemoStore"
    }
  },
  contracts: {
    path: "contracts",

    LoanFactory: {
      path: "contracts.LoanFactory"
    },
    LoanStorage: {
      path: "contracts.LoanStorage"
    },
    InterestStorage: {
      path: "contracts.InterestStorage"
    },
    InterestFactory: {
      path: "contracts.InterestFactory"
    },
    ItemFactory: {
      path: "contracts.ItemFactory"
    },
    ItemStorage: {
      path: "contracts.ItemStorage"
    },
    StoreFactory: {
      path: "contracts.StoreFactory"
    },
    StoreStorage: {
      path: "contracts.StoreStorage"
    },
    OrderFactory: {
      path: "contracts.OrderFactory"
    },
    OrderStorage: {
      path: "contracts.OrderStorage"
    },
    BalanceStorage: {
      path: "contracts.BalanceStorage"
    },
    CreditLimitStorage: {
      path: "contracts.CreditLimitStorage"
    },
    ProfileStorage: {
      path: "contracts.ProfileStorage"
    },
    OrderLogger: {
      path: "contracts.OrderLogger"
    }
  },
  deployer: {
    path: "deployer"
  }
}

// Private

const loadConfig = () => {
  if (isConfigLoaded) return

  const isFileExists = fs.existsSync(fileName)
  if (isFileExists) deployConfig = JSON.parse(fs.readFileSync(fileName)) || {}

  isConfigLoaded = true
}

module.exports = { saveConfig, networkConfig, cleanConfig, setValueByPath, configScheme }