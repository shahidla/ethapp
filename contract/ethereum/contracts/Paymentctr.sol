pragma solidity ^0.8.3;
 
contract Pay {
    address public creator;
    address[] public contributors;
    address public contractAddress;
    uint256 public contractBalance;

    // Defining a constructor   
    constructor() public{   
        creator = msg.sender;
        contractAddress = address(this);
        contractBalance = address(this).balance;
    }
    
    
    function sendpayContract() public payable {
        require(msg.value > 0.1 ether);
        contributors.push(msg.sender);
        contractBalance = address(this).balance;
    }

    function Donate(address charity) public payable restricted {
         payable(creator).transfer(address(this).balance * 10/100);
         contractBalance = address(this).balance;
         payable(charity).transfer(address(this).balance);
    }
    
    modifier restricted() {
        require(msg.sender == creator);
        _;
    }
    
    // function sendpay90() public payable {
    //     require(msg.value > 0.1 ether);
    //     payable(creator).transfer(msg.value * 90/100);
    //     contractBalance = address(this).balance;
        
    // }
    
    // function sendAll() public payable  {
    //     require(msg.value > 0.1 ether);
    //      payable(creator).transfer(address(this).balance);
    // }
    
    function getContributors() public view returns (address[] memory) {
        return contributors;
    }
}   