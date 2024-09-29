import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import './doughnut-chart.css';

interface DoughnutChartProps {
    dataset: number[];
    labels: string[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ dataset, labels }) => {
    const [chartData, setChartData] = useState<any>({});
    const [chartOptions, setChartOptions] = useState<any>({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: labels,
            datasets: [
                {
                    data: dataset,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--gray-500'), 
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'), 
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--pink-500'), 
                        documentStyle.getPropertyValue('--purple-500'),

                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--gray-400'), 
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-400'), 
                        documentStyle.getPropertyValue('--orange-400'), 
                        documentStyle.getPropertyValue('--pink-400'), 
                        documentStyle.getPropertyValue('--purple-400'),
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
        setChartOptions(options);
    }, [dataset, labels]);

    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}

export default DoughnutChart;
