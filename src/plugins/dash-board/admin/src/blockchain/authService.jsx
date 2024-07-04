import axios from "axios";

const apiUrl = "http://localhost:3001/generate-token";
const authService = {
  createToken(data) {
    return axios.post(apiUrl, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};

export default authService;
