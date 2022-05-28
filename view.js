class View {
  _parentElement = document.querySelector(".walletAddress");
  getQuery() {
    const query = this._parentElement.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.value = "";
  }
}

export default new View();
