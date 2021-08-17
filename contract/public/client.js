console.log("Client-side code running");
const contractAdress = '0x923E312272b44F14e743b2FB5D04d91a339B9337';
//const address = "0x57Ba857e84A6B6A73ea7c3e37Ab430f5D69B6b0A";
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

const button = document.getElementById("myButton");
button.addEventListener("click", function (e) {
  
  getAccountDetails();

  console.log("button was clicked");

  fetch("/clicked", { method: "POST" })
    .then(function (response) {
      if (response.ok) {
        console.log("Click was recorded");
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
});

if (typeof window.ethereum != "undefined") {
  console.log("metamask  is installed");
   window.ethereum.enable();
  const web3 = new Web3(window.ethereum);
} else {
  
  
  console.log("Metamask is not installed");
}

async function getAccountDetails() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];
  console.log(account); 
  

window.ethereum.request({ method: "eth_requestAccounts" });

const web3 = new Web3(window.ethereum);



  // var Web3 = require('web3');
  // var web3 = new Web3('https://rinkeby.infura.io/v3/740e26cf4e4041198f9e19a5669c6a48');
  // var contract = await new web3.eth.Contract(abi, contractAdress);
  // console.log(contract);
  
  //const instance = await web3.eth.Contract(abi, address);
  //console.log(instance);
  // console.log(instance);
  // console.log(compilePay)
}
// getContract();
// async function getContract() {
//   if(window.ethereum){
//     window.web3 = new Web3(window.ethereum)
//     await window.ethereum.request({ method: 'eth_requestAccounts' })
//   }
//   else if(window.web3){
//     window.web3 = new Web3(window.ethereum)
//   }
//   else{
//     window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!")
//   }
//   //  if (window.ethereum) {
//   //     window.web3 = new Web3(window.ethereum)
//   //     await window.ethereum.request({ method: 'eth_requestAccounts' })
//   //       await window.ethereum.enable();
//   //       const contract = await  new web3.eth.Contract(abi, address);
//   //   } else if (window.web3) {
//   //       web3 = new Web3(window.web3.currentProvider);
//   //   } else {
//   //       window.alert('Non-Ethereum browser detected. Please install MetaMask plugin');
//   //   };

//   //const web3 = new Web3(window.ethereum);
  
// //   if (window.ethereum) {
// //     window.web3 = new Web3(window.ethereum);
// //     window.ethereum.enable();
// // }  
// }

// async function loadContract() {
//   return await new window.web3.eth.Contract(abi, address);
// }

// async function load() {
//   await loadWeb3();
//   window.contract = await loadContract();
//   updateStatus('Ready!');
// }