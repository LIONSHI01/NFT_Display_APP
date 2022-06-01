export const AJAX = async function (URL) {
  try {
    const options = { method: "GET", headers: { Accept: "application/json" } };

    const response = await fetch(URL, options);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
