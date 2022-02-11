import axios from "axios";

export const api = axios.create({
  baseURL: "https://emphasoft-test-assignment.herokuapp.com",
});
