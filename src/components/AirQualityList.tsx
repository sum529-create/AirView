import React from "react";
import { useQuery } from "react-query";
import { getCtprvnMesureLIst } from "../services/api";
import { IArpltnStatsSvc } from "../utils/types";

interface AirQualityType {
  cityNm: string;
  airQuality: string;
  airInfoNm: string;
}

// const AirQualityList: React.FC<{ data: AirQualityType[] }> = ({ data }) => {
function AirQualityList() {
  const { isLoading, data: airTotalInfo } = useQuery<IArpltnStatsSvc>(
    "airLocalData",
    getCtprvnMesureLIst
  );
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {/* {data.map((city, i) => (
        <li key={i} className={"city" + i}>
          <a>
            <em>{city.cityNm}</em>
            <span className="air_condition">
              <span className="screen_out">{city.airQuality}</span>
              <span className="air_state">{city.airInfoNm}</span>
            </span>
          </a>
        </li>
      ))} */}
    </ul>
  );
}

export default AirQualityList;
