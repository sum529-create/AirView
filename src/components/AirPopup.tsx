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
            <h1 className="sub-title-mo">{itemCode} </h1>
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
          <div className="air_definition">
            <span className="material-symbols-outlined air_state_icon">
              online_prediction
            </span>
            {itemCode === "PM10" || itemCode === "PM25" ? (
              <>
                <span className="air_definition_state">
                  미세먼지(PM10)와 초미세먼지(PM2.5)
                </span>
                <span>
                  는 공기 중에 떠다니는 작은 입자로, 호흡기 질환과 심혈관 질환을
                  유발할 수 있습니다.
                </span>
              </>
            ) : itemCode === "SO2" ? (
              <>
                <span className="air_definition_state">아황산가스(SO2)</span>
                <span>
                  는 화학 반응을 통해 생성되며 호흡기 문제와 눈 건강에 영향을 줄
                  수 있습니다.
                </span>
              </>
            ) : itemCode === "CO" ? (
              <>
                <span className="air_definition_state">일산화탄소(CO)</span>
                <span>
                  는 무색, 무취의 독성 가스로, 호흡 및 순환기계에 침투하여 중독
                  및 생명에 위험을 초래할 수 있습니다.
                </span>
              </>
            ) : itemCode === "O3" ? (
              <>
                <span className="air_definition_state">오존(O3)</span>
                <span>
                  는 대기 중에 산소와 반응하여 생성되는 오존으로, 호흡기를
                  자극하고 폐 기능을 손상시킬 수 있습니다.
                </span>
              </>
            ) : itemCode === "NO2" ? (
              <>
                <span className="air_definition_state">이산화질소(NO2)</span>
                <span>
                  는 대기 중에 일산화질소와 반응하여 생성되는 가스로, 호흡기
                  감염 및 천식 발작을 유발할 수 있습니다.
                </span>
              </>
            ) : (
              ""
            )}
          </div>
          <ul className="pol_standards">
            <li>
              <div>
                <img
                  className="air_grade_img"
                  src={process.env.PUBLIC_URL + "/images/good.gif"}
                  alt="좋음"
                />
              </div>
              <div className="air_grade_info air_good">
                <div className="air_grade_tit">
                  <h2>좋음</h2>
                  <span className="air_grade_state_mo">PM₁₀ 0~30(㎍/ m²)</span>
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
              <div>
                <img
                  className="air_grade_img"
                  src={process.env.PUBLIC_URL + "/images/normal.gif"}
                  alt="보통"
                />
              </div>
              <div className="air_grade_info air_normal">
                <div className="air_grade_tit">
                  <h2>보통</h2>
                  <span className="air_grade_state_mo">PM₁₀ 31~80(㎍/ m²)</span>
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
              <div>
                <img
                  className="air_grade_img"
                  src={process.env.PUBLIC_URL + "/images/bad.gif"}
                  alt="나쁨"
                />
              </div>
              <div className="air_grade_info air_bad">
                <div className="air_grade_tit">
                  <h2>나쁨</h2>
                  <span className="air_grade_state_mo">
                    PM₁₀ 81~150(㎍/ m²)
                  </span>
                </div>
                <div className="air_grade_txt">
                  환자군 및 민감군(어린이, 노약자 등)에게 유해한 영향 유발,
                  일반인도 건강상 불쾌감을 경험할 수 있는 수준
                </div>
              </div>
              <ul className="air_grade_detail">
                {itemCode === "PM10" || itemCode === "PM25" ? (
                  <li>
                    <img
                      src={process.env.PUBLIC_URL + "/images/bad_01.gif"}
                      alt="마스크"
                    />
                    <span>마스크 필수</span>
                  </li>
                ) : (
                  <li>
                    <img
                      src={process.env.PUBLIC_URL + "/images/bad_04.gif"}
                      alt="마스크"
                    />
                    <span>마스크 필요 없음</span>
                  </li>
                )}
                <li>
                  <img
                    src={process.env.PUBLIC_URL + "/images/bad_02.gif"}
                    alt="실외활동"
                  />
                  <span>무리한 실외활동 자제</span>
                </li>
                {itemCode === "PM10" || itemCode === "PM25" ? (
                  <li>
                    <img
                      src={process.env.PUBLIC_URL + "/images/bad_03.gif"}
                      alt="환기"
                    />
                    <span>최소한의 환기</span>
                  </li>
                ) : (
                  <li>
                    <img
                      src={process.env.PUBLIC_URL + "/images/bad_05.gif"}
                      alt="환기"
                    />
                    <span>외출 시 환기 필요</span>
                  </li>
                )}
              </ul>
            </li>
            <li>
              <div>
                <img
                  className="air_grade_img"
                  src={process.env.PUBLIC_URL + "/images/very_bad.gif"}
                  alt="매우나쁨"
                />
              </div>
              <div className="air_grade_info air_verybad">
                <div className="air_grade_tit">
                  <h2>매우나쁨</h2>
                  <span className="air_grade_state_mo">
                    PM₁₀ 151(㎍/ m²)이상
                  </span>
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
              <div className="air_grade_good_txt">
                {itemCode === "PM10"
                  ? "PM₁₀ 0~30(㎍/ m²)"
                  : itemCode === "PM25"
                  ? "PM₂․₅ 0~15(㎍/ m²)"
                  : itemCode === "SO2"
                  ? "0 ~ 30 ppb"
                  : itemCode === "CO"
                  ? "0 ~ 2.0 ppm"
                  : "0 ~ 0.03 ppm"}
              </div>
              <img src={process.env.PUBLIC_URL + "/images/triangle_icon.png"} />
            </div>
            <div className="air_grade_normal">
              <div className="air_grade_normal_txt">
                {itemCode === "PM10"
                  ? "PM₁₀ 31~80(㎍/ m²)"
                  : itemCode === "PM25"
                  ? "PM₂․₅ 16~35(㎍/ m²)"
                  : itemCode === "SO2"
                  ? "31 ~ 100 ppb"
                  : itemCode === "CO"
                  ? "2.1 ~ 9.0 ppm"
                  : itemCode === "O3"
                  ? "0.031 ~ 0.09 ppm"
                  : "0.031 ~ 0.06 ppm"}
              </div>
              <img src={process.env.PUBLIC_URL + "/images/triangle_icon.png"} />
            </div>
            <div className="air_grade_bad">
              <div className="air_grade_bad_txt">
                {itemCode === "PM10"
                  ? "PM₁₀ 81~150(㎍/ m²)"
                  : itemCode === "PM25"
                  ? "PM₂․₅ 36~75(㎍/ m²)"
                  : itemCode === "SO2"
                  ? "101 ~ 200 ppb"
                  : itemCode === "CO"
                  ? "9,1 ~ 15.0 ppm"
                  : itemCode === "O3"
                  ? "0.091 ~ 0.15 ppm"
                  : "0.061 ~ 0.2 ppm"}
              </div>
              <img src={process.env.PUBLIC_URL + "/images/triangle_icon.png"} />
            </div>
            <div className="air_grade_verybad">
              <div className="air_grade_verybad_txt">
                {itemCode === "PM10"
                  ? "PM₁₀ 151(㎍/ m²)이상"
                  : itemCode === "PM25"
                  ? "PM₂․₅ 76(㎍/ m²)이상"
                  : itemCode === "SO2"
                  ? "201 ppb 이상"
                  : itemCode === "CO"
                  ? "15.1 ppm 이상"
                  : itemCode === "O3"
                  ? "0.151 ppm 이상"
                  : "0.201 ppm 이상"}
              </div>
              <img src={process.env.PUBLIC_URL + "/images/triangle_icon.png"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirPopup;
