import axios from "axios";

const headers = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "POST, GET",
  "Access-Control-Allow-Origin": "*",
};

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers,
});
