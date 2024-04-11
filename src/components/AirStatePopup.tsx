import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCtprvnMesureSidoLIst } from "../services/api";
import "../styles/AirPopup.css";
import "../styles/AirStatePopup.css";
import { ICtprvnMesureSidoLIst } from "../utils/types";
import AirStateQualityList from "./AirStateQualityList";

interface PopupProps {
  isPopOpen: boolean;
  onClose: () => void;
  locationNm: string;
  locationEnNm: string;
  selectedTab: string;
}

const AirStatePopup: FC<PopupProps> = ({
  isPopOpen,
  onClose,
  locationNm,
  locationEnNm,
  selectedTab,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isLoading, data: airSidoData } = useQuery<ICtprvnMesureSidoLIst>(
    ["airSidoData", locationNm],
    () => getCtprvnMesureSidoLIst(locationNm)
  );
  useEffect(() => {
    if (isPopOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 500); // transition duration과 동일한 시간 이후에 상태 변경
    }
  }, [isPopOpen]);

  if (!isVisible) return null;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      className={`popup-container ${isPopOpen ? "popup-show" : "popup-hide"}`}
    >
      <div className="popup-background" onClick={onClose}></div>
      <div className="popup-content">
        <div className="popup-close" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </div>
        <div className="popup-header">
          <div className="main-title">
            {/* <h1 className="sub-title-mo">{itemCode} </h1> */}
            <h1>{locationNm} 대기정보</h1>
          </div>
          <img
            className="right_triangle"
            src={process.env.PUBLIC_URL + "/images/right_triangle.png"}
          />
          <img
            className="triangle"
            src={process.env.PUBLIC_URL + "/images/triangle.png"}
          />
          <div className="sub-title">
            <h2>
              {airSidoData && Object.keys(airSidoData).length > 0
                ? airSidoData[Object.keys(airSidoData)[0]]?.dataTime
                : null}
            </h2>
          </div>
        </div>
        <div className="popup-body">
          <div className="popup-image-sec">
            <img
              className="local_map"
              src={
                process.env.PUBLIC_URL +
                "/images/maps/" +
                locationEnNm +
                ".jpeg"
              }
            />
            {airSidoData && (
              <AirStateQualityList
                airSidoData={airSidoData}
                locationNm={locationNm}
                selectedTab={selectedTab}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirStatePopup;
