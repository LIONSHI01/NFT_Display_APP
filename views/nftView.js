import View from "./View.js";

class NFTView extends View {
  _parentElement = document.querySelector(".img-container");
  _btnInput = document.querySelector(".inputBtn");
  _errorMessage = "Oops, no NFT found in this wallet ;)";

  _generateMarkup() {
    // markup is returned as array, and join the markup string together as HTML string
    const markup = this._data
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
  }

  addHandlerSearch(handler) {
    this._btnInput.addEventListener("click", function () {
      handler();
    });
  }
}

export default new NFTView();
