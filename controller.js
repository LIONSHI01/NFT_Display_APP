import { AJAX } from "./helper.js";
import { ETHER_SCAN_API_KEY } from "./config.js";

//Initial variable setup
const imgContainer = document.querySelector(".img-container");
const accountContainer = document.querySelector(".account-container");

const btnInput = document.querySelector(".inputBtn");
const walletInput = document.querySelector(".input-box");
walletInput.focus();

// Build temperate data base for later rendering results
const state = {
  collections: [],
  wallet: "",
  ethBalance: 0,
};

// Extract data from NFT query results
const loadNFTResults = async function (wallet) {
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

// Generate markup from state database
const generateNFTMarkup = function (data) {
  // markup is returned as array, and join the markup string together as HTML string
  const markup = data
    .map((el) => {
      return `
    <figure class="info">
      <img alt="${el.collection_name}" class="nft-img" src="${el.image_url}"/>
        <ul class="info-details">
          <li>${el.collection_name}</li>
        </ul>
        <a class="nft-link" target="_blank" href="${el.permalink}">view on Opensea</a>
      </figure>
    `;
    })
    .join("");
  return markup;
};

const generateAccountMarkup = function () {
  return `
    <ol>
      <li>Wallet Address: ${state.wallet}</li>
      <li>Ethereum Balance: ${state.ethBalance.toFixed(4)} ETH</li>
    </ol>
  `;
};

// Render markup into imgcontainer
const renderNFT = function (markup) {
  imgContainer.insertAdjacentHTML("beforeend", markup);
};

// Render Account markup into account-info container
const renderAccount = function (markup) {
  accountContainer.insertAdjacentHTML("beforeend", markup);
};

// Combine query function and render function together
const displayResults = async function (wallet) {
  await loadNFTResults(wallet);
  await loadAccountBalResults(wallet);
  // console.log(state.collections);
  const NFTmarkup = generateNFTMarkup(state.collections);
  const accountInfoMarkup = generateAccountMarkup();
  renderNFT(NFTmarkup);
  renderAccount(accountInfoMarkup);
};

//Clear up view result
const clear = function () {
  walletInput.value = "";
  imgContainer.innerHTML = "";
  accountContainer.innerHTML = "";
};

// Execute displayResults function when user click query button
btnInput.addEventListener("click", () => {
  state.wallet = walletInput.value;
  clear();
  displayResults(state.wallet);

  // Temperate for test
  // displayResults(wallet3);
});

const loadAccountBalResults = async function (wallet) {
  try {
    const URL = `https://api.etherscan.io/api?module=account&action=balance&address=${wallet}&tag=latest&apikey=${ETHER_SCAN_API_KEY}`;

    const data = await AJAX(URL);
    state.ethBalance = +data.result / 1000000000000000000;
    console.log(state.ethBalance);
  } catch (err) {
    console.error(`🥶 ${err}`);
  }
};

const wallet1 = "0xA90c70882Fc63ac514bE15743a13595Cb39F767D";
const wallet2 = "0x8742fa292AFfB6e5eA88168539217f2e132294f9";
const wallet3 = "0x0449Bc01e1D8154A118c56aaA776272e94B45929";
const wallet4 = "0x88B2b904147b94FD50F710D9Cbc5B8F07c982C30";

loadAccountBalResults(wallet4);
