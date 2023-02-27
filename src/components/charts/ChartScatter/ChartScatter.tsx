// import { Chart as ChartJS, Legend} from 'chart.js';
// import { ScatterController, LinearScale, PointElement, Tooltip } from 'chart.js';
// import { Scatter } from 'react-chartjs-2';

// export default function ChartScatter() {

//     ChartJS.register(ScatterController, LinearScale, PointElement, Tooltip);

//     const chartData = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
//         datasets: [
//           {
//             label: 'My First Dataset',
//             data: [65, 59, 80, 81, 56, 55, 40, 10],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             backgroundColor: 'rgb(40, 50, 100)',
//             borderWidth: 7
//           }
//         ]
//     };
//   return (
//     <div>
//         <Scatter data={chartData}/>
//     </div>
//   )
// }

import React from 'react';
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
  return (
    <div>
        <Scatter data={data}/>
    </div>
  )
}

