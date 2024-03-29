import React, { ChangeEvent, useRef, useState } from "react";
import "../styles/ImageSlider.css";

const StandbyStateMap: React.FC<{ images: any; state: string }> = ({
  images,
  state,
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isAirMapPlay, setIsAirMapPlay] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const isTimeoutActive = useRef(false);

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
          <div className="tick-mark-point">
            <span>12</span>
          </div>
          <div className="tick-mark-point">
            <span>18</span>
          </div>
          <div className="tick-mark-point">
            <span>00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandbyStateMap;
