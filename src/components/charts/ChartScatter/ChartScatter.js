import { jsx as _jsx } from "react/jsx-runtime";
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip } from 'chart.js';
export default function ChartScatter() {
    ChartJS.register(LinearScale, PointElement, Tooltip);
    const data = {
        datasets: [
            {
                label: 'Scatter Dataset',
                data: [
                    { x: 0, y: 0 },
                    { x: 300, y: 100 },
                    { x: 455, y: 167 },
                    { x: 562, y: 201 },
                    { x: 599, y: 332 },
                    { x: 794, y: 504 },
                ],
                showLine: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };
    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
            },
            y: {
                type: 'linear',
                position: 'left',
            },
        },
    };
    return (_jsx("div", { children: _jsx(Scatter, { data: data }) }));
}
