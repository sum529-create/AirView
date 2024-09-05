import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getMsrstnAcctoRltmMesureDnsty,
  getNearbyMsrstnList,
} from "../services/api";
import "../styles/MyLocationAirway.css";
import AirPopup from "./AirPopup";
import CircularSlider from "./CircularSlider";
import AirStateCharts from "./AirStateCharts";

const GradeAirValue = (grade: string) => {
  switch (grade) {
    case "1":
      return "좋음";
    case "2":
      return "보통";
    case "3":
      return "나쁨";
    case "4":
      return "매우나쁨";
    default:
      return "-";
  }
};

const MyLocationAirway = () => {
  const [point, setPoint] = useState<[number, number]>([0, 0]);
  const [error, setError] = useState<string | null>(null);
  const [addr, setAddr] = useState<string | null>(null);
  const [stationName, setStationName] = useState<string | null>(null);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isMobileSize, setIsMobileSize] = useState(false);
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

    function handleResize() {
      const newSize = window.innerWidth < 768;
      setIsMobileSize(newSize);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
  const openPopup = () => {
    setIsPopOpen(true);
  };
  const closePopup = () => {
    setIsPopOpen(false);
  };

  return (
    <>
      {!isLoadingStation && !isLoadingInfo && airAreaInfo && !error ? (
        <>
          <div className="card">
            <div className="sub-title">요약</div>
            <div className="air-quality-sec">
              <div className="air-quality-sum">
                현재{" "}
                <b>
                  {addr}(관측지역 : {stationName} 관측소)
                </b>
                의
                {
                  airAreaInfo[0].khaiValue === "-" && !airAreaInfo[0].khaiGrade
                    ? null
                    :
                    <>
                      통합환경대기지수는&nbsp;
                      <b>{airAreaInfo[0].khaiValue}</b>이며, "
                      <b>{GradeAirValue(airAreaInfo[0].khaiGrade)}</b>" 입니다.
                    </>
                }
                <br />
                {GradeAirValue(airAreaInfo[0].khaiGrade) === "좋음"
                  ? "공기가 매우 깨끗한 날입니다. 외출하기 좋은 날씨입니다."
                  : GradeAirValue(airAreaInfo[0].khaiGrade) === "보통"
                  ? "외출하실 때 마스크를 준비해주세요. 조금 더 신경써야 할 때입니다"
                  : GradeAirValue(airAreaInfo[0].khaiGrade) === "나쁨"
                  ? "마스크를 착용하고 외출하세요. 공기가 좋지 않은 날입니다."
                  : GradeAirValue(airAreaInfo[0].khaiGrade) === "매우나쁨"
                  ? "실외활동을 최대한 피하세요. 매우 나쁜 환경입니다."
                  :"통신장애가 발생하였습니다. 잠시후 다시 시도해주세요."}
              </div>
            </div>
          </div>
          <div className="card">
            <p className="sub-title">대기질</p>
            <div className="air-quality-sec">
              <div className="air-quality-top">
                <h1>{airAreaInfo[0].khaiValue}</h1>
                <div className="air-quality-sub">
                  <span className="air-quality-grade">
                    {GradeAirValue(airAreaInfo[0].khaiGrade)}
                  </span>
                  <span className="air-quality-index">
                    통합대기환경지수(CAI)
                  </span>
                </div>
              </div>
              <div className="air-quality-bar">
                <input
                  type="range"
                  min="0"
                  max="400"
                  value={airAreaInfo[0].khaiValue !== "-" ? airAreaInfo[0].khaiValue : 0}
                  readOnly
                />
              </div>
              <div className="cai-info">
                <span
                  onClick={() => openPopup()}
                  className="material-symbols-outlined air_info"
                >
                  info
                </span>
                <span>통합대기환경지수(CAI)</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="sub-title">
              미세먼지 {addr} (관측지역 : {stationName} 관측소)
            </div>
            <div className="air-quality-sec circles-area">
              <div className="air-quality-item">
                <div className="air-quality-range">
                  <CircularSlider
                    type="pm10"
                    grade={airAreaInfo[0].pm10Grade}
                    value={airAreaInfo[0].pm10Value}
                    maxValue={250}
                    isMobileSize={isMobileSize}
                  />
                  <span className={isMobileSize ? "air-value-sm co" : ""}>
                    {airAreaInfo[0].pm10Value}
                  </span>
                </div>
                <div
                  className={
                    isMobileSize ? "air-quality-txt sm" : "air-quality-txt"
                  }
                >
                  {
                    airAreaInfo[0].pm10Flag && airAreaInfo[0].pm10Value === "-"
                    ?
                      <div className="state-info">
                        <h2>{ airAreaInfo[0].pm10Flag}</h2>
                      </div>
                    :
                    <div className="state-info">
                      <h2>
                        {airAreaInfo[0].pm10Value < 31
                          ? "좋음"
                          : airAreaInfo[0].pm10Value < 81
                          ? "보통"
                          : airAreaInfo[0].pm10Value < 151
                          ? "나쁨"
                          : "매우나쁨"}
                      </h2>
                      <p className="air_type">미세먼지 (PM10)</p>
                      <p className="air_num_data">
                        {airAreaInfo[0].pm10Value}㎍/㎥
                      </p>
                      <p className="sum_txt">
                        {airAreaInfo[0].pm10Value < 31
                          ? "실외활동하기 좋은 날입니다."
                          : airAreaInfo[0].pm10Value < 81
                          ? "외출하기에 적당한 날씨입니다."
                          : airAreaInfo[0].pm10Value < 151
                          ? "마스크를 착용하고 외출하세요."
                          : "실외활동을 피하세요."}
                      </p>
                    </div>
                  }
                </div>
              </div>
              <div className="air-quality-item">
                <div className="air-quality-range">
                  <CircularSlider
                    type="pm25"
                    grade={airAreaInfo[0].pm25Grade}
                    value={airAreaInfo[0].pm25Value !== "-" ? airAreaInfo[0].pm25Value : 0}
                    maxValue={250}
                    isMobileSize={isMobileSize}
                  />
                  <span className={isMobileSize ? "air-value-sm co" : ""}>
                    {airAreaInfo[0].pm25Value}
                  </span>
                </div>
                <div
                  className={
                    isMobileSize ? "air-quality-txt sm" : "air-quality-txt"
                  }
                >
                  {
                    airAreaInfo[0].pm25Flag && airAreaInfo[0].pm25Value === "-"
                    ?
                      <div className="state-info">
                        <h2>{airAreaInfo[0].pm25Flag}</h2>
                      </div>
                    :
                      <div className="state-info">
                        <h2>
                          {airAreaInfo[0].pm25Value < 16
                            ? "좋음"
                            : airAreaInfo[0].pm25Value < 36
                            ? "보통"
                            : airAreaInfo[0].pm25Value < 76
                            ? "나쁨"
                            : "매우나쁨"}
                        </h2>
                        <p className="air_type">초미세먼지 (PM2.5)</p>
                        <p className="air_num_data">
                          {airAreaInfo[0].pm25Value}㎍/㎥
                        </p>
                        <p className="sum_txt">
                          {airAreaInfo[0].pm25Value < 16
                            ? "공기가 맑은 하루입니다."
                            : airAreaInfo[0].pm25Value < 36
                            ? "외출에는 조심해야 할 수 있습니다."
                            : airAreaInfo[0].pm25Value < 76
                            ? "마스크를 착용하고 외출하세요."
                            : "실외활동을 피하세요."}
                        </p>
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="sub-title">대기정보</div>
            <div className="air-quality-sec circles-area-sm">
              <div className="air-quality-item">
                <div className="air-quality-range">
                  <CircularSlider
                    type="o3"
                    grade={airAreaInfo[0].o3Grade}
                    value={airAreaInfo[0].o3Value !== "-" ? airAreaInfo[0].o3Value : 0}
                    maxValue={0.2}
                    isMobileSize={isMobileSize}
                  />
                  <span className="air-value-sm">{airAreaInfo[0].o3Value}</span>
                </div>
                <div className="air-quality-txt sm">
                  {
                    airAreaInfo[0].o3Flag && airAreaInfo[0].o3Value === "-"
                      ?
                      <div className="state-info">
                        <h2>{airAreaInfo[0].o3Flag}</h2>
                      </div>
                      :
                    <div className="state-info">
                      <h2>
                        {airAreaInfo[0].o3Value < 0.03
                          ? "좋음"
                          : airAreaInfo[0].o3Value < 0.09
                          ? "보통"
                          : airAreaInfo[0].o3Value < 0.15
                          ? "나쁨"
                          : "매우나쁨"}
                      </h2>
                      <p className="air_type">오존 (O₃)</p>
                      <p className="air_num_data">{airAreaInfo[0].o3Value}ppm</p>
                    </div>
                  }
                </div>
              </div>
              <div className="air-quality-item">
                <div className="air-quality-range">
                  <CircularSlider
                    type="so2"
                    grade={airAreaInfo[0].so2Grade}
                    value={airAreaInfo[0].so2Value !== "-" ? airAreaInfo[0].so2Value : 0}
                    maxValue={0.2}
                    isMobileSize={isMobileSize}
                  />
                  <span className="air-value-sm">
                    {airAreaInfo[0].so2Value}
                  </span>
                </div>
                <div className="air-quality-txt sm">
                  {
                    airAreaInfo[0].so2Flag && airAreaInfo[0].so2Value === "-"
                    ?
                    <div className="state-info">
                      <h2>{airAreaInfo[0].so2Flag}</h2>
                    </div>
                    :
                    <div className="state-info">
                      <h2>
                        {airAreaInfo[0].so2Value < 0.021
                          ? "좋음"
                          : airAreaInfo[0].so2Value < 0.051
                          ? "보통"
                          : airAreaInfo[0].so2Value < 0.151
                          ? "나쁨"
                          : "매우나쁨"}
                      </h2>
                      <p className="air_type">아황산가스 (SO₂)</p>
                      <p className="air_num_data">{airAreaInfo[0].so2Value}ppm</p>
                    </div>
                  }
                </div>
              </div>
              <div className="air-quality-item">
                <div className="air-quality-range">
                  <CircularSlider
                    type="co"
                    grade={airAreaInfo[0].coGrade}
                    value={airAreaInfo[0].coValue !== "-" ? airAreaInfo[0].coValue : 0}
                    maxValue={20}
                    isMobileSize={isMobileSize}
                  />
                  <span className="air-value-sm co">
                    {airAreaInfo[0].coValue}
                  </span>
                </div>
                <div className="air-quality-txt sm">
                  {
                    airAreaInfo[0].coFlag && airAreaInfo[0].coValue === "-"
                      ?
                      <div className="state-info">
                        <h2>{airAreaInfo[0].coFlag}</h2>
                      </div>
                      :
                    <div className="state-info">
                      <h2>
                        {airAreaInfo[0].coValue < 2.01
                          ? "좋음"
                          : airAreaInfo[0].coValue < 9.01
                          ? "보통"
                          : airAreaInfo[0].coValue < 15.01
                          ? "나쁨"
                          : "매우나쁨"}
                      </h2>
                      <p className="air_type">일산화탄소 (CO)</p>
                      <p className="air_num_data">{airAreaInfo[0].coValue}ppm</p>
                    </div>
                  }
                </div>
              </div>
              <div className="air-quality-item">
                <div className="air-quality-range">
                  <CircularSlider
                    type="no2"
                    grade={airAreaInfo[0].no2Grade}
                    value={airAreaInfo[0].no2Value !== "-" ? airAreaInfo[0].no2Value : 0}
                    maxValue={0.3}
                    isMobileSize={isMobileSize}
                  />
                  <span className="air-value-sm no2">
                    {airAreaInfo[0].no2Value}
                  </span>
                </div>
                <div className="air-quality-txt sm">
                  {
                    airAreaInfo[0].no2Flag && airAreaInfo[0].no2Value === "-"
                      ?
                      <div className="state-info">
                        <h2>{airAreaInfo[0].no2Flag}</h2>
                      </div>
                      :
                    <div className="state-info">
                      <h2>
                        {airAreaInfo[0].no2Value < 0.0301
                          ? "좋음"
                          : airAreaInfo[0].no2Value < 0.0601
                          ? "보통"
                          : airAreaInfo[0].no2Value < 0.201
                          ? "나쁨"
                          : "매우나쁨"}
                      </h2>
                      <p className="air_type">이산화질소 (NO₂)</p>
                      <p className="air_num_data">{airAreaInfo[0].no2Value}ppm</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <AirStateCharts data={airAreaInfo} />
        </>
      ) : (
        <div className="card">
          <p className="info_txt">
            ※ 사용자 위치정보 제공을 허용해주실 경우 현재 위치의 대기정보 서비스
            이용이 가능합니다.
          </p>
        </div>
      )}
      <AirPopup isPopOpen={isPopOpen} onClose={closePopup} itemCode={"CAI"} />
    </>
  );
};

export default MyLocationAirway;
