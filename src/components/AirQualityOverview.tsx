import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { IAirData } from "../utils/types";
import { useQuery } from "react-query";
import { fetchTxtInfo } from "../services/api";
import StandbyStateMap from "./StandbyStateMap";
import MyLocationAirway from "./MyLocationAirway";

const TodayWeatherArea = styled.div`
  position: relative;
  height: 200px;
  padding: 10px;
  background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
  border-radius: 8px;
  margin: 10px 0;
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
  @media (max-width: 768px) {
    position: initial;
    height: 300px;
    .todayAirTime {
      position: initial;
      width: 100%;
      max-width: none;
      margin-top: 0;
      margin-bottom: 10px;
    }
    .todayAirInfo {
      position: initial;
      width: 100%;
      padding-right: 0;
      height: calc(100% - 60px);
      .todayAirInfoArea {
        /* display: flex;
        justify-content: center;
        align-items: center; */
        .todayAirInfoTxt {
          position: initial;
          float: none;
          width: 100%;
          transform: none;
          padding: 10px;
        }
        strong {
          display: block;
          width: 100%;
          position: initial;
          float: none;
          padding: 10px 19px;
          max-width: none;
          border-bottom: 1px solid #abecd6;
        }
      }
    }
  }
`;
const AirQualityArea = styled.div`
  background: #fff;
  .card {
    width: 100%;
    position: relative;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 15px; 
    border-radius: 10px;
    display: inline-block;
    .sub-title {
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
      margin: 10px 18px;
      color: #666;
      word-break: keep-all;
      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
type AirQualityProps = {
  selectedSubTab: number;
  selectedTab: string;
  getTomAirData: (data: object) => void;
};
function parseInformGrade(data: string): Record<string, string> {
  const regions = data.split(","); // 콤마를 기준으로 지역별 데이터 분리
  const result: Record<string, string> = {};

  regions.forEach((region) => {
    const [key, value] = region.split(" : ").map((item) => item.trim()); // 콜론을 기준으로 키와 값 분리 후 양쪽 공백 제거
    result[key] = value; // 객체에 키-값 쌍으로 저장
  });

  return result;
}

const TextRotator: React.FC<{ texts: any; interval: number }> = ({
  texts,
  interval,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIdx((pre) => (pre + 1) % texts.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [texts, interval]);
  return <div>{texts[currentIdx]}</div>;
};

function AirQualityOverview({
  selectedSubTab,
  selectedTab,
  getTomAirData,
}: AirQualityProps) {
  const { isLoading, data: airTotalInfo } = useQuery<IAirData[]>(
    "airDataTxtInfo",
    fetchTxtInfo
  );
  const currentInformGrade = useMemo(() => {
    if (isLoading || !airTotalInfo) {
      return null; // 로딩 중이거나 데이터가 없는 경우 null 반환
    }
    if (selectedSubTab === 1) {
      switch (selectedTab) {
        case "PM10":
          return airTotalInfo[1].informGrade;
        case "PM25":
          return airTotalInfo[3].informGrade;
        default:
          return airTotalInfo[5].informGrade;
      }
    }
    return null;
  }, [isLoading, selectedSubTab, selectedTab, airTotalInfo]);

  // useEffect도 마찬가지로 모든 렌더링에서 호출
  useEffect(() => {
    if (currentInformGrade) {
      getTomAirData(parseInformGrade(currentInformGrade));
    } else {
      getTomAirData({});
    }
  }, [currentInformGrade, getTomAirData]);

  if (isLoading) {
    return <div>Loading...</div>; // isLoading 조건을 훅 아래로 이동
  }

  const texts = airTotalInfo
  ? [
      airTotalInfo[0].informOverall.replace(/※.*/, ''),
      airTotalInfo[0].informCause.replace(/※.*/, '')
    ]
  : [];
  const images1 = airTotalInfo
    ? [
        airTotalInfo[0].imageUrl1,
        airTotalInfo[0].imageUrl2,
        airTotalInfo[0].imageUrl3,
      ]
    : [];
  const images2 = airTotalInfo
    ? [
        airTotalInfo[0].imageUrl4,
        airTotalInfo[0].imageUrl5,
        airTotalInfo[0].imageUrl6,
      ]
    : [];
  const interval = 8000;

  return (
    <>
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
      <AirQualityArea>
        <MyLocationAirway />
        <div className="card">
          <p className="sub-title">대기 상태 지도</p>
          <div className="airQuality">
            <StandbyStateMap images={images1} state="pm10" />
            <StandbyStateMap images={images2} state="pm2.5" />
          </div>
        </div>
      </AirQualityArea>
    </>
  );
}

export default AirQualityOverview;
