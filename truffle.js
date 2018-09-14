module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  mocha: {
    useColors: true
  },
  networks: {
    stageMaster: {
      from: "0x1adfcf314697db1f0561676cabd3a0517a63e954", // Master coinbase
      host: "40.87.94.79", // Master IP
      port: 22000,
      network_id: "10",
      gasPrice: 0,
      gas: 4694118
    },
    stageDemoKimlic: {
      from: "0x7104d3f287274ff695893350c845633e4369126f", // RP Demo Kimlic coinbase
      host: "40.117.78.52", // RP Demo Kimlic IP
      port: 22000,
      network_id: "10",
      gasPrice: 0,
      gas: 4694118
    },
    localMaster: {
      from: "0xe5d723246c020659215ac3154966cb797c24cbaf", // master coinbase
      host: "127.0.0.1", // master IP
      port: 22000, // master port
      network_id: "10",
      gasPrice: 0,
      gas: 4694118
    },
    localRp1: {
      from: "0x038976a669800c9fa6c24b5cef2503ac327c3dc3", // RP 1 coinbase
      host: "127.0.0.1", // RP 1 IP
      port: 22002,
      network_id: "10",
      gasPrice: 0,
      gas: 4694118
    },
    localRp2: {
      from: "0x80580b353d217c80fac9075331625172a8b4b8e2", // RP 2 coinbase
      host: "127.0.0.1", // RP 2 IP
      port: 22003,
      network_id: "10",
      gasPrice: 0,
      gas: 4694118
    },
    testRpc: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "10",
      gas: 4694118
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gasPrice: 0,
      mnemonic: "chapter run clever race sure shoot solution aisle possible ridge flock august"
    }
  }
}
