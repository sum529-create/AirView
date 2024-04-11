import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getCtprvnMesureLIst } from "../services/api";
import { IArpltnStatsSvc } from "../utils/types";
import AirStatePopup from "./AirStatePopup";

const AirQualityUl = styled.ul`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  .city_nm {
    font-weight: 500;
    color: #333;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.6vw;
    height: calc(4.6vw);
    max-width: 40px;
    max-height: 40px;
    text-align: center;
    border-radius: 50px;
    background-color: #7f8fa6;
    .air_condition {
      display: block;
      font-weight: 600;
      color: #fff;
      .air_state {
        display: inline-block;
        padding: 10px 0;
        text-align: center;
      }
    }
  }
  .air_good {
    background-color: #00a8ff;
  }
  .air_normal {
    background-color: #4cd137;
  }
  .air_bad {
    background-color: #fbc531;
  }
  .air_veryBad {
    background-color: #e84118;
  }
  .city_seoul,
  .city_incheon,
  .city_gyeonggi,
  .city_gangwon,
  .city_chungnam,
  .city_sejong,
  .city_chungbuk,
  .city_gyeongbuk,
  .city_daejeon,
  .city_jeonnam,
  .city_daegu,
  .city_ulsan,
  .city_gwangju,
  .city_jeonbuk,
  .city_gyeongnam,
  .city_busan,
  .city_jeju {
    position: absolute;
    z-index: 99;
    text-align: center;
    cursor: pointer;
  }
  .city_seoul {
    /* left: 258px;
    top: 120px; */
    left: 38%;
    top: 16%;
  }
  .city_incheon {
    /* top: 140px;
    left: 210px; */
    top: 18.45%;
    left: 31.11%;
  }
  .city_gyeonggi {
    /* top: 120px;
    left: 320px; */
    top: 15.5%;
    left: 47.5%;
  }
  .city_gangwon {
    /* top: 90px;
    left: 420px; */
    top: 11.8%;
    left: 62.14%;
  }
  .city_chungnam {
    /* top: 240px;
    left: 195px; */
    top: 31.6%;
    left: 28.8%;
  }
  .city_sejong {
    /* top: 245px;
    left: 280px; */
    top: 32.3%;
    left: 41.4%;
  }
  .city_chungbuk {
    /* top: 210px;
    left: 360px; */
    top: 27.5%;
    left: 53.2%;
  }
  .city_gyeongbuk {
    /* top: 260px;
    left: 480px; */
    top: 34.3%;
    left: 71%;
  }
  .city_daejeon {
    /* top: 310px;
    left: 300px; */
    top: 41%;
    left: 44.8%;
  }
  .city_jeonbuk {
    /* top: 360px;
    left: 250px; */
    top: 47.4%;
    left: 37%;
  }
  .city_daegu {
    /* top: 340px;
    left: 432px; */
    top: 44.8%;
    left: 63.9%;
  }
  .city_ulsan {
    /* top: 390px;
    left: 500px; */
    top: 51.4%;
    left: 74%;
  }
  .city_gwangju {
    /* top: 445px;
    left: 240px; */
    top: 58.7%;
    left: 35.6%;
  }
  .city_jeonnam {
    /* top: 510px;
    left: 210px; */
    top: 66.9%;
    left: 31%;
  }
  .city_gyeongnam {
    /* top: 420px;
    left: 380px; */
    top: 55.3%;
    left: 56.3%;
  }
  .city_busan {
    /* top: 450px;
    left: 470px; */
    top: 59.4%;
    left: 69.5%;
  }
  .city_jeju {
    /* top: 650px;
    left: 210px; */
    top: 85.65%;
    left: 31.08%;
  }
  .air_dataTime {
    left: 1.5%;
    top: 95%;
  }
  .screen_out {
    display: block;
    overflow: hidden;
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }
  .air_dataTime {
    position: absolute;
    left: 10px;
    top: 720px;
    display: block;
    width: 120px;
  }
`;
const Loading = styled.div`
  clear: both;
  @keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-moz-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-o-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-moz-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @-o-keyframes rotate-loading {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
    }
  }

  @keyframes loading-text-opacity {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes loading-text-opacity {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes loading-text-opacity {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-o-keyframes loading-text-opacity {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .loading-container,
  .loading {
    height: 100px;
    position: relative;
    width: 100px;
    border-radius: 100%;
  }

  .loading-container {
    margin: 50% auto;
  }

  .loading {
    border: 2px solid transparent;
    border-color: transparent #0fb9b1 transparent #0fb9b1;
    -moz-animation: rotate-loading 1.5s linear 0s infinite normal;
    -moz-transform-origin: 50% 50%;
    -o-animation: rotate-loading 1.5s linear 0s infinite normal;
    -o-transform-origin: 50% 50%;
    -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;
    -webkit-transform-origin: 50% 50%;
    animation: rotate-loading 1.5s linear 0s infinite normal;
    transform-origin: 50% 50%;
  }

  .loading-container:hover .loading {
    border-color: transparent #e45635 transparent #e45635;
  }
  .loading-container:hover .loading,
  .loading-container .loading {
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
  }

  #loading-text {
    -moz-animation: loading-text-opacity 2s linear 0s infinite normal;
    -o-animation: loading-text-opacity 2s linear 0s infinite normal;
    -webkit-animation: loading-text-opacity 2s linear 0s infinite normal;
    animation: loading-text-opacity 2s linear 0s infinite normal;
    color: #218c74;
    font-family: "Helvetica Neue", "Helvetica", "arial";
    font-size: 10px;
    font-weight: bold;
    margin-top: 45px;
    opacity: 0;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    top: 0;
    width: 100px;
  }
`;
type Translations = {
  [key: string]: string;
};

