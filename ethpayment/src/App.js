import React from "react";
import web3 from "./web3";
import lottery from "./lottery";
const FormData = require('form-data');
const fetch = require("node-fetch");
class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
    mlmsg:"",
    selectedFile: null,
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

   // const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success.." });

    // const apiUrl = 'http://localhost:3050/';

    fetch('/ml')
      .then((response) => response.json())
      .then((data) => this.setState({ mlmsg: JSON.stringify(data.message) }));

    //   const response = await fetch('/ml', {
    //     method: 'GET',
    //     // headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({user: data})
    //   })

    // return await response.json();
      // fetch(apiUrl).then(async response => {
      //   try {
      //    const data = await response.json()
      //    console.log('response data?', data)
      //  } catch(error) {
      //    console.log('Error happened here!')
      //    console.error(error)
      //  }
      // })

      // fetch('https://api.github.com/users/hacktivist123/repos')
      // .then(response => response.json())
      // .then(data => res.send(data));

    //  await lottery.methods.sendpayment().send({
    //   from: accounts[0],
    //   value: web3.utils.toWei(this.state.value, "ether"),
    //   gas: "1000000" 
    //});

    this.setState({ message: "request sent.." });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "A winner has been picked!" });
  };

  // state = { 
  
  //   // Initially, no file is selected 
  //   selectedFile: null
  // }; 
   
  // On file select (from the pop up) 
  onFileChange = event => { 
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] }); 
  }; 
   
  // On file upload (click the upload button) 
  onFileUpload = () => { 
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
      "upload", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 
   
    // Details of the uploaded file 
    console.log(this.state.selectedFile); 
   
    // Request made to the backend api 
    // Send formData object 
    // fetch('/ml/file', formData)
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ mlmsg: JSON.stringify(data.message) }));

      fetch('/ml/file', {
        method: 'POST',
        body: formData,
        //headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept' : 'application/json' }
             })
        .then((response) => response.json())
        .then((data) => this.setState({ mlmsg: JSON.stringify(data.message) }));

  }; 

  render() {
    return (
      <div>
        <h2>ML Service</h2>
        <p>
          Contract is managed by {this.state.manager}. 
          There are currently{" "}.
          {this.state.players.length} people entered, competing to win{" "}.
          {web3.utils.fromWei(this.state.balance, "ether")} ether!.
          This is a message from ML service {this.state.mlmsg}.
        </p>

        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Enter the amount</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />

        <hr />
          <h4>Upload a File to Predict</h4>
          <div>
            <label>Upload a File</label>
            <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
          </div>
        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
