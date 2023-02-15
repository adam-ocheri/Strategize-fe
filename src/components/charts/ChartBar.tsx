import { Chart as ChartJS, LinearScale, ArcElement, Tooltip, Legend, FillTarget, BarElement, LineElement, PointElement, ActiveElement, LegendElement, CategoryScale } from "chart.js";
import { Doughnut, Bar, Chart, Line, Pie, PolarArea, Radar, Scatter } from "react-chartjs-2";

import React from 'react'

export default function ChartBar() {

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
  
  const chartOptions : any = {
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
  return (
    <div>
        <div /*style={{border: 'solid black 5px'}}*/>
            <Bar data={chartData}  />
        </div>
    </div>
  )
}
