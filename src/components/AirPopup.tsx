import React, { FC, useState, useEffect } from "react";
import "../styles/AirPopup.css"; // CSS 파일 임포트

interface PopupProps {
  isPopOpen: boolean;
  onClose: () => void;
  itemCode: string;
}

const AirPopup: FC<PopupProps> = ({ isPopOpen, onClose, itemCode }) => {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div
      className={`popup-container ${isPopOpen ? "popup-show" : "popup-hide"}`}
    >
      {/* 배경 */}
      <div className="popup-background" onClick={onClose}></div>
      {/* 팝업 내용 */}
      <div className="popup-content">
        {/* 팝업 닫기 버튼 */}
        <div className="popup-close" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </div>
        {/* 팝업 제목 */}
        <div className="popup-header">
          <h2>팝업 제목</h2>
        </div>
        {/* 팝업 내용 */}
        <div className="popup-body">{itemCode}</div>
      </div>
    </div>
  );
};

export default AirPopup;
