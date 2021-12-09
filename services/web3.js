const Web3 = require('web3');
const web3 = new Web3(process.env.REACT_APP_ETH_WSS_URL || Web3.givenProvider);

/**
 * Get Block Data from BlockHash or ID
 *
 * @param blockHashOrId
 * @returns {Object}
 */
 const getBlock = async (blockHashOrId) => {
  return await web3.eth.getBlock(blockHashOrId, true);
};

/**
* Get last block number
*
* @returns {Promise<number>}
*/
const getLastBlockNumber = async () => {
  return await web3.eth.getBlockNumber();
};

/**
 * Subscribe new block header
 *
 * @param callback
 * @returns {Promise<void>}
 */
 const subscribeNewBlockHeader = async (callback) => {
  return web3.eth
      .subscribe("newBlockHeaders", (error, result) => {
        console.log(error);
          if (!error) {
              return;
          }
          console.error(error);
      })
      .on("connected", (subscriptionId) => {
          console.log(subscriptionId);
      })
      .on("data", (blockHeader) => {
          callback(blockHeader);
      })
      .on("error", (error) => {
          console.error(error);
      });
};

const getTransactionsByAddressAndBlock = async (address, block) => {
  try {
    console.log(web3.eth)
  // const filter = web3.eth.filter({fromBlock:block, toBlock: 'latest', address: address});
  // // filter.watch(function(error, result) {
  // //    if(!error) console.log(result);
  // // })
  // console.log(filter)
  } catch (e) {
    console.error(e);
  }
}


const INIT_DELAY = 10 * 1000;
const REFRESH_INTERVAL = 60 * 1000;

let value = '';
const updateApys = async () => {
  console.log('> updating apys');
  
  value = new Date().toLocaleTimeString();
  setTimeout(updateApys, REFRESH_INTERVAL);
}

module.exports = {
  web3,
  getBlock,
  getLastBlockNumber,
  subscribeNewBlockHeader,
  getTransactionsByAddressAndBlock,
  value,
  updateApys
};
