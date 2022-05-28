export const AJAX = async function (wallet) {
  try {
    const options = { method: "GET", headers: { Accept: "application/json" } };

    const url = `https://api.opensea.io/api/v1/assets?owner=${wallet}&order_direction=desc&limit=100&include_orders=false`;

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
