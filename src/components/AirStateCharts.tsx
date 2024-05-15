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
          fillColor: item.color,
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
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
              width: '100%' // 모바일 화면에 대한 차트 너비 설정
            }
        }
      }],
      xaxis: {
        type: "datetime",
        categories: chartData.map((item) => item.x),
        labels: {
          formatter: formatDateTime,
        },
      },
      yaxis: {
        title: {
          text: airState === "pm10"
            ? "미세먼지( pm10 )"
            : airState === "pm25"
              ? "초미세먼지( pm2.5 )"
              : airState === "o3"
                ? "오존( O₃ )"
                : airState === "so2"
                  ? "아황산가스( SO₂ )"
                  : airState === "co"
                    ? "일산화탄소( CO )"
                    : airState === "no2"
                      ? "이산화질소( NO₂ )"
                      : '-'
            ,
        },
        labels: {
          formatter: (val: number) => yAxisLabels[val - 1], // Y 축 레이블 설정
        },
        min:0,
        max:4,
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
  const chartData3 = createChartData(data, "o3Grade");
  const chartData4 = createChartData(data, "so2Grade");
  const chartData5 = createChartData(data, "coGrade");
  const chartData6 = createChartData(data, "no2Grade");

  const series1 = createSeries(chartData1);
  const series2 = createSeries(chartData2);
  const series3 = createSeries(chartData3);
  const series4 = createSeries(chartData4);
  const series5 = createSeries(chartData5);
  const series6 = createSeries(chartData6);

  const options1: ApexOptions = createOptions(chartData1, "MM-dd HH:mm", "pm10");
  const options2: ApexOptions = createOptions(chartData2, "MM-dd HH:mm", "pm25");
  const options3: ApexOptions = createOptions(chartData3, "MM-dd HH:mm", "o3");
  const options4: ApexOptions = createOptions(chartData4, "MM-dd HH:mm", "so2");
  const options5: ApexOptions = createOptions(chartData5, "MM-dd HH:mm", "co");
  const options6: ApexOptions = createOptions(chartData6, "MM-dd HH:mm", "no2");

  return (
    <>
      <div className="card">
        <div className="sub-title">미세먼지 시간별 그래프</div>
        <div style={{paddingLeft:40, width:'100%'}}>
          <ApexChart options={options1} series={series1} type="bar" height={300} />
          <ApexChart options={options2} series={series2} type="bar" height={300} />
        </div>
      </div>
      <div className="card">
        <div className="sub-title">대기상태 시간별 그래프</div>
        <div style={{paddingLeft:40, width:'100%'}}>
          <ApexChart options={options3} series={series3} type="bar" height={200} />
          <ApexChart options={options4} series={series4} type="bar" height={200} />
          <ApexChart options={options5} series={series5} type="bar" height={200} />
          <ApexChart options={options6} series={series6} type="bar" height={200} />
        </div>
      </div>
    </>
  );
}

export default AirStateCharts;
