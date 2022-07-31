import axios from "axios";

export const todoApi = () => {
  const instance = axios.create({
    baseURL: "https://62e273e6e8ad6b66d85bba80.mockapi.io/sales",
    timeout: 3000,
  });

  const get = async (path) => {
    try {
      const resp = await instance.get(path);
      return resp;
    } catch (error) {
      return error.response;
    }
  };
  return { get };
};
