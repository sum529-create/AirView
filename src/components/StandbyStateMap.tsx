import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "../styles/ImageSlider.css";

const StandbyStateMap: React.FC<{ images: any; state: string }> = ({
  images,
  state,
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isAirMapPlay, setIsAirMapPlay] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const isTimeoutActive = useRef(false);
  const preloadedImages = useRef<HTMLImageElement[]>([]);
  const [tickMarks, setTickMarks] = useState(["9", "15", "21"]);

  useEffect(() => {
    // 이미지 사전로딩
    preloadedImages.current = images.map((imageUrl: any) => {
      const img = new Image();
      img.src = imageUrl;
      return img;
    });

    // 현재 시간을 확인하여 오전 또는 오후에 따라 tick-mark-point를 설정
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 22 || hour < 9) {
      setTickMarks(["12", "03", "09"]); // 22~09시
    } else if (hour >= 9 && hour < 12) {
      setTickMarks(["9", "15", "21"]); // 09~12시
    } else if (hour >= 12 && hour < 18) {
      setTickMarks(["12", "18", "00"]); // 12~18시
    } else {
      setTickMarks(["06", "12", "18"]); // 18~22시
    }
  }, [images]);
  const handleChange = (e: ChangeEvent<HTMLInputElement> | string) => {
    let value = 0;
    if (typeof e !== "string") value = parseFloat(e.target.value);
    else {
      if (e === "1") {
        setIsAirMapPlay(false);
        clearTimeouts();
      } else {
        setIsAirMapPlay(true);
      }
      value = parseFloat(e);
    }

    const newIdx = Math.floor((value / 100) * (images.length - 1));

    setCurrentImgIdx(newIdx);
  };

  const playAirMap = () => {
    clearTimeouts();
    handleChange("1");
    timeoutRefs.current.push(
      setTimeout(() => {
        handleChange("50");
        timeoutRefs.current.push(
          setTimeout(() => {
            handleChange("100");
            timeoutRefs.current.push(
              setTimeout(() => {
                handleChange("1");
              }, 1000)
            );
          }, 1000)
        );
      }, 1000)
    );
    isTimeoutActive.current = true;
  };
  const stopAirMap = () => {
    setIsAirMapPlay(false);
    isTimeoutActive.current = false;
    clearTimeouts();
  };
  const clearTimeouts = () => {
    timeoutRefs.current.forEach((timeout) => {
      clearTimeout(timeout);
    });
    timeoutRefs.current = [];
  };

  return (
    <div className="image-slider">
      <img src={images[currentImgIdx]} alt={`Image ${currentImgIdx + 1}`} />
      <div className="play_range">
        {isAirMapPlay ? (
          <button onClick={stopAirMap} className="air-map-play-btn">
            <span className="material-symbols-outlined play_arrow">
              stop_circle
            </span>
          </button>
        ) : (
          <button onClick={playAirMap} className="air-map-play-btn">
            <span className="material-symbols-outlined play_arrow">
              play_circle
            </span>
          </button>
        )}
        <input
          type="range"
          min="0"
          max="100"
          value={(currentImgIdx / (images.length - 1)) * 100}
          onChange={handleChange}
        />
        <div className="tick-marks">
          {tickMarks.map((mark, index) => (
            <div key={index} className="tick-mark-point">
              <span>{mark}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StandbyStateMap;
