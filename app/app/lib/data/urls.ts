// API constants.
const HOST: string = "localhost";
const PORT: string = "5176";
const APP: string = `http://${HOST}:${PORT}`;
const API: string = `${APP}/api`;


// A map to dinamically select desired URL.
export const UrlMap: object = {
  product: `${API}/Product`,
  rawMaterial: `${API}/RawMaterial`,
  productRawMaterial: `${API}/ProductRawMaterial`
};

