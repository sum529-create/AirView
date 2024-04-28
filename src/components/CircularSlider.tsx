import React from 'react';

interface ICircularSlider {
    type: string,
    grade: string,
    value: number,
    maxValue: number,
    isMobileSize: boolean,
}
function CircularSlider({ type, grade, value, maxValue, isMobileSize }: ICircularSlider) {
    

    
    // 중심 좌표 계산
    const center = (type === "pm10" || type === "pm25") && !isMobileSize ? 60 : 35;
    // 반지름 계산
    const radius = (type === "pm10" || type === "pm25") && !isMobileSize ? 48 : 28;
  
    // 값에 따라 원의 위치를 계산
    const cx = center + radius * Math.cos(((value * Math.PI * 2) / maxValue) - Math.PI / 2);
    const cy = center + radius * Math.sin(((value * Math.PI * 2) / maxValue) - Math.PI / 2);

    const colorType = grade === "1" ? '#00a8ff' : grade === "2" ? '#4caf50' : grade === "3" ? '#fbc531' : '#e84118';
  
    return (
      <svg width={(type === "pm10" || type === "pm25") && !isMobileSize ? 120 : 70} height={(type === "pm10" || type === "pm25") && !isMobileSize ? 120 : 70} style={{position:'absolute'}}>
        {/* 원 그리기 */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#d3d3d3" strokeWidth="10" />
        {/* range 그리기 */}
        <circle cx={-center} cy={center} r={radius} fill="none" stroke={colorType} strokeWidth="10"
          strokeDasharray={`${(value / maxValue) * (2 * Math.PI * radius)} ${(2 * Math.PI * radius) - ((value / maxValue) * (2 * Math.PI * radius))}`}
          style={{ transform: 'rotate(-90deg)' }} />
        {/* 채워진 원 그리기 */}
        <circle cx={cx} cy={cy} r="5" fill={colorType} stroke="#fff" strokeWidth="2" />
      </svg>
    );
  }

export default CircularSlider;
