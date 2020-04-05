const Web3 = require('web3');

const GANACHE_URL ="http://127.0.0.1:7545";
const WEB3_PROVIDER = new Web3.providers.HttpProvider(GANACHE_URL);
const web3 = new Web3(WEB3_PROVIDER);

const ElectionContract = require("../client/contracts/Election.json");

// Use web3 to get the user's accounts.
const accounts =  "0x162A13878006a5A4BB38a8b61806524aCb15153F";
// Get the contract instance.
// Get the contract instance.
const networkId = '5777'
const deployedNetwork = ElectionContract.networks[networkId];

const electionInstance = new web3.eth.Contract(
    ElectionContract.abi,
    deployedNetwork && deployedNetwork.address,
);


module.exports = {
    contract : electionInstance,
    accounts: accounts
}

