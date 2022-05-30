import { AJAX } from "./helper.js";
// import * as model from "./model.js";

//Initial variable setup
const imgContainer = document.querySelector(".img-container");
const btnInput = document.querySelector(".inputBtn");
const walletInput = document.querySelector(".input-box");
walletInput.focus();

// Build temperate data base for later rendering results
const state = {
  collections: [],
  wallet: "",
};

// Extract data from query results
const loadSearchResults = async function (wallet) {
  const data = await AJAX(wallet);
  // Save result array in state database
  state.collections = data.assets.map((res) => {
    return {
      collection_name: res.collection.name,
      token_id: res.token_id,
      image_url: res.image_url,
      permalink: res.permalink,
    };
  });
};

// Generate markup from state database
const generateMarkup = function (data) {
  // markup is returned as array, and join the markup string together as HTML string
  const markup = data
    .map((el) => {
      return `
    <figure class="info">
      <img class="nft-img" src="${el.image_url}"/>
        <ul class="info-details">
          <li>${el.collection_name}</li>
        </ul>
        <a class="nft-link" target="blank" href="${el.permalink}">view on Opensea</a>
      </figure>
    `;
    })
    .join("");
  return markup;
};

// Render markup into imgcontainer
const render = function (markup) {
  imgContainer.insertAdjacentHTML("beforeend", markup);
};

// Combine query function and render function together
const displayResults = async function (wallet) {
  await loadSearchResults(wallet);

  // console.log(state.collections);
  const markup = generateMarkup(state.collections);
  render(markup);
};

// Execute displayResults function when user click query button
btnInput.addEventListener("click", () => {
  state.wallet = walletInput.value;
  displayResults(state.wallet);

  // Temperate for test
  // displayResults(wallet3);
});

const wallet1 = "0xA90c70882Fc63ac514bE15743a13595Cb39F767D";
const wallet2 = "0x8742fa292AFfB6e5eA88168539217f2e132294f9";
const wallet3 = "0x0449Bc01e1D8154A118c56aaA776272e94B45929";
const wallet4 = "0x88B2b904147b94FD50F710D9Cbc5B8F07c982C30";
