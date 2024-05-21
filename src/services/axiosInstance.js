const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // 기본 URL 설정
  timeout: 10000, // 요청 시간 초과 설정 (10초)
});

module.exports = axiosInstance;