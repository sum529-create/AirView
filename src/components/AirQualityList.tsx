import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getCtprvnMesureLIst } from "../services/api";
import { IArpltnStatsSvc } from "../utils/types";
import AirStatePopup from "./AirStatePopup";
import {
  getAirQualityClassName,
  getAirQualityKorConClsNm,
} from "../utils/helpers";
import Loading from "./Loading";

const AirQualityUl = styled.ul`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  .city_nm {
    font-weight: 500;
    color: #333;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.6vw;
    height: 4.6vw;
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
        padding: 10px 3px;
        text-align: center;
        @media (max-width: 768px) {
          font-size: 12px;
        }
      }
    }
    @media (max-width: 600px) {
      width: auto;
    }
  }
  @media (max-width: 768px) {
    .air_condition_tom {
      font-size: 0px;
      a {
        width: 4.6vw;
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
  .city_jeju,
  .city_southGyeonggi,
  .city_northGyeonggi,
  .city_yeongdong,
  .city_yeongseo {
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
    left: 28.11%;
  }
  .city_gyeonggi {
    /* top: 120px;
    left: 320px; */
    top: 15.5%;
    left: 48.5%;
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
    top: 31.3%;
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
    left: 45.8%;
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
    top: 49.4%;
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
    top: 67.9%;
    left: 29%;
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
  .city_yeongdong {
    right: 25%;
    top: 18%;
  }
  .city_yeongseo {
    right: 36%;
    top: 10%;
  }
  .city_southGyeonggi {
    top: 19%;
    left: 46%;
  }
  .city_northGyeonggi {
    top: 6%;
    left: 41%;
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
    top: 3%;
    right: 3%;
    display: block;
    background: #fff;
    border: 1px solid #a5b1c2;
    text-align: center;
    border-radius: 13px;
    padding: 3px 14px;
    font-size: 14px;
    font-weight: 600;
    color: #666;
    span.material-symbols-outlined {
      font-size: 16px;
      position: relative;
      top: 3px;
      margin-right: 3px;
      cursor: pointer;
    }
  }
`;
type Translations = {
  [key: string]: string;
};

const translateKey = (key: string, lang: string) => {
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
    northGyeonggi: "경기북부",
    southGyeonggi: "경기남부",
    yeongdong: "영동",
    yeongseo: "영서",
  };
  const reversedTranslations: { [key: string]: string } = Object.entries(
    translations
  ).reduce<{ [key: string]: string }>((acc, [eng, kor]) => {
    acc[kor] = eng;
    return acc;
  }, {});

  if (lang === "eng") {
    return translations[key] || key;
  } else if (lang === "kor") {
    return reversedTranslations[key] || key;
  }
  return "city";
};

interface AirQualityListProps {
  selectedTab: string;
  selectedSubTab: number;
  onLoadingChange: (isLoading: boolean) => void;
  tomAirData: object;
}

const AirQualityList: React.FC<AirQualityListProps> = ({
  selectedTab,
  selectedSubTab,
  onLoadingChange,
  tomAirData,
}) => {
  if (!selectedTab) {
    selectedTab = "PM10";
  }
  if (!selectedSubTab) selectedSubTab = 0;
  const { isLoading, data: airTotalInfo } = useQuery<IArpltnStatsSvc>(
    ["airLocalData", selectedTab, selectedSubTab],
    () => getCtprvnMesureLIst(selectedTab, selectedSubTab)
  );
  useEffect(() => {
    onLoadingChange(isLoading);
  }, [isLoading]);

  const [isPopOpen, setIsPopOpen] = useState(false);
  const [locationNm, setLocationNm] = useState("");
  const [locationEnNm, setLocationEnNm] = useState<string>("");
  const openPopup = (name: string | null) => {
    if (name) {
      setLocationNm(translateKey(name, "eng") || "");
      setLocationEnNm(name);
    }
    setIsPopOpen(true);
  };
  const closePopup = () => {
    setIsPopOpen(false);
  };

  if (isLoading) return <Loading />;

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
                  <em className="city_nm">{translateKey(key, "eng")}</em>
                  {selectedTab && (
                    <a className={getAirQualityClassName(value, selectedTab)}>
                      <span className="air_condition">
                        <span className="screen_out">{key}</span>
                        <span className="air_state">{value}</span>
                      </span>
                    </a>
                  )}
                </li>
              );
            } else if (key === "dataTime") {
              return (
                <li key={key} className="air_dataTime">
                  <span
                    onClick={() =>
                      getCtprvnMesureLIst(selectedTab, selectedSubTab)
                    }
                    className="material-symbols-outlined"
                  >
                    refresh
                  </span>
                  <span>{value}</span>
                </li>
              );
            } else {
              return null;
            }
          })}
        {tomAirData &&
          Object.entries(tomAirData).map(([key, value], i) => {
            return (
              <li key={i} className={"city_" + (translateKey(key, "kor") || i)}>
                <em className="city_nm">{key}</em>
                <span className="air_condition air_condition_tom">
                  <a className={getAirQualityKorConClsNm(value)}>
                    <span className="screen_out">{key}</span>
                    <span className="air_state">{value}</span>
                  </a>
                </span>
              </li>
            );
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
