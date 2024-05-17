require("dotenv").config();
const express = require("express");
const axiosInstance = require('./dist/axiosInstance').default; 
const cors = require("cors");
const app = express();
const app2 = express();
const app3 = express();
const app4 = express();
const app5 = express();

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
app2.use(cors());
app2.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // 인증 정보 포함 허용
  next();
});
app3.use(cors());
app3.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // 인증 정보 포함 허용
  next();
});
app4.use(cors());
app4.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // 인증 정보 포함 허용
  next();
});
app5.use(cors());
app5.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // 인증 정보 포함 허용
  next();
});
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
app2.get("/api/getCtprvnMesureLIst", async (req, res) => {
  const API_URL = `${BASE_URL}/ArpltnStatsSvc/getCtprvnMesureLIst`;
  const {
    returnType,
    numOfRows,
    pageNo,
    itemCode,
    dataGubun,
    searchCondition,
  } = req.query;
  const url = `${API_URL}?servicekey=${process.env.REACT_APP_API_KEY}&returnType=${returnType}&numOfRows=${numOfRows}&pageNo=${pageNo}&itemCode=${itemCode}&dataGubun=${dataGubun}&searchCondition=${searchCondition}`;

  try {
    const response = await axiosInstance.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app3.get("/api/getCtprvnMesureSidoLIst", async (req, res) => {
  const API_URL = `${BASE_URL}/ArpltnStatsSvc/getCtprvnMesureSidoLIst`;
  const { returnType, numOfRows, pageNo, sidoName, searchCondition } =
    req.query;
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
app4.get("/api/getNearbyMsrstnList", async (req, res) => {
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
app5.get("/api/getMsrstnAcctoRltmMesureDnsty", async (req, res) => {
  const API_URL = `${BASE_URL}/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty`;
  const { returnType, numOfRows, pageNo, stationName, dataTerm, ver } =
    req.query;
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
  console.log(`Server1 is running on port ${PORT}`);
});
const PORT2 = process.env.PORT2 || 5001;
app2.listen(PORT2, () => {
  console.log(`Server2 is running on port ${PORT2}`);
});
const PORT3 = process.env.PORT3 || 5002;
app3.listen(PORT3, () => {
  console.log(`Server3 is running on port ${PORT3}`);
});
const PORT4 = process.env.PORT4 || 5003;
app4.listen(PORT4, () => {
  console.log(`Server4 is running on port ${PORT4}`);
});
const PORT5 = process.env.PORT5 || 5004;
app5.listen(PORT5, () => {
  console.log(`Server5 is running on port ${PORT5}`);
});
