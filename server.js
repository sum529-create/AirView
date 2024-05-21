require("dotenv").config();
const express = require("express");
const axiosInstance = require('./src/services/axiosInstance');
const cors = require("cors");
const app = express();

const BASE_URL = "https://apis.data.go.kr/B552584";

// CORS 미들웨어 추가
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // 인증 정보 포함 허용
  next();
});

// 엔드포인트 정의
app.get("/api/getMinuDustFrcstDspth", async (req, res) => {
  const API_URL = `${BASE_URL}/ArpltnInforInqireSvc/getMinuDustFrcstDspth`;
  const { returnType, numOfRows, pageNo, searchDate, informCode } = req.query;
  const url = `${API_URL}?servicekey=${process.env.REACT_APP_API_KEY}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&searchDate=${searchDate}&InformCode=${informCode}`;

  try {
    const response = await axiosInstance.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/getCtprvnMesureLIst", async (req, res) => {
  const API_URL = `${BASE_URL}/ArpltnStatsSvc/getCtprvnMesureLIst`;
  const { returnType, numOfRows, pageNo, itemCode, dataGubun, searchCondition } = req.query;
  const url = `${API_URL}?servicekey=${process.env.REACT_APP_API_KEY}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&itemCode=${itemCode}&dataGubun=${dataGubun}&searchCondition=${searchCondition}`;

  try {
    const response = await axiosInstance.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/getCtprvnMesureSidoLIst", async (req, res) => {
  const API_URL = `${BASE_URL}/ArpltnStatsSvc/getCtprvnMesureSidoLIst`;
  const { returnType, numOfRows, pageNo, sidoName, searchCondition } = req.query;
  if (sidoName) {
    const url = `${API_URL}?serviceKey=${process.env.REACT_APP_API_KEY}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&sidoName=${sidoName}&searchCondition=${searchCondition}`;
    try {
      const response = await axiosInstance.get(url);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.get("/api/getNearbyMsrstnList", async (req, res) => {
  const API_URL = `${BASE_URL}/MsrstnInfoInqireSvc/getNearbyMsrstnList`;
  const { returnType, tmX, tmY, ver } = req.query;
  const url = `${API_URL}?serviceKey=${process.env.REACT_APP_API_KEY}&returnType=${returnType}&tmX=${tmX}&tmY=${tmY}&ver=${ver}`;
  try {
    const response = await axiosInstance.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/getMsrstnAcctoRltmMesureDnsty", async (req, res) => {
  const API_URL = `${BASE_URL}/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty`;
  const { returnType, numOfRows, pageNo, stationName, dataTerm, ver } = req.query;
  const url = `${API_URL}?serviceKey=${process.env.REACT_APP_API_KEY}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&stationName=${stationName}&dataTerm=${dataTerm}&ver=${ver}`;
  try {
    const response = await axiosInstance.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