const translateKey = (key: string) => {
  if (key === "itemCode") return null;
  const translations: Translations = {
    daegu: "대구",
    chungnam: "충남",
    incheon: "인천",
    daejeon: "대전",
    gyeongbuk: "경북",
    sejong: "세종",
    gwangju: "광주",
    jeonbuk: "전북",
    gangwon: "강원",
    ulsan: "울산",
    jeonnam: "전남",
    seoul: "서울",
    busan: "부산",
    jeju: "제주",
    chungbuk: "충북",
    gyeongnam: "경남",
    gyeonggi: "경기",
  };
  return translations[key] || key;
};

interface AirQualityListProps {
  selectedTab: string;
}

const AirQualityList: React.FC<AirQualityListProps> = ({ selectedTab }) => {
  if (!selectedTab) {
    selectedTab = "PM10";
  }
  const { isLoading, data: airTotalInfo } = useQuery<IArpltnStatsSvc>(
    ["airLocalData", selectedTab],
    () => getCtprvnMesureLIst(selectedTab)
  );
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [locationNm, setLocationNm] = useState("");
  const [locationEnNm, setLocationEnNm] = useState<string>("");
  const openPopup = (name: string | null) => {
    if (name) {
      setLocationNm(translateKey(name) || "");
      setLocationEnNm(name);
    }
    setIsPopOpen(true);
  };
  const closePopup = () => {
    setIsPopOpen(false);
  };

  if (isLoading)
    return (
      <Loading>
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-text">loading</div>
        </div>
      </Loading>
    );

  return (
    <>
      <AirQualityUl>
        {airTotalInfo &&
          Object.entries(airTotalInfo).map(([key, value], i) => {
            if (
              key !== "dataGubun" &&
              key !== "dataTime" &&
              key !== "itemCode"
            ) {
              return (
                <li
                  onClick={() => openPopup(key)}
                  key={`${key}-${i}`}
                  className={"city_" + key}
                >
                  <em className="city_nm">{translateKey(key)}</em>
                  {selectedTab === "PM10" ? (
                    <a
                      className={
                        value < 31
                          ? "air_good"
                          : value < 81
                          ? "air_normal"
                          : value < 151
                          ? "air_bad"
                          : "air_veryBad"
                      }
                    >
                      <span className="air_condition">
                        <span className="screen_out">{key}</span>
                        <span className="air_state">{value}</span>
                      </span>
                    </a>
                  ) : selectedTab === "PM25" ? (
                    <a
                      className={
                        value < 16
                          ? "air_good"
                          : value < 36
                          ? "air_normal"
                          : value < 76
                          ? "air_bad"
                          : "air_veryBad"
                      }
                    >
                      <span className="air_condition">
                        <span className="screen_out">{key}</span>
                        <span className="air_state">{value}</span>
                      </span>
                    </a>
                  ) : selectedTab === "SO2" ? (
                    <a
                      className={
                        value < 0.021
                          ? "air_good"
                          : value < 0.051
                          ? "air_normal"
                          : value < 0.151
                          ? "air_bad"
                          : "air_veryBad"
                      }
                    >
                      <span className="air_condition">
                        <span className="screen_out">{key}</span>
                        <span className="air_state">{value}</span>
                      </span>
                    </a>
                  ) : selectedTab === "CO" ? (
                    <a
                      className={
                        value < 3
                          ? "air_good"
                          : value < 10
                          ? "air_normal"
                          : value < 16
                          ? "air_bad"
                          : "air_veryBad"
                      }
                    >
                      <span className="air_condition">
                        <span className="screen_out">{key}</span>
                        <span className="air_state">{value}</span>
                      </span>
                    </a>
                  ) : selectedTab === "O3" || selectedTab === "NO2" ? (
                    <a
                      className={
                        value < 0.031
                          ? "air_good"
                          : value < 0.091
                          ? "air_normal"
                          : value < 0.151
                          ? "air_bad"
                          : "air_veryBad"
                      }
                    >
                      <span className="air_condition">
                        <span className="screen_out">{key}</span>
                        <span className="air_state">{value}</span>
                      </span>
                    </a>
                  ) : null}
                </li>
              );
            } else if (key === "dataTime") {
              return (
                <li key={key} className="air_dataTime">
                  {value}
                </li>
              );
            } else {
              return null;
            }
          })}
      </AirQualityUl>
      <AirStatePopup
        isPopOpen={isPopOpen}
        onClose={closePopup}
        locationNm={locationNm}
        locationEnNm={locationEnNm}
        selectedTab={selectedTab}
      />
    </>
  );
};

export default AirQualityList;
