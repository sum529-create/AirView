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
          <div className="main-title">
            <h1>대기상태별 예보 등급</h1>
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
            <h2>{itemCode}</h2>
          </div>
        </div>
        {/* 팝업 내용 */}
        <div className="popup-body">
          <ul className="pol_standards">
            <li>
              <img
                className="air_grade_img"
                src={process.env.PUBLIC_URL + "/images/good.gif"}
                alt="좋음"
              />
              <div className="air_grade_info air_good">
                <div className="air_grade_tit">
                  <h2>좋음</h2>
                </div>
                <div className="air_grade_txt">
                  대기오염 관련 진환자군에서도 영향이 유발되지 않을 수준
                </div>
              </div>
              <ul className="air_grade_detail">
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/good_01.gif"}
                    alt="마스크"
                  />
                  <span>마스크 필요없음</span>
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/good_02.gif"}
                    alt="실외활동"
                  />
                  <span>실외활동 지장없음</span>
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/good_03.gif"}
                    alt="환기"
                  />
                  <span>환기 지장없음</span>
                </li>
              </ul>
            </li>
            <li>
              <img
                className="air_grade_img"
                src={process.env.PUBLIC_URL + "/images/normal.gif"}
                alt="보통"
              />
              <div className="air_grade_info air_normal">
                <div className="air_grade_tit">
                  <h2>보통</h2>
                </div>
                <div className="air_grade_txt">
                  환자군에게 만성 노출시 경미한 영향이 유발될 수 있는 수준
                </div>
              </div>

              <ul className="air_grade_detail">
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/normal_01.gif"}
                    alt="마스크"
                  />
                  <span>마스크 필요없음</span>
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/normal_02.gif"}
                    alt="실외활동"
                  />
                  <span>실외활동 지장없음</span>
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/good_03.gif"}
                    alt="환기"
                  />
                  <span>환기 지장없음</span>
                </li>
              </ul>
            </li>
            <li>
              <img
                className="air_grade_img"
                src={process.env.PUBLIC_URL + "/images/bad.gif"}
                alt="나쁨"
              />
              <div className="air_grade_info air_bad">
                <div className="air_grade_tit">
                  <h2>나쁨</h2>
                </div>
                <div className="air_grade_txt">
                  환자군 및 민감군(어린이, 노약자 등)에게 유해한 영향 유발,
                  일반인도 건강상 불쾌감을 경험할 수 있는 수준
                </div>
              </div>

              <ul className="air_grade_detail">
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/bad_01.gif"}
                    alt="마스크"
                  />
                  <span>마스크 필수</span>
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/bad_02.gif"}
                    alt="실외활동"
                  />
                  <span>무리한 실외활동 자제</span>
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/bad_03.gif"}
                    alt="환기"
                  />
                  <span>최소한의 환기</span>
                </li>
              </ul>
            </li>
            <li>
              <img
                className="air_grade_img"
                src={process.env.PUBLIC_URL + "/images/very_bad.gif"}
                alt="매우나쁨"
              />
              <div className="air_grade_info air_verybad">
                <div className="air_grade_tit">
                  <h2>매우나쁨</h2>
                </div>
                <div className="air_grade_txt">
                  한자군 및 민감군에게 급성 노출시 심각한 영향 유발, 일반인도
                  약한 영향이 유발될 수 있는 수준
                </div>
              </div>

              <ul className="air_grade_detail">
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/very_bad_01.gif"}
                    alt="마스크"
                  />
                  <span>마스크 필수</span>
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/very_bad_02.gif"}
                    alt="실외활동"
                  />
                  <span>실외활동 자제</span>
                </li>
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/very_bad_03.gif"}
                    alt="환기"
                  />
                  <span>최소한의 환기</span>
                </li>
              </ul>
            </li>
          </ul>
          <div className="air_grade_dir">
            <div className="air_grade_good">
              <div className="air_grade_good_txt">PM₁₀ 0~30(㎍/ m²)</div>
              <img src={process.env.PUBLIC_URL + "/images/triangle_icon.png"} />
            </div>
            <div className="air_grade_normal">
              <div className="air_grade_normal_txt">PM₁₀ 31~80(㎍/ m²)</div>
              <img src={process.env.PUBLIC_URL + "/images/triangle_icon.png"} />
            </div>
            <div className="air_grade_bad">
              <div className="air_grade_bad_txt">PM₁₀ 81~150(㎍/ m²)</div>
              <img src={process.env.PUBLIC_URL + "/images/triangle_icon.png"} />
            </div>
            <div className="air_grade_verybad">
              <div className="air_grade_verybad_txt">PM₁₀ 151(㎍/ m²)이상</div>
              <img src={process.env.PUBLIC_URL + "/images/triangle_icon.png"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirPopup;
