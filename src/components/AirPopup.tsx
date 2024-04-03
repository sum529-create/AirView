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
          <h2>{itemCode}</h2>
        </div>
        {/* 팝업 내용 */}
        <div className="popup-body">
          <ul className="pol_standards">
            <li>
              <img
                src={process.env.PUBLIC_URL + "/images/good.gif"}
                alt="좋음"
              />
              <div className="air_grade_info air_good">
                <div className="air_grade_tit">
                  <h2>좋음</h2>
                  <p>PMno 0w30(ug/ mil) PM250~15(cal/ml)</p>
                </div>
                <div className="air_grade_txt">
                  대기오염 관련 진환자군에서도 영향이 유발되지 않을 수준
                </div>
              </div>
            </li>
            <li>
              <img
                src={process.env.PUBLIC_URL + "/images/normal.gif"}
                alt="보통"
              />
              <div className="air_grade_info air_normal">
                <div className="air_grade_tit">
                  <h2>보통</h2>
                  <p>PM10 31~80(ug/ml) PM2516~35(1/ ml)</p>
                </div>
                <div className="air_grade_txt">
                  환자군에게 만성 노출시 경미한 영향이 유발될 수 있는 수준
                </div>
              </div>
            </li>
            <li>
              <img
                src={process.env.PUBLIC_URL + "/images/bad.gif"}
                alt="나쁨"
              />
              <div className="air_grade_info air_bad">
                <div className="air_grade_tit">
                  <h2>나쁨</h2>
                  <p>PMo 81~150(0g/mil) PM2s 36~75(ug/ m)</p>
                </div>
                <div className="air_grade_txt">
                  환자군 및 민감군(어린이, 노약자 등)에게 유해한 영향 유발,
                  일반인도 건강상 불쾌감을 경험할 수 있는 수준
                </div>
              </div>
            </li>
            <li>
              <img
                src={process.env.PUBLIC_URL + "/images/very bad.gif"}
                alt="매우나쁨"
              />
              <div className="air_grade_info air_verybad">
                <div className="air_grade_tit">
                  <h2>매우나쁨</h2>
                  <p>PM1o 151(4g/mi)이상 PM2s 76(ug/ ml)이상</p>
                </div>
                <div className="air_grade_txt">
                  한자군 및 민감군에게 급성 노출시 심각한 영향 유발, 일반인도
                  약한 영향이 유발될 수 있는 수준
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AirPopup;
