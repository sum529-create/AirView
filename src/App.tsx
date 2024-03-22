import "./styles/global.css";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useState } from "react";
import axios from "axios";
import { IAirData } from "./utils/types";

function App() {
  const [airData, setAirData] = useState<IAirData | null>(null);
  useEffect(() => {
    const onfetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/airData", {
          params: {
            returnType: "json",
            numOfRows: 100,
            pageNo: 1,
            searchDate: "2024-03-18",
            informCode: "PM10",
          },
        });
        setAirData(response.data.response.body);
        console.log(response.data.response.body);
      } catch (error) {
        console.error("fetching data error", error);
      }
    };
    onfetchData();
  }, []);

  return (
    <>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
