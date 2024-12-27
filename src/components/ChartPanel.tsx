"use client";

import React, { useRef } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    BarElement,
    LineElement,
    PointElement,
    RadarController,
    ScatterController,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Line, Radar, Scatter, Pie, Bubble } from "react-chartjs-2";
import chartData from "../../public/assets/data.json";
import { FiDownload } from "react-icons/fi";

// Register chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    BarElement,
    LineElement,
    PointElement,
    RadarController,
    ScatterController,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function ChartPanel() {
    const chartRefs = useRef<(ChartJS | null)[]>([]);

    // Function to handle chart download
    const handleDownload = (index: number) => {
        try {
            const chart = chartRefs.current[index];
            if (!chart) {
                console.error('Chart reference not found');
                return;
            }

            // Get the canvas element
            const canvas = chart.canvas;
            if (!canvas) {
                console.error('Canvas element not found');
                return;
            }

            // Set background color to white
            const context = canvas.getContext('2d');
            if (context) {
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const backgroundColor = window.getComputedStyle(canvas).backgroundColor;

                // Create a temporary canvas to draw with background
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                const tempContext = tempCanvas.getContext('2d');

                if (tempContext) {
                    // Fill background
                    tempContext.fillStyle = backgroundColor || 'white';
                    tempContext.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw original image
                    tempContext.putImageData(imageData, 0, 0);

                    // Convert to blob
                    tempCanvas.toBlob((blob) => {
                        if (!blob) {
                            console.error('Failed to create blob');
                            return;
                        }

                        // Create download link
                        const url = URL.createObjectURL(blob);
                        const downloadLink = document.createElement('a');
                        downloadLink.href = url;
                        downloadLink.download = `${charts[index].title.toLowerCase().replace(/\s+/g, '-')}.png`;

                        // Trigger download
                        document.body.appendChild(downloadLink);
                        downloadLink.click();

                        // Cleanup
                        document.body.removeChild(downloadLink);
                        URL.revokeObjectURL(url);
                    }, 'image/png', 1.0);
                }
            }
        } catch (error) {
            console.error('Error downloading chart:', error);
        }
    };

    const horizontalBarOptions = {
        responsive: true,
        indexAxis: "y",
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Horizontal Bar Chart" },
        },
    };

    const stackedBarOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Stacked Bar Chart" },
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true },
        },
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Line Chart" },
        },
        elements: {
            line: { tension: 0.4 },
        },
    };

    const charts = [
        { type: Bar, data: chartData.barData as any, options: {}, title: "Vertical Bar Chart" },
        { type: Line, data: chartData.multiLineChart as any, options: lineChartOptions, title: "Line Chart" },
        { type: Radar, data: chartData.radarData as any, options: {}, title: "Radar Chart" },
        { type: Scatter, data: chartData.scatterData as any, options: {}, title: "Scatter Chart" },
        { type: Pie, data: chartData.pieData as any, options: {}, title: "Pie Chart" },
        { type: Bar, data: chartData.horizontalBarData as any, options: horizontalBarOptions, title: "Horizontal Bar Chart" },
        { type: Bubble, data: chartData.bubbleData as any, options: {}, title: "Bubble Chart" },
        { type: Bar, data: chartData.barData as any, options: stackedBarOptions, title: "Stacked Bar Chart" },
    ];

    return (
        <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
                {charts.map((chart, index) => (
                    <div key={index} className="bg-white shadow-lg p-4 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3>{chart.title}</h3>
                            <button
                                className="flex items-center text-gray-500 hover:text-gray-700"
                            // onClick={() => handleDownload(index)}
                            >
                                <FiDownload />
                            </button>
                        </div>
                        <chart.type
                            data={chart.data}
                            //@ts-ignore
                            options={chart.options}
                            ref={(el: any) => (chartRefs.current[index] = el?.chartInstance || el?.chart || null)}
                        />
                    </div>
                ))}
            </div>


            {/* Combined Table for Chart Data */}
            <div className="mt-10">
                <h3 className="text-lg font-bold mb-4">Data Table</h3>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Chart Type</th>
                            <th className="border border-gray-300 px-4 py-2">Labels</th>
                            <th className="border border-gray-300 px-4 py-2">Dataset 1</th>
                            <th className="border border-gray-300 px-4 py-2">Dataset 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Vertical Bar Chart */}
                        <tr>
                            <td className="border px-4 py-2">Vertical Bar Chart</td>
                            <td className="border px-4 py-2">{chartData.barData.labels.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.barData.datasets[0].data.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.barData.datasets[1].data.join(", ")}</td>
                        </tr>

                        {/* Multi Line Chart*/}
                        <tr>
                            <td className="border px-4 py-2">Multi Line Chart</td>
                            <td className="border px-4 py-2">{chartData.multiLineChart.labels.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.multiLineChart.datasets[0].data.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.multiLineChart.datasets[1].data.join(", ")}</td>
                        </tr>

                        {/* Radar Chart */}
                        <tr>
                            <td className="border px-4 py-2">Radar Chart</td>
                            <td className="border px-4 py-2">{chartData.radarData.labels.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.radarData.datasets[0].data.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.radarData.datasets[1].data.join(", ")}</td>
                        </tr>

                        {/* Pie Chart */}
                        <tr>
                            <td className="border px-4 py-2">Pie Chart</td>
                            <td className="border px-4 py-2">{chartData.pieData.labels.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.pieData.datasets[0].data.join(", ")}</td>
                            <td className="border px-4 py-2">-</td>
                        </tr>

                        {/* Scatter Chart */}
                        <tr>
                            <td className="border px-4 py-2">Scatter Chart</td>
                            <td className="border px-4 py-2">X: 1-5</td>
                            <td className="border px-4 py-2">
                                {chartData.scatterData.datasets[0].data
                                    .map((point) => `(${point.x}, ${point.y})`)
                                    .join(", ")}
                            </td>
                            <td className="border px-4 py-2">
                                {chartData.scatterData.datasets[1].data
                                    .map((point) => `(${point.x}, ${point.y})`)
                                    .join(", ")}
                            </td>
                        </tr>

                        {/* Horizontal Bar Chart */}
                        <tr>
                            <td className="border px-4 py-2">Horizontal Bar Chart</td>
                            <td className="border px-4 py-2">{chartData.horizontalBarData.labels.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.horizontalBarData.datasets[0].data.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.horizontalBarData.datasets[1].data.join(", ")}</td>
                        </tr>

                        {/* Bubble Chart */}
                        <tr>
                            <td className="border px-4 py-2">Bubble Chart</td>
                            <td className="border px-4 py-2">X/Y/R Data</td>
                            <td className="border px-4 py-2">
                                {chartData.bubbleData.datasets[0].data
                                    .map((bubble) => `(${bubble.x}, ${bubble.y}, r:${bubble.r})`)
                                    .join(", ")}
                            </td>
                            <td className="border px-4 py-2">-</td>
                        </tr>

                        {/* Area Chart */}
                        <tr>
                            <td className="border px-4 py-2">Area Chart</td>
                            <td className="border px-4 py-2">{chartData.multiLineChart.labels.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.multiLineChart.datasets[0].data.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.multiLineChart.datasets[1].data.join(", ")}</td>
                        </tr>

                        {/* Stacked Bar Chart */}
                        <tr>
                            <td className="border px-4 py-2">Stacked Bar Chart</td>
                            <td className="border px-4 py-2">{chartData.barData.labels.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.barData.datasets[0].data.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.barData.datasets[1].data.join(", ")}</td>
                        </tr>

                        {/* Line Chart */}
                        <tr>
                            <td className="border px-4 py-2">Line Chart</td>
                            <td className="border px-4 py-2">{chartData.multiLineChart.labels.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.multiLineChart.datasets[0].data.join(", ")}</td>
                            <td className="border px-4 py-2">{chartData.multiLineChart.datasets[1].data.join(", ")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >

    );
}