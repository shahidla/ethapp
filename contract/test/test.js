const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const compilePay = require('../ethereum/build/Pay.json');

let accounts;
let pay;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  pay = await new web3.eth.Contract(JSON.parse(compilePay.interface))
    .deploy({ data: compilePay.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

});

describe("Pay", () => {
  it("deploys a contract", () => {
    assert.ok(pay.options.address);
    console.log(pay.options.address);
  });
  it("send payment", async () => {
    let acc1 = await web3.eth.getBalance(accounts[0]);
    let acc2 = await web3.eth.getBalance(accounts[1]);

    console.log('start', )
    const message = await pay.methods.sendpayment().send({
        value:'1000001',
        from: accounts[1],
        gas: "1000000" 
    });
    const payer = await pay.methods.payers(accounts[1]).call();

    let acc1_a = await web3.eth.getBalance(accounts[0]);
    let acc2_a = await web3.eth.getBalance(accounts[1]);
    console.log('acc1',acc1);
    console.log('acc2',acc1);
    console.log('acc1_a',acc1_a);
    console.log('acc2_a',acc2_a);
    assert(payer);
  }); 
});


