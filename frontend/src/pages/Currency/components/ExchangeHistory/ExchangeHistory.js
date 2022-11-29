import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' ,
        },
        title: {
            display: true,
            text: 'Exchange Rate History',
        },
    },
};



const ExchangeHistory = ({ exchange }) => {
    const dataChronological = [...exchange]?.reverse();
    const labels = dataChronological?.map(item => item.updatedAt);
    const data = {
        labels,
        datasets: [{
            label: `${exchange[0].from} -> ${exchange[0].to}`,
            data: dataChronological?.map(item => item.rate),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },],
    };

return (<>
        <Line options={options} data={data} />
    </>)
}

export default ExchangeHistory