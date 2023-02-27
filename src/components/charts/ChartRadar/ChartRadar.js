import { jsx as _jsx } from "react/jsx-runtime";
import { Chart as ChartJS, RadarController, RadialLinearScale, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(RadarController, RadialLinearScale, PointElement, LinearScale, CategoryScale);
const chartData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'My First Dataset',
            data: [65, 59, 90, 81, 56, 55, 40],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
            label: 'My Second Dataset',
            data: [28, 48, 40, 19, 96, 27, 100],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
};
const chartOptions = {
    scales: {
        r: {
            angleLines: {
                display: false,
            },
            suggestedMin: 0,
            suggestedMax: 100,
        },
    },
};
export default function ChartRadar() {
    return (_jsx("div", { children: _jsx(Radar, { data: chartData, options: chartOptions }) }));
}
