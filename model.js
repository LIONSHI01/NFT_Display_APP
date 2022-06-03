import { AJAX } from "./helper.js";
import { ETHER_SCAN_API_KEY } from "./config.js";

// Build temperate data base for later rendering results
export const state = {
  collections: [],
  wallet: "",
  ethBalance: 0,
};

// Extract data from NFT query results
export const loadNFTResults = async function (wallet) {
  try {
    const URL = `https://api.opensea.io/api/v1/assets?owner=${wallet}&order_direction=desc&limit=200&include_orders=false`;
    const data = await AJAX(URL);
    // Save result array in state database
    state.collections = data.assets.map((res) => {
      return {
        collection_name: res.collection.name,
        token_id: res.token_id,
        image_url: res.image_url,
        permalink: res.permalink,
      };
    });
  } catch (err) {
    console.error(err);
  }
};

export const loadAccountBalResults = async function (wallet) {
  try {
    state.wallet = wallet;
    const URL = `https://api.etherscan.io/api?module=account&action=balance&address=${wallet}&tag=latest&apikey=${ETHER_SCAN_API_KEY}`;

    const data = await AJAX(URL);
    state.ethBalance = +data.result / 1000000000000000000;
    console.log(state.ethBalance);
  } catch (err) {
    console.error(`🥶 ${err}`);
  }
};
