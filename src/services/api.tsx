import axios from "axios";

const BASE_URL =
  "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth";

export const fetchAirData = async (
  returnType: string,
  numOfRows: number,
  pageNo: number,
  searchDate: Date,
  informCode: string
) => {
  let url = `${BASE_URL}?servicekey=${process.env.REACT_APP_API_KEY}`;
  url +=
    "&" + encodeURIComponent("returnType") + "=" + encodeURIComponent("xml");
  url +=
    "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100");
  url += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
  url +=
    "&" +
    encodeURIComponent("searchDate") +
    "=" +
    encodeURIComponent("2020-11-14");
  url +=
    "&" + encodeURIComponent("InformCode") + "=" + encodeURIComponent("PM10");

  try {
    const res = await axios.get(url, {
      headers: {
        withCredentials: true,
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": true,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Error Fetching data:", error);
    throw new Error(error.message);
  }
};
