import axios from "axios";


const apiUrl = "https://upper-serena-fastapi-ecommerce-6026090d.koyeb.app/api/";

export const getProductsAll = async function () {
  return await axios.get(`${apiUrl}products/`);
};
