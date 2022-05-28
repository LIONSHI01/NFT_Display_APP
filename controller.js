import { AJAX } from "./helper.js";
// import * as model from "./model.js";
const container = document.querySelector(".img-container");

const state = {
  collections: [],
};

const loadSearchResults = async function (wallet) {
  const data = await AJAX(wallet);

  state.collections = data.assets.map((res) => {
    return {
      collection_name: res.collection.name,
      token_id: res.token_id,
      image_url: res.image_url,
      permalink: res.permalink,
    };
  });
  // console.log(state.collections);
};

const generateMarkup = function (data) {
  const markup = data
    .map((el) => {
      return `
    <div>
      <img class="nft-img" src="${el.image_url}"/>
        <ul>
          <li>${el.collection_name}</li>
          <li>Token ID : #${el.token_id ? el.token_id : "No Token ID"}</li>
          <li>
            <a class="nft-link" href="${el.permalink}">Go to assets</a>
          </li>
        </ul>
      </div>
    `;
    })
    .join("");
  return markup;
};

const render = function (markup) {
  container.insertAdjacentHTML("afterbegin", markup);
};

const startEngine = async function (wallet) {
  await loadSearchResults(wallet);

  console.log(state.collections);
  const markup = generateMarkup(state.collections);
  render(markup);
};

const wallet1 = "0xA90c70882Fc63ac514bE15743a13595Cb39F767D";

const wallet2 = "0x8742fa292AFfB6e5eA88168539217f2e132294f9";
// loadSearchResults(wallet);
startEngine(wallet2);
console.log("hello");
