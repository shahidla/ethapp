const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compilePayBytecode = require("../ethereum/build/PaymentctrBytecode.json");

const fs = require('fs');
const compilePay = fs.readFileSync('../ethereum/build/PaymentctrABI.json', {encoding: "utf8"});

  // Use your own Metdamask phrase 
  // Use your own infura endpoint
const provider = new HDWalletProvider(
  "exile gap nature denial absurd bunker hint insane crane airport host",
  "https://rinkeby.infura.io/v3/740e26cf4e4041198f9e19a5669c6a"
  
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compilePay))
    .deploy({ data: compilePayBytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(compilePay.interface);
  console.log("Contract deployed to", result.options.address);
};
deploy();
