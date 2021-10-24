const axios = require('axios');

// copy-paste your URL from Alchemy
const ALCHEMY_URL = "https://eth-mainnet.alchemyapi.io/v2/SkFrtfTsA7s5RQ2oriQFGYV-rjGn9yXw";

function setText(id,newvalue) {
    var s= document.getElementById(id);
    s.innerHTML = newvalue;
  }    
 

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBlockByNumber",
  params: [
    'latest',
    true
  ]
}).then((response) => {
  const blockNumber = parseInt(response.data.result.number, 16);
  console.log("Block: ", blockNumber);
  setText('id-block', "Block: " + blockNumber);

  const now = Math.floor(Date.now() / 1000);
  const timestamp = parseInt(response.data.result.timestamp, 16);
  console.log("Age: ", now - timestamp, "secs ago");
  setText('id-age', (now - timestamp) + " secs ago");

  const numTransactions = response.data.result.transactions.length;
  console.log("Txn: ", numTransactions);
  setText('id-txn', numTransactions);

  let numUncles = 0;
  if (typeof response.data.uncles !== 'undefined') {
      numUncles = response.data.uncles.length;
  }

  console.log("Uncles: ", numUncles);
  setText('id-uncles', numUncles);

  const miner = response.data.result.miner;
  console.log("Miner: ", miner);
  setText('id-miner', miner);

  const gasUsed = parseInt(response.data.result.gasUsed, 16);
  console.log("Gas Used: ", gasUsed);
  setText('id-gas-used', gasUsed);

  const gasLimit = parseInt(response.data.result.gasLimit, 16);
  console.log("Gas Limit: ", gasLimit);
  setText('id-gas-limit', gasLimit);

  const baseFee = parseInt(response.data.result.baseFeePerGas, 16) / 1000000000;
  console.log("Base Fee: ", baseFee, 'Gwei');
  setText('id-base-fee', baseFee + ' Gwei');
});
