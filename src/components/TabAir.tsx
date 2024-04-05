import React, { useState } from "react";
import styled from "styled-components";
import AirPopup from "./AirPopup";

const WrapTab = styled.div`
  width: 676px;
  height: 90px;
  background: #fff;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  .main_tab {
    background: #38ada9;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    color: #fff;
    text-align: center;
    li {
      flex-grow: 1;
      margin: 0 auto;
      width: 112px;
      font-weight: 600;
      position: relative;
      cursor: pointer;
      &.check_on {
        background: #21858c;
        &::after {
          display: none;
        }
      }
      .air_txt {
        width: calc(100% - 14px);
        padding: 7px;
      }
      .air_info {
        font-size: 14px;
        position: absolute;
        right: 6px;
        top: 0px;
        height: 50px;
        padding: 18px 0px;
      }
      span {
        display: block;
        &.air_codeNm {
          font-size: 14px;
        }
      }
      &::after {
        content: "";
        height: 26px;
        width: 1px;
        background: #21858c;
        position: absolute;
        top: 14px;
        right: 0;
      }
      &:last-child::after {
        display: none;
      }
    }
  }
  .sub_tab {
    border-bottom: 1px solid #e8e8e8;
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    li {
      width: 100px;
      padding: 10px 4px;
      color: #686868;
      font-weight: 500;
      &.check_day {
        color: #1abc9c;
        font-weight: 600;
        &::after {
          display: block;
          content: "";
          height: 3px;
          background-color: #10ac84;
          margin: 8px 0;
        }
      }
    }
  }
`;
interface TabAirProps {
  onSelectTab: (tab: string) => void;
}
const TabAir: React.FC<TabAirProps> = ({ onSelectTab }) => {
  const [isSelectedTab, setIsSelectedTab] = useState("PM10");
  const [isPopOpen, setIsPopOpen] = useState(false);
  const openPopup = (tab: string) => {
    setIsPopOpen(true);
    setIsSelectedTab(tab);
  };

  const closePopup = () => {
    setIsPopOpen(false);
  };
  const handleAirState = (tab: string) => {
    // pm10: 미세먼지 , pm2.5: 초미세먼지, so2: 아황산가스, co:일산화탄소, o3:오존, no2:이산화탄소
    onSelectTab(tab);
    setIsSelectedTab(tab);
  };
  return (
    <>
      <WrapTab>
        <ul className="main_tab">
          <li
            className={
              "nav_item" +
              (isSelectedTab === "PM10" && !isPopOpen ? " check_on" : "")
            }
          >
            <div onClick={() => handleAirState("PM10")} className="air_txt">
              <span>PM10</span>
              <span className="air_codeNm">(미세먼지)</span>
            </div>
            <span
              onClick={() => openPopup("PM10")}
              className="material-symbols-outlined air_info"
            >
              info
            </span>
          </li>
          <li
            className={
              "nav_item" +
              (isSelectedTab === "PM25" && !isPopOpen ? " check_on" : "")
            }
          >
            <div onClick={() => handleAirState("PM25")} className="air_txt">
              <span>PM2.5</span>
              <span className="air_codeNm">(초미세먼지)</span>
            </div>
            <span
              onClick={() => openPopup("PM25")}
              className="material-symbols-outlined air_info"
            >
              info
            </span>
          </li>
          <li
            className={
              "nav_item" +
              (isSelectedTab === "SO2" && !isPopOpen ? " check_on" : "")
            }
          >
            <div onClick={() => handleAirState("SO2")} className="air_txt">
              <span>SO2</span>
              <span className="air_codeNm">(아황산가스)</span>
            </div>
            <span
              onClick={() => openPopup("SO2")}
              className="material-symbols-outlined air_info"
            >
              info
            </span>
          </li>
          <li
            className={
              "nav_item" +
              (isSelectedTab === "CO" && !isPopOpen ? " check_on" : "")
            }
          >
            <div onClick={() => handleAirState("CO")} className="air_txt">
              <span>CO</span>
              <span className="air_codeNm">(일산화탄소)</span>
            </div>
            <span
              onClick={() => openPopup("CO")}
              className="material-symbols-outlined air_info"
            >
              info
            </span>
          </li>
          <li
            className={
              "nav_item" +
              (isSelectedTab === "O3" && !isPopOpen ? " check_on" : "")
            }
          >
            <div onClick={() => handleAirState("O3")} className="air_txt">
              <span>O3</span>
              <span className="air_codeNm">(오존)</span>
            </div>
            <span
              onClick={() => openPopup("O3")}
              className="material-symbols-outlined air_info"
            >
              info
            </span>
          </li>
          <li
            className={
              "nav_item" +
              (isSelectedTab === "NO2" && !isPopOpen ? " check_on" : "")
            }
          >
            <div onClick={() => handleAirState("NO2")} className="air_txt">
              <span>NO2</span>
              <span className="air_codeNm">(이산화질소)</span>
            </div>
            <span
              onClick={() => openPopup("NO2")}
              className="material-symbols-outlined air_info"
            >
              info
            </span>
          </li>
        </ul>
        <ul className="sub_tab">
          <li className="base_date">어제 03.28</li>
          <li className="base_date check_day">오늘 03.29</li>
          <li className="base_date">내일 03.30</li>
        </ul>
      </WrapTab>
      <AirPopup
        isPopOpen={isPopOpen}
        onClose={closePopup}
        itemCode={isSelectedTab}
      />
    </>
  );
};

export default TabAir;
