const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://live-air-view.glitch.me/", // 기본 URL 설정
  timeout: 60000, // 요청 시간 초과 설정 (60초)
});

module.exports = axiosInstance;
