import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export default function ChartPie({style} : any) {
    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
        CategoryScale
    );

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

  return (
    <div className='chart' style={style}>
        <Pie data={chartData}/>
    </div>
  )
}
