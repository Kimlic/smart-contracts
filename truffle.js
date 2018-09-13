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
      from: "0x4b7f970b9bd6257b207f7a8fb08664ee217206b7", // Master coinbase
      host: "51.141.115.175", // Master IP
      port: 22000,
      network_id: "10",
      gasPrice: 0,
      gas: 4694118
    },
    stageDemoKimlic: {
      from: "0x8a706fb2ffe2ebb9f6f192fbbf5929952039c556", // RP Demo Kimlic coinbase
      host: "51.140.222.82", // RP Demo Kimlic IP
      port: 22000,
      network_id: "10",
      gasPrice: 0,
      gas: 4694118
    },
    localMaster: {
      from: "0x2d53b00ed1a56437b19adc4e6192c6d1b78f708c", // Master coinbase
      host: "127.0.0.1", // Master IP
      port: 22000,
      network_id: "10",
      gasPrice: 0,
      gas: 4694118
    },
    // localAp: {
    //   from: "0x2e933a6c78db354667189542d62a7d7df9a5e377", // AP coinbase
    //   host: "127.0.0.1", // AP IP
    //   port: 22001,
    //   network_id: "10",
    //   gasPrice: 0,
    //   gas: 4694118
    // },
    localRp1: {
      from: "0x64bead472383998573e22b191f20e0cd762fb809", // RP 1 coinbase
      host: "127.0.0.1", // RP 1 IP
      port: 22002,
      network_id: "10",
      gasPrice: 0,
      gas: 4694118
    },
    localRp2: {
      from: "0x67f2a69bb32a444bfe93bc4a4c02f4e35aa93033", // RP 2 coinbase
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
