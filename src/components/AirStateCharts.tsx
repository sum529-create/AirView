import ApexChart from "react-apexcharts";
import React from "react";
import { IMsrstnAcctoRltmMesureDnsty } from "../utils/types";
import { ApexOptions } from "apexcharts";

interface IAirDataItem {
  data: IMsrstnAcctoRltmMesureDnsty[];
}

function AirStateCharts({ data }: IAirDataItem) {
  const yAxisLabels = ["좋음", "보통", "나쁨", "매우 나쁨"];

  const gradeColorMap: { [key: string]: string } = {
    "1": "#1f77b4",
    "2": "#2ca02c",
    "3": "#ff7f0e",
    "4": "#d62728",
  };

  const formatDateTime = (value: string) => {
    const date = new Date(value);
    const options = {
      month: "2-digit" as const,
      day: "2-digit" as const,
      hour: "2-digit" as const,
      minute: "2-digit" as const,
      hour12: false,
      timeZone: "Asia/Seoul",
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  const createChartData = (
    data: IMsrstnAcctoRltmMesureDnsty[],
    gradeKey: string
  ) => {
    return data.map((item: any) => ({
      x: item.dataTime,
      y: parseInt(item[gradeKey]),
      color: gradeColorMap[item[gradeKey]],
    }));
  };

  const createSeries = (chartData: any[]) => {
    return [
      {
        data: chartData.map((item) => ({
          x: item.x,
          y: item.y,
          color: item.color,
        })),
      },
    ];
  };

  const createOptions = (
    chartData: any[],
    dateFormat: string,
    airState: string,
  ): ApexOptions => {
    
    return {
      chart: {
        type: "bar",
      },
      xaxis: {
        type: "datetime",
        categories: chartData.map((item) => item.x),
        labels: {
          formatter: formatDateTime,
        },
      },
      yaxis: {
        title: {
          text: airState === "pm10" ? "미세먼지( pm10 )" : "초미세먼지( pm2.5 )",
        },
        labels: {
          formatter: (val: number) => yAxisLabels[val - 1], // Y 축 레이블 설정
        },
        min:1,
        max:4,
      },
      fill: {
        colors: chartData.map((item: any) => item.color), // 각 레이블에 대한 색상 지정
      },
      tooltip: {
        x: {
          format: dateFormat,
        },
      },
    };
  };
  

  const chartData1 = createChartData(data, "pm10Grade");
  const chartData2 = createChartData(data, "pm25Grade");

  const series1 = createSeries(chartData1);
  const series2 = createSeries(chartData2);

  const options1: ApexOptions = createOptions(chartData1, "MM-dd HH:mm", "pm10");
  const options2: ApexOptions = createOptions(chartData2, "MM-dd HH:mm", "pm25");

  return (
    <div className="card">
      <div className="sub-title">미세먼지 시간별 그래프</div>
      <div style={{paddingLeft:40}}>
        <ApexChart options={options1} series={series1} type="bar" height={200} />
        <ApexChart options={options2} series={series2} type="bar" height={200} />
      </div>
    </div>
  );
}

export default AirStateCharts;
