import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getCtprvnMesureLIst } from "../services/api";
import { IArpltnStatsSvc } from "../utils/types";

const AirQualityUl = styled.ul`
  position: absolute;
  .city_nm {
    font-weight: 500;
    color: #333;
  }
  a {
    display: block;
    width: 40px;
    height: 40px;
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
  }
  .city_seoul {
    left: 258px;
    top: 120px;
  }
  .city_incheon {
    top: 140px;
    left: 210px;
  }
  .city_gyeonggi {
    top: 120px;
    left: 320px;
  }
  .city_gangwon {
    top: 90px;
    left: 420px;
  }
  .city_chungnam {
    top: 240px;
    left: 195px;
  }
  .city_sejong {
    top: 245px;
    left: 280px;
  }
  .city_chungbuk {
    top: 210px;
    left: 360px;
  }
  .city_gyeongbuk {
    top: 260px;
    left: 480px;
  }
  .city_daejeon {
    top: 310px;
    left: 300px;
  }
  .city_jeonbuk {
    top: 360px;
    left: 250px;
  }
  .city_daegu {
    top: 340px;
    left: 432px;
  }
  .city_ulsan {
    top: 390px;
    left: 500px;
  }
  .city_gwangju {
    top: 445px;
    left: 240px;
  }
  .city_jeonnam {
    top: 510px;
    left: 210px;
  }
  .city_gyeongnam {
    top: 420px;
    left: 380px;
  }
  .city_busan {
    top: 450px;
    left: 470px;
  }
  .city_jeju {
    top: 650px;
    left: 210px;
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

  if (isLoading)
    return (
      <Loading>
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-text">loading</div>
        </div>
      </Loading>
    );
  console.log(selectedTab);

  return (
    <AirQualityUl>
      {airTotalInfo &&
        Object.entries(airTotalInfo).map(([key, value], i) => {
          if (key !== "dataGubun" && key !== "dataTime" && key !== "itemCode") {
            return (
              <li key={i} className={"city_" + key}>
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
            return <li className="air_dataTime">{value}</li>;
          } else {
            return null;
          }
        })}
    </AirQualityUl>
  );
};

export default AirQualityList;
