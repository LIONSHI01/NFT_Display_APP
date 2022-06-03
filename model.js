import { AJAX } from "./helper";

export const state = {
  collections: [],
  wallet: "",
  ethBalance: 0,
};
export const createSearchObject = function (data) {
  const { assets } = data.assets;
  console.log(assets);
};

console.log("test");
