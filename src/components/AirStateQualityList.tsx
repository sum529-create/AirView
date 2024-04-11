import React, { FC } from "react";
import "../styles/AirStateQualityList.css";

interface PopupProps {
  airSidoData: object;
  locationNm: string;
  selectedTab: string;
}
const AirStateQualityList: FC<PopupProps> = ({
  airSidoData,
  locationNm,
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
  console.log(filteredData);
  return (
    <>
      <ul className="sido_area">
        {filteredData &&
          filteredData.map((item, i) => {
            return (
              <li key={i} className={item.cityNameEng}>
                <em>{item.cityName}</em>
                <span>
                  {selectedTab === "PM10"
                    ? item.pm10Value
                    : selectedTab === "PM25"
                    ? item.pm25Value
                    : selectedTab === "SO2"
                    ? item.so2Value
                    : selectedTab === "CO"
                    ? item.coValue
                    : selectedTab === "O3"
                    ? item.o3Value
                    : item.no2Value}
                </span>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default AirStateQualityList;
