import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function BarChart() {
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2", // "light1", "dark1", "dark2"
        title:{
            text: "Group of This year of user"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",		
            startAngle: -90,
            dataPoints: [
                { y: 50, label: "January" },
                { y: 24, label: "Febuary" },
                { y: 40, label: "March" },
                { y: 64, label: "April" },
                { y: 12, label: "May" },
                { y: 10, label: "June" },	
                { y: 10, label: "July" },	
                { y: 10, label: "Augest" },	
                { y: 20, label: "Septmeber" },	
                { y: 10, label: "October" },	
                { y: 10, label: "Novmber" },	
                { y: 17, label: "December" },	
            ]
        }]
    }
    
  return (
   <>
   <CanvasJSChart options = {options} 
				
			/>
   </>
  )
}

export default BarChart