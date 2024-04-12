import React, { FC } from "react";
import "../styles/AirStateQualityList.css";
import { getAirQualityClassName } from "../utils/helpers";

interface PopupProps {
  airSidoData: object;
  locationEnNm: string;
  selectedTab: string;
}
const AirStateQualityList: FC<PopupProps> = ({
  airSidoData,
  locationEnNm,
  selectedTab,
}) => {
  let filteredData = [];
  if (airSidoData && Object.keys(airSidoData).length > 0) {
    const keys = Object.keys(airSidoData);
    const firstKey = keys[0];
    const firstDataTime = (airSidoData as Record<string, any>)[firstKey]
      ?.dataTime;
    filteredData = Object.values(airSidoData).filter(
      (item: any) => item.dataTime === firstDataTime
    );
  }

  return (
    <>
      <ul className={"sido_area " + locationEnNm}>
        {filteredData &&
          filteredData.map((item, i) => {
            const airQualityValue = {
              PM10: item.pm10Value,
              PM25: item.pm25Value,
              SO2: item.so2Value,
              CO: item.coValue,
              O3: item.o3Value,
              NO2: item.no2Value,
            }[selectedTab];

            return (
              <li
                key={i}
                className={
                  item.cityNameEng === "" ? "Gyeryong-si" : item.cityNameEng
                }
              >
                <em>{item.cityName}</em>
                <span
                  className={getAirQualityClassName(
                    airQualityValue,
                    selectedTab
                  )}
                >
                  {airQualityValue}
                </span>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default AirStateQualityList;
