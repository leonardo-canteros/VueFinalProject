import axios from "axios";

const apiUrl = "https://rickandmortyapi.com/api/";
export const getUserAll = async function () {
  return await axios.get(`${apiUrl}character`);
};
