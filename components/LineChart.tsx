"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    Filler,
    Legend,
    ScriptableContext,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
    Legend,
);

const LineChart = ({
    labels, datasets,
}: {
    labels: string[];
    datasets: any[];
}) => {
    return (
        <div className="my-5">
            <Line
                data={{
                    labels: labels,
                    datasets: datasets,
                }}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    elements: {
                        line: {
                            borderJoinStyle: 'round',
                            tension: 0.35,
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: true
                            }
                        }
                    },
                    plugins: {
                        filler: {
                            propagate: false
                        },
                        title: {
                            display: true,
                            align: 'start',
                            text: 'Statistik',
                            position: 'top',
                        },
                        legend: {
                            align: 'end',
                        }
                    },
                    interaction: {
                        intersect: true
                    }
                }}
            />
        </div>
    );
};

export default LineChart;