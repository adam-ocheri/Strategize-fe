import { jsx as _jsx } from "react/jsx-runtime";
import { Chart as ChartJS, LinearScale, Tooltip, Legend, BarElement, CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
export default function ChartBar({ style }) {
    ChartJS.register(LinearScale, BarElement, Tooltip, Legend, CategoryScale);
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40, 10],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(40, 50, 100)',
                borderWidth: 3
            }
        ]
    };
    const chartOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };
    return (_jsx("div", { children: _jsx("div", { style: style, className: "bar-chart chart", children: _jsx(Bar, { data: chartData }) }) }));
}
