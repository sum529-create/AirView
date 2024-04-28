import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { formateDate } from "../utils/helpers";
import AirPopup from "./AirPopup";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const WrapTab = styled.div`
  height: 90px;
  background: #fff;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  .sel_tab_mo_hid{
    display:none;
  }
  .sel_tab_mo{
    display: flex;
    height: 50px;
    font-size: 18px;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    background: #38ada9;
    color: #FFF;
    font-weight: 600;
  }
  .main_tab {
    background: #38ada9;
    height: 50px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      color: #fff;
      text-align: center;
      li {
        flex-grow: 1;
        margin: 0 auto;
        width: calc(676px / 6);
        font-weight: 600;
        position: relative;
        cursor: pointer;
        word-break: keep-all;
        &.check_on {
          background: #21858c;
          &::after {
            display: none;
          }
        }
        .air_txt {
          width: calc(100% - 14px);
          padding: 7px;
          @media (max-width: 768px) {
            width: 95px;
          }
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
        @media (min-width: 769px) {
          &::after {
            content: "";
            height: 26px;
            width: 1px;
            background: #21858c;
            position: absolute;
            top: 14px;
            right: 0;
          }
        }
        &:last-child::after {
          display: none;
        }
        &:hover {
          background-color: #2bcbba;
        }
        @media (max-width: 768px) {
          width: 100%;
        }
      }
    }
  }
  .sub_tab {
    border-bottom: 1px solid #e8e8e8;
    height: 40px;
    cursor: pointer;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;
      li {
        width: 100px;
        padding: 10px 4px 0px;
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
            margin-top: 8px;
          }
        }
        &:hover {
          color: #10ac84;
        }
      }
    }
  }
  .nav_item_mo {
    display: none;
  }
  @media (max-width: 768px) {
    /* height: 40px; */
    .main_tab_mo {
      height: auto;
      width: calc(100vw / 6);
      min-width: 107px;
      position: absolute;
      z-index: 100;
      /* margin-top: 40px; */
      box-shadow: 1px 12px 10px 5px rgba(0, 0, 0, 0.11);
      display: block;
      animation: ${fadeIn} 0.5s linear forwards;
    }
    .main_tab_mo_hid {
      display: none;
      animation: ${fadeOut} 0.5s linear forwards;
    }
    .nav_item_mo {
      display: block;
      cursor: pointer;
      width: 50px;
      height: 50px;
      background: #38ada9;
      color: #fff;
      float: left;
      padding: 5px;
      span {
        font-size: 40px;
      }
    }
    .sub_tab {
      width: 100%;
      ul li {
        width: calc(100% / 3);
        padding: 10px 3px;
        /* &.check_day::after {
          margin: 0;
        } */
      }
    }
  }
`;
interface TabAirProps {
  onSelectTab: (tab: string) => void;
  onSelectSubTab: (tab: number) => void;
}
const TabAir: React.FC<TabAirProps> = ({ onSelectTab, onSelectSubTab }) => {
  const [isSelectedTab, setIsSelectedTab] = useState("PM10");
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isMainTabMo, setIsMainTabMo] = useState(false);
  const [isMobileSize, setIsMobileSize] = useState(false);
  const [isSelectedSubTab, setIsSelectedSubTab] = useState(0);
  const openPopup = (tab: string) => {
    setIsPopOpen(true);
    setIsSelectedTab(tab);
  };
  const formatDateWithOffset = (offset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return formateDate(date, 1);
  };
  const closePopup = () => {
    setIsPopOpen(false);
  };
  const handleAirState = (tab: string) => {
    // pm10: 미세먼지 , pm2.5: 초미세먼지, so2: 아황산가스, co:일산화탄소, o3:오존, no2:이산화탄소
    onSelectTab(tab);
    setIsSelectedTab(tab);
    setIsMainTabMo(false);
  };
  const handleDaily = (day: number) => {
    onSelectSubTab(day);
    setIsSelectedSubTab(day);
  };
  const openMobileTab = () => {
    setIsMainTabMo((e) => !e);
  };
  useEffect(() => {
    function handleResize() {
      const newIsMainTabMo = window.innerWidth < 768; 
      setIsMobileSize(newIsMainTabMo);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <WrapTab>
        <div onClick={openMobileTab} className="nav_item_mo">
          <span className="material-symbols-outlined">list</span>
        </div>
        <div className={isMobileSize ? "sel_tab_mo" : "sel_tab_mo_hid"}>
          {
            isSelectedTab === "PM10" 
            ? isSelectedTab + " (미세먼지)"
            : isSelectedTab === "PM25"
            ? "PM2.5 (초미세먼지)"
            : isSelectedTab === "O3"
            ? isSelectedTab + " (오존)"
            : isSelectedTab === "SO2"
            ? isSelectedTab + " (아황산가스)"
            : isSelectedTab === "CO"
            ? isSelectedTab + " (일산화탄소)"
            : isSelectedTab + " (이산화질소)"
          }
        </div>
        <div
          className={`main_tab ${
            isMainTabMo ? "main_tab_mo" : "main_tab_mo_hid"
          }`}
        >
          <ul>
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
        </div>
        <div className="sub_tab">
          <ul>
            <li
              onClick={() => handleDaily(-1)}
              className={`base_date ${
                isSelectedSubTab === -1 ? "check_day" : ""
              }`}
            >
              어제 {formatDateWithOffset(-1)}
            </li>
            <li
              onClick={() => handleDaily(0)}
              className={`base_date ${
                isSelectedSubTab === 0 ? "check_day" : ""
              }`}
            >
              오늘 {formatDateWithOffset(0)}
            </li>
            {(isSelectedTab === "PM10" ||
              isSelectedTab === "PM25" ||
              isSelectedTab === "O3") && (
              <li
                onClick={() => handleDaily(1)}
                className={`base_date ${
                  isSelectedSubTab === 1 ? "check_day" : ""
                }`}
              >
                내일 {formatDateWithOffset(1)}
              </li>
            )}
          </ul>
        </div>
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
