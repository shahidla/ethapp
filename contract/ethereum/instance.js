// test file
import Web3 from "web3";
const compilePay = require('./build/Pay.json');

const address = '0x57Ba857e84A6B6A73ea7c3e37Ab430f5D69B6b0A';  

const instance = await new web3.eth.Contract(JSON.parse(compilePay.interface), address);

export default Instance;
