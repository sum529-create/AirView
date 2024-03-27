import axios from "axios";
import { formateDate } from "../utils/helpers";

export async function fetchTxtInfo() {
  let today = formateDate(new Date());
  try {
    const res = await axios.get(
      "http://localhost:5000/api/getMinuDustFrcstDspth",
      {
        params: {
          returnType: "json",
          numOfRows: 100,
          pageNo: 1,
          searchDate: today,
          informCode: "PM10",
        },
      }
    );

    return res.data.response.body.items;
  } catch (error) {
    console.error("fetching data error", error);
    throw new Error("Failed to fetch data");
  }
}

export async function getCtprvnMesureLIst() {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/getCtprvnMesureLIst",
      {
        params: {
          returnType: "json",
          numOfRows: 100,
          pageNo: 1,
          itemCode: "PM10",
          dataGubun: "HOUR",
          searchCondition: "MONTH",
        },
      }
    );
    return res.data.response.body.items;
  } catch (error) {
    console.error("fetching data error");
    throw new Error("Failed to fetch data");
  }
}
