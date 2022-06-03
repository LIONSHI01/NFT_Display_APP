import View from "./View.js";

class AccountView extends View {
  _parentElement = document.querySelector(".account-container");
  _errorMessage = "Wallet not found, please enter again :)";

  _generateMarkup() {
    return `
      <ol class="account-info-list">
        <li class="wallet-address">Wallet Address: ${this._data.wallet}</li>
        <li class="wallet-balance">Ethereum Balance: ${this._data.ethBalance.toFixed(
          4
        )} ETH</li>
        <li><a class="etherscan-link" href="https://etherscan.io/address/${
          this._data.wallet
        }" target="_blank">view on etherscan</a></li>
      </ol>
    `;
  }
}

export default new AccountView();
