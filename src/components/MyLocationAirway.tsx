import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getMsrstnAcctoRltmMesureDnsty,
  getNearbyMsrstnList,
} from "../services/api";
import "../styles/MyLocationAirway.css";

const GradeAirValue = (grade: string) => {
  switch (grade) {
    case "1":
      return "좋음";
    case "2":
      return "보통";
    case "3":
      return "나쁨";
    default:
      return "매우나쁨";
  }
};

const MyLocationAirway = () => {
  const [point, setPoint] = useState<[number, number]>([0, 0]);
  const [error, setError] = useState<string | null>(null);
  const [addr, setAddr] = useState<string | null>(null);
  const [stationName, setStationName] = useState<string | null>(null);
  const proj4 = require("proj4").default;

  const wgs84 = proj4("EPSG:4326");
  // const tm5186 = proj4(
  //   "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"
  // );
  //UTM-K 좌표계
  var eps2097 =
    "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs";
  const handlePointvalue = (posX: number, posY: number) => {
    if (posX && posY) {
      const convertedPoint = proj4(wgs84, eps2097, [posY, posX]);
      setPoint(convertedPoint);
    }
  };
  const onSuccess = (location: GeolocationPosition) => {
    const posX = location.coords.latitude;
    const posY = location.coords.longitude;

    handlePointvalue(posX, posY);
  };
  const onError = (error: GeolocationPositionError) => {
    setError(error.message);
  };
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  const { isLoading: isLoadingStation, data: measureStation } = useQuery(
    ["measureStation", point],
    () => {
      if (point) {
        return getNearbyMsrstnList(point[0], point[1]);
      }
    },
    {
      enabled: !!point,
      onSuccess: (data) => {
        if (data && data.length > 0) {
          setAddr(data[0].addr.split(" ", 2).join(" "));
          setStationName(data[0].stationName);
        }
      },
    }
  );
  const { isLoading: isLoadingInfo, data: airAreaInfo } = useQuery(
    ["airAreaInfo", stationName],
    () =>
      stationName ? getMsrstnAcctoRltmMesureDnsty(stationName) : undefined,
    {
      enabled: !!stationName,
    }
  );

  return (
    <>
      {error ? <p>Error: {error}</p> : null}
      {!isLoadingStation && !isLoadingInfo ? (
        <div className="card">
          <p className="sub-title">{addr} 대기정보</p>
          <div className="air-quality-top">
            <h1>{airAreaInfo[0].khaiValue}</h1>
            <div className="air-quality-sub">
              <span className="air-quality-grade">
                {GradeAirValue(airAreaInfo[0].khaiGrade)}
              </span>
              <span className="air-quality-index">통합대기환경지수(CAI)</span>
            </div>
          </div>
          <div className="air-quality-bar"></div>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </>
  );
};

export default MyLocationAirway;
