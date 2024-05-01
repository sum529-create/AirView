import ApexChart from "react-apexcharts";
import React from 'react';
import { IMsrstnAcctoRltmMesureDnsty } from "../utils/types";
import { ApexOptions } from 'apexcharts';

interface IAirDataItem {
    data: IMsrstnAcctoRltmMesureDnsty[];
}

function AirStateCharts({ data }: IAirDataItem) {
    // pm10Grade 값에 따른 텍스트 매핑
    const gradeMap: { [key: string]: string } = {
        '1': '좋음',
        '2': '보통',
        '3': '나쁨',
        '4': '매우 나쁨',
    };
    const yAxisLabels = ['좋음', '보통', '나쁨', '매우 나쁨'];

    // ApexCharts에 필요한 데이터 형식으로 변환
    const chartData1 = data.map(item => ({
        x: item.dataTime,
        y: gradeMap[item.pm10Grade],
    }));
    const chartData2 = data.map(item => ({
        x: item.dataTime,
        y: gradeMap[item.pm10Grade],
    }));

    // 그래프 옵션 설정
    const options1: ApexOptions = {
        chart: {
            type: 'bar',
            height: 200,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: 'datetime',
            categories: chartData1.map(item => item.x),
        },
        yaxis: {
            labels: {
                formatter: function (val: number) {
                    return yAxisLabels[val - 1];
                },
            },
        },
        fill: {
            colors: ['#1f77b4'],
        },
        tooltip: {
            x: {
                format: 'yyyy-MM-dd HH:mm',
            },
        },
    };
    const options2: ApexOptions = {
        chart: {
            type: 'bar',
            height: 200,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: 'datetime',
            categories: chartData2.map(item => item.x),
        },
        yaxis: {
            labels: {
                formatter: function (val: number) {
                    return yAxisLabels[val - 1];
                },
            },
        },
        fill: {
            colors: ['#1f77b4'],
        },
        tooltip: {
            x: {
                format: 'yyyy-MM-dd HH:mm',
            },
        },
    };

    return (
        <div className='card'>
            <div className="sub-title">미세먼지 시간별 그래프</div>
            <ApexChart options={options1} series={[{ data: data?.map((e) => parseFloat(e.pm10Grade)) ?? [] }]} height={200} />
            <ApexChart options={options2} series={[{ data: data?.map((e) => parseFloat(e.pm25Grade)) ?? [] }]} height={200} />
        </div>
    )
}

export default AirStateCharts;
