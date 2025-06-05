import axios from "axios";

const headers = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "POST, GET",
  "Access-Control-Allow-Origin": "*",
};

export const api = axios.create({
  baseURL: "https://6e34-2804-2fa4-90b5-fd00-495e-f8ee-70f9-a827.ngrok-free.app",
  headers,
});
