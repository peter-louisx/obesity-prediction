import axios from "axios";
import ModelAttributes from "../types";
const API_URL = process.env.REACT_APP_API_URL;

export default async function predict(input: ModelAttributes) {
  return await axios.request({
    method: "POST",
    url: `${API_URL}/predict`,
    data: input,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
