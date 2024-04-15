import React, { FC, useState } from "react";
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
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
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
                className={[
                  item.cityNameEng === "" ? "Gyeryong-si" : item.cityNameEng,
                  hoveredItemIndex === i ? "cityArea-mo" : "",
                ].join(" ")}
                onMouseEnter={() => setHoveredItemIndex(i)}
                onMouseLeave={() => setHoveredItemIndex(null)}
              >
                <em className="cityName">{item.cityName}</em>
                {hoveredItemIndex === i && (
                  <em className="cityName-mo">{item.cityName}</em>
                )}
                <span
                  className={getAirQualityClassName(
                    airQualityValue,
                    selectedTab
                  )}
                >
                  {airQualityValue === "" ? "-" : airQualityValue}
                </span>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default AirStateQualityList;
