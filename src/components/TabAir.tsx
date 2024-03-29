import React from "react";
import styled from "styled-components";

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
      padding: 7px;
      font-weight: 600;
      position: relative;
      &.check_on {
        background: #21858c;
        &::after {
          display: none;
        }
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

function TabAir() {
  return (
    <>
      <WrapTab>
        <ul className="main_tab">
          <li className="nav_item check_on">
            <span>PM10</span>
            <span className="air_codeNm">(미세먼지)</span>
          </li>
          <li className="nav_item">
            <span>PM2.5</span>
            <span className="air_codeNm">(초미세먼지)</span>
          </li>
          <li className="nav_item">
            <span>SO2</span>
            <span className="air_codeNm">(아황산가스)</span>
          </li>
          <li className="nav_item">
            <span>CO</span>
            <span className="air_codeNm">(일산화탄수)</span>
          </li>
          <li className="nav_item">
            <span>O3</span>
            <span className="air_codeNm">(오존)</span>
          </li>
          <li className="nav_item">
            <span>NO2</span>
            <span className="air_codeNm">(이산화질소)</span>
          </li>
        </ul>
        <ul className="sub_tab">
          <li className="base_date">어제 03.28</li>
          <li className="base_date check_day">오늘 03.29</li>
          <li className="base_date">내일 03.30</li>
        </ul>
      </WrapTab>
    </>
  );
}

export default TabAir;
