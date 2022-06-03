import * as model from "./model.js";
import nftView from "./views/nftView.js";
import accountView from "./views/accountView.js";

const displayResults = async function () {
  try {
    const wallet = nftView.getQuery();
    await model.loadNFTResults(wallet);
    await model.loadAccountBalResults(wallet);

    nftView.render(model.state.collections);
    accountView.render(model.state);
  } catch (err) {
    nftView.renderError();
    accountView.renderError();
    console.error(err);
  }
};

const wallet1 = "0xA90c70882Fc63ac514bE15743a13595Cb39F767D";
const wallet2 = "0x8742fa292AFfB6e5eA88168539217f2e132294f9";
const wallet3 = "0x0449Bc01e1D8154A118c56aaA776272e94B45929";
const wallet4 = "0x88B2b904147b94FD50F710D9Cbc5B8F07c982C30";
const wallet5 = "0xEaEc75FEb6EF3F23009164D005978F54a18EaDF2";

const init = function () {
  nftView.addHandlerSearch(displayResults);
};

init();
