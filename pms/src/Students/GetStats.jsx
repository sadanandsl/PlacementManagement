import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const GetStats = () => {
  const chartRef = useRef(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/stats');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data);
        setStats(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        // You may want to set an error state here for a better user experience
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once on mount

  useEffect(() => {
    if (!stats || !chartRef.current) {
      return;
    }

    const canvas = chartRef.current;
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Failed to create chart: cannot acquire context from the given item');
      return;
    }

    // Move chartOptions and chartData above the chart instantiation
    const chartOptions = {
      scales: {
        x: {
          type: 'category',
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Your Y-Axis Label',
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    };

    const chartData = {
      labels: stats.map((stat) => stat.label),
      datasets: [
        {
          label: 'Your Dataset Label',
          data: stats.map((stat) => stat.value),
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    // Destroy existing chart if it exists
    if (chartRef.current.chart) {
      console.log('Destroying existing chart...');
      chartRef.current.chart.destroy();
    }

    // Create a new chart
    console.log('Creating new chart...');
    chartRef.current.chart = new Chart(context, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    // Ensure chart is destroyed on component re-render
    return () => {
      console.log('Cleaning up chart...');
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, [stats]);

  if (!stats) {
    return (
      <div>
        {/* You may want to use a spinner here */}
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div>
      <canvas ref={chartRef} width="400" height="300" />
    </div>
  );
};

export default GetStats;
