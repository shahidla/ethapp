const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
//const compilePay = require("../ethereum/build/PaymentctrABI.json");
const compilePayBytecode = require("../ethereum/build/PaymentctrBytecode.json");

const fs = require('fs');
const compilePay = fs.readFileSync('../ethereum/build/PaymentctrABI.json', {encoding: "utf8"});
//const compilePayBytecode = fs.readFileSync('../ethereum/build/PaymentctrBytecode.json', {encoding: "utf8"});


const provider = new HDWalletProvider(
  "exile gap nature denial absurd bunker hint insane crane airport host master",
  // remember to change this to your own phrase!
  //0xc172eDC818976CaBf0c958AE452FB46C74a033C0

  //Attempting to deploy from account 0xc172eDC818976CaBf0c958AE452FB46C74a033C0 - contract owner

  //   [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"payers","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sendpayment","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
  // Contract deployed to 0x923E312272b44F14e743b2FB5D04d91a339B9337 -- contract addtress

  "https://rinkeby.infura.io/v3/740e26cf4e4041198f9e19a5669c6a48"
  // remember to change this to your own endpoint!
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
