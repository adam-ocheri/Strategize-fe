import { jsx as _jsx } from "react/jsx-runtime";
import { Chart as ChartJS } from 'chart.js';
import { PolarAreaController, ArcElement, RadialLinearScale, PointElement, Tooltip } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
export default function ChartPolarArea() {
    ChartJS.register(PolarAreaController, ArcElement, RadialLinearScale, PointElement, Tooltip);
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40, 10],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(40, 50, 100)',
                borderWidth: 7
            }
        ]
    };
    return (_jsx("div", { children: _jsx(PolarArea, { data: chartData }) }));
}
