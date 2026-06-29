import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Chart() {
    const options = {
        theme: 'light2',
        animationEnabled: true,
        title: {
          text: 'Total Property',
        },
        data: [
          {
            type: 'column',
            dataPoints: [
              { x: 10, y: 71 },
              { x: 20, y: 55 },
              { x: 30, y: 50 },
              { x: 40, y: 65 },
              { x: 50, y: 92 },
              { x: 60, y: 68 },
              { x: 70, y: 38 },
              { x: 80, y: 71 },
              { x: 90, y: 54 },
              { x: 100, y: 60 },
            ],
          },
        ],
      };
  return (
    
   <>
     <CanvasJSChart options={options} />
   </>
  )
}

export default Chart