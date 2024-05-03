import ApexChart from "react-apexcharts";
import React from "react";
import { IMsrstnAcctoRltmMesureDnsty } from "../utils/types";
import { ApexOptions } from "apexcharts";

interface IAirDataItem {
  data: IMsrstnAcctoRltmMesureDnsty[];
}

function AirStateCharts({ data }: IAirDataItem) {
  const yAxisLabels = ["좋음", "보통", "나쁨", "매우 나쁨"];

  const gradeMap: { [key: string]: string } = {
    "1": "좋음",
    "2": "보통",
    "3": "나쁨",
    "4": "매우 나쁨",
  };

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
        })),
      },
    ];
  };

  const createOptions = (chartData: any[], dateFormat: string): ApexOptions => {
    return {
      chart: {
        type: "candlestick",
      },
      xaxis: {
        type: "datetime",
        categories: chartData.map((item) => item.x),
        labels: {
          formatter: formatDateTime,
        },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => yAxisLabels[val - 1],
        },
      },
      fill: {
        colors: chartData.map((item: any) => item.color),
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

  const options1: ApexOptions = createOptions(chartData1, "MM-dd HH:mm");
  const options2: ApexOptions = createOptions(chartData2, "MM-dd HH:mm");
  console.log(options1);
  console.log(series1);

  return (
    <div className="card">
      <div className="sub-title">미세먼지 시간별 그래프</div>
      <ApexChart options={options1} series={series1} height={200} />
      <ApexChart options={options2} series={series2} height={200} />
    </div>
  );
}

export default AirStateCharts;
