import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PredictedPriceChart = ({ predictedPrice, actualPrice, showChart }) => {

    const data = {
        labels: ['Pricing'], // Only one label for the x-axis: "Pricing"
        datasets: [
            {
                label: 'Predicted Price', // Keep dataset for Predicted Price
                data: [predictedPrice], // Populating the predicted price
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for the predicted price bar
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Actual Price', // Keep dataset for Actual Price
                data: [actualPrice], // Populating the actual price
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color for the actual price bar
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

const options = {
    maintainAspectRatio: false, // Allow the chart to take the full height of the container

        scales: {
            x: {
                type: 'category',
                labels: ['Pricing'], // Only one label for the x-axis: "Pricing"
                offset: true,
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ height: '100%' }}> {/* Set the div to take full height */}

            <h2>Price Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default PredictedPriceChart;
