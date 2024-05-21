import { formateDate } from "../utils/helpers";
const axiosInstance = require('./axiosInstance');

export async function fetchTxtInfo() {
  let today = formateDate(new Date(), 0);
  try {
    const res = await axiosInstance.get("/api/getMinuDustFrcstDspth", {
      params: {
        returnType: "json",
        numOfRows: 100,
        pageNo: 1,
        searchDate: today,
        informCode: "PM10",
      },
    });

    return res.data.response.body.items;
  } catch (error) {
    console.error("fetching data error", error);
    throw new Error("Failed to fetch data");
  }
}

export async function getCtprvnMesureLIst(selectedTab: string, selectedSubTab: number) {
  try {
    if (selectedSubTab === 1) {
      return null;
    }
    const res = await axiosInstance.get("/api/getCtprvnMesureLIst", {
      params: {
        returnType: "json",
        numOfRows: 100,
        pageNo: 1,
        itemCode: selectedTab,
        dataGubun: "HOUR",
        searchCondition: "MONTH",
      },
    });
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
  if (!sidoName) {
    return null;
  }
  try {
    const res = await axiosInstance.get("/api/getCtprvnMesureSidoLIst", {
      params: {
        returnType: "json",
        numOfRows: 100,
        pageNo: 1,
        sidoName: sidoName,
        searchCondition: "DAILY",
      },
    });

    return res.data.response.body.items;
  } catch (error) {
    console.error("fetching data error");
    throw new Error("Failed to fetch data");
  }
}

export async function getNearbyMsrstnList(tmX: number, tmY: number) {
  if (!tmX || !tmY) {
    return null;
  }
  try {
    const res = await axiosInstance.get("/api/getNearbyMsrstnList", {
      params: {
        returnType: "json",
        tmX: tmX,
        tmY: tmY,
        ver: "1.1",
      },
    });
    return res.data.response.body.items;
  } catch (error) {
    console.error("fetching data error");
    throw new Error("Failed to fetch data");
  }
}

export async function getMsrstnAcctoRltmMesureDnsty(stationName: string) {
  if (!stationName) {
    return null;
  }
  try {
    const res = await axiosInstance.get("/api/getMsrstnAcctoRltmMesureDnsty", {
      params: {
        returnType: "json",
        numOfRows: 100,
        pageNo: 1,
        stationName: stationName,
        dataTerm: "DAILY",
        ver: "1.0",
      },
    });
    return res.data.response.body.items;
  } catch (error) {
    console.error("fetching data error");
    throw new Error("Failed to fetch data");
  }
}
