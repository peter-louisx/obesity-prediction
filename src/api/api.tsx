import axios from "axios";
import ModelAttributes from "../types";

const API_URL = "https://obesense-backend-production.up.railway.app/api/"

export default async function predict(input: ModelAttributes) {
  return await axios.request({
    method: "POST",
    url: `${API_URL}/api/predict`,
    data: input,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
