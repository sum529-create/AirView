import axios from "axios";
import { formateDate } from "../utils/helpers";

export async function fetchTxtInfo() {
  let today = formateDate(new Date(), 0);
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

export async function getCtprvnMesureLIst(
  selectedTab: string,
  selectedSubTab: number
) {
  try {
    const res = await axios.get(
      "http://localhost:5001/api/getCtprvnMesureLIst",
      {
        params: {
          returnType: "json",
          numOfRows: 100,
          pageNo: 1,
          itemCode: selectedTab,
          dataGubun: "HOUR",
          searchCondition: "MONTH",
        },
      }
    );
    const totalCnt = res.data.response.body.totalCount;

    if (selectedSubTab === 0) return res.data.response.body.items[0];
    else {
      return res.data.response.body.items[totalCnt - 1];
    }
  } catch (error) {
    console.error("fetching data error");
    throw new Error("Failed to fetch data");
  }
}
export async function getCtprvnMesureSidoLIst(sidoName: string) {
  try {
    const res = await axios.get(
      "http://localhost:5002/api/getCtprvnMesureSidoLIst",
      {
        params: {
          returnType: "json",
          numOfRows: 100,
          pageNo: 1,
          sidoName: sidoName,
          searchCondition: "DAILY",
        },
      }
    );

    return res.data.response.body.items;
  } catch (error) {
    console.error("fetching data error");
    throw new Error("Failed to fetch data");
  }
}
