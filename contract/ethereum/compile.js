const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");


const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const paymentPath = path.resolve(__dirname, "contracts", "Paymentctr.sol");
const source = fs.readFileSync(paymentPath, "utf8");

var input = {
    language: 'Solidity',
    sources: {
      'Paymentctr.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };
  
  const output = JSON.parse(solc.compile(JSON.stringify(input)),1);

  fs.ensureDirSync(buildPath);

  for (let contract in output.contracts["Paymentctr.sol"]) {
    fs.outputJSONSync(
      path.resolve(buildPath, "PaymentctrABI.json"),
      output.contracts["Paymentctr.sol"][contract].abi
    );

    fs.outputJSONSync(
      path.resolve(buildPath, "PaymentctrBytecode.json"),
      output.contracts["Paymentctr.sol"][contract].evm.bytecode.object
    );
  }