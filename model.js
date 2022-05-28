import { AJAX } from "./helper";

export const state = {
  result: {
    collection_name: "",
    image_url: "",
    token_id: "",
  },
};

export const createSearchObject = function (data) {
  const { assets } = data.assets;
  console.log(assets);
};

console.log("test");
