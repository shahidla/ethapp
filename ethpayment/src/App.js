import React from "react";
import web3 from "./web3";
import contract from "./contractABI";
const FormData = require("form-data");
const fetch = require("node-fetch");
class App extends React.Component {
  state = {
    creator: "",
    contributors: [],
    balance: "",
    value: "",
    message: "",
    mlmsg: "",
    glact1: "",
    prob1: "",
    glact2: "",
    prob2: "",
    selectedFile: null,
    contractAddress: "",
    charity: "0x8f730fB15772EC8fFCE0954d45baDbeFdbEDA8a8",
  };
  async componentDidMount() {
    const creator = await contract.methods.creator().call();
    const contractAddress = await contract.methods.contractAddress().call();
    const contributors = await contract.methods.getContributors().call();
    const balance = await web3.eth.getBalance(contract.options.address);
    this.setState({ creator, contractAddress, contributors, balance });
  }

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ message: "file uploaded." });
    this.setState({ selectedFile: event.target.files[0] });
  };

  // Donate
  onDonate = async (event) => {
    event.preventDefault();
    this.setState({ message: "Donating" });

    //const totBalance = await web3.eth.getBalance(contract.options.address);
    const accounts = await web3.eth.getAccounts();
    await contract.methods.Donate(this.state.charity).send({
      from: accounts[0],
      gas: "1000000",
    });
    this.setState({ message: "Donated" });
    //Update Balance
    const newBalance = await web3.eth.getBalance(contract.options.address);
    this.setState({ balance: newBalance, message: "Balance Updated." });    
  };

  // On file upload (click the upload button)
  onFileUpload = async (event) => {
    event.preventDefault();
    this.setState({ message: "Awaiting for Payment Approval." });
    const accounts = await web3.eth.getAccounts();
    await contract.methods.sendpayContract().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
      gas: "1000000",
    });
    this.setState({ message: "Transaction Successful." });

    //Update Balance
    const newBalance = await web3.eth.getBalance(contract.options.address);
    this.setState({ balance: newBalance, message: "Balance Updated." });
    const newContributors = await contract.methods.getContributors().call();
    this.setState({
      contributors: newContributors,
      message: "Contributors Updated.",
    });

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "upload",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    //console.log(this.state.selectedFile);
    this.setState({ message: "File sent for Inovice Object Recommendation" });

    let mldata = await mlresultfunc();
    
    this.setState({
      glact1: JSON.stringify(mldata.RGA1),
      prob1: JSON.stringify(mldata.PGA1),
      glact2: JSON.stringify(mldata.RGA2),
      prob2: JSON.stringify(mldata.PGA2),
    });

    function mlresultfunc() {
      return new Promise(function (resolve, reject) {
        fetch("/ml/file", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) =>
            resolve(data)            
          );
      });
    }
        
    this.setState({ message: "Transaction Complete." });
  };

  render() {
    return (
      <div>
        <h3>
          Prototype: Multi-Service Application using Docker, Ethereum Smart
          Contract and SAP AI Business Services(IOR)
        </h3>

        <hr />

        <fieldset>
          <legend>Upload a file get G/L account recommendations:</legend>
          <br></br>
          <label>Ether Amount:</label>
          <input
            value={this.state.value}
            id="ethamt"
            name="ethamt"
            onChange={(event) => this.setState({ value: event.target.value })}
          />
          <br></br>
          <label>Upload a File:</label>
          <input type="file" onChange={this.onFileChange} />
          <br></br>
          <br></br>
          <button onClick={this.onFileUpload}>Submit</button>
        </fieldset>
        <hr />

        <h3>
          {" "}
          Recommendations for G/L Accounts from SAP AI Business Services{" "}
        </h3>
        <p>
          {" "}
          Top 1 Recommended G/L Account: {this.state.glact1} with probability:{" "}
          {this.state.prob1}.{" "}
        </p>
        <p>
          {" "}
          Top 2 Recommended G/L Account: {this.state.glact2} with probability:{" "}
          {this.state.prob2}.{" "}
        </p>
        <hr />
        <h3> Smart Contract Information </h3>
        <p>
          Contract Owned by {this.state.creator}. <br></br>
          Contract Value/Contributed Amount:{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} Ether. <br></br>
          Total Contributors: {this.state.contributors.length}.<br></br>
          <br></br>
          <button onClick={this.onDonate}>Donate</button>
        </p>
        <hr />
        <h3> Messages </h3>
        <h3>{this.state.message}</h3>
        {/* <h3>{this.state.balance }</h3> */}
      </div>
    );
  }
}
export default App;
