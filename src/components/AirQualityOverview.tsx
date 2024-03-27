import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IAirData } from "../utils/types";
import { useQuery } from "react-query";
import { fetchTxtInfo } from "../services/api";

const TodayWeatherArea = styled.div`
  position: relative;
  height: 200px;
  padding: 10px;
  background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
  border-radius: 8px;
  margin-top: 10px;
  .todayAirTime {
    position: absolute;
    max-width: 130px;
    font-size: 20px;
    word-break: keep-all;
    font-weight: 600;
    text-align: center;
    margin-top: 65px;
  }
  .todayAirInfo {
    position: absolute;
    right: 10px;
    width: calc(100% - 150px);
    height: 180px;
    padding: 0 20px 0 0;
    background: #fff;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    .todayAirInfoArea {
      strong {
        position: relative;
        float: left;
        padding: 68.5px 19px;
        word-break: keep-all;
        max-width: 70px;
        font-size: 18px;
        font-weight: 700;
        color: #666;
        &::after {
          position: absolute;
          content: "";
          width: 1px;
          height: 140px;
          background: #abecd6;
          right: 0;
          top: 22px;
        }
      }
      .todayAirInfoTxt {
        position: absolute;
        display: block;
        float: right;
        width: 509px;
        word-break: keep-all;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 100px;
        line-height: 1.3;
      }
    }
  }
`;

function AirQualityOverview() {
  const { isLoading, data: airTotalInfo } = useQuery<IAirData[]>(
    "airDataTxtInfo",
    fetchTxtInfo
  );

  const TextRotator: React.FC<{ texts: any; interval: number }> = ({
    texts,
    interval,
  }) => {
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIdx((pre) => (pre + 1) % texts.length);
      }, interval);
      return () => clearInterval(interval);
    }, [texts, interval]);
    return <div>{texts[currentIdx]}</div>;
  };

  if (isLoading) return <div>Loading...</div>;
  const texts = airTotalInfo
    ? [airTotalInfo[0].informOverall, airTotalInfo[0].informCause]
    : [];
  const interval = 3000;

  return (
    <TodayWeatherArea>
      {airTotalInfo && airTotalInfo.length > 0 && (
        <>
          <div className="todayAirTime">{airTotalInfo[0].dataTime}</div>
          <div className="todayAirInfo">
            <span className="todayAirInfoArea">
              <strong>예보 발표</strong>
              <span className="todayAirInfoTxt">
                <TextRotator texts={texts} interval={interval} />
              </span>
            </span>
          </div>
        </>
      )}
    </TodayWeatherArea>
  );
}

export default AirQualityOverview;
