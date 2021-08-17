const express = require('express');
const app = express();
const contractAdress = '0x923E312272b44F14e743b2FB5D04d91a339B9337';

  const abi = [
    {
      constant: true,
      inputs: [],
      name: "manager",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "payers",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getPlayers",
      outputs: [{ name: "", type: "address[]" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "sendpayment",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "uint256" }],
      name: "players",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
  ];

// serve files from the public directory
app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.send('Hello World -v2');
// });

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



const port = process.env.PORT || 3000;
app.listen(port, function () {

  console.log('listening on port ' + port);
});



///////////////////////
console.log('Server-side code running');

// add a document to the DB collection recording the click event
app.post('/clicked', (req, res) => {
  getAccount();
  console.log('Clicked');
   
});

async function getAccount() {

  // const accounts = await new Web3(window.ethereum).request({ method: 'eth_requestAccounts' })  
  // const account = accounts[0];
  // console.log(account); 
  
  
  // const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  // const account = accounts[0];
  // console.log(account); 

  var Web3 = require('web3');
  var web3 = new Web3('https://rinkeby.infura.io/v3/740e26cf4e4041198f9e19a5669c6a48');
  var contract = await new web3.eth.Contract(abi, contractAdress);
  const manager = await contract.methods.manager().call();
  console.log(manager);

//   const message = await contract.methods.sendpayment().send({
//     value:'1000001',
//     from: '0xdcEeF70ebd5e3F07d57712cCe5070B16A2662246',
//     gas: "1000000" 
// });
  
// console.log(message);
}


    


