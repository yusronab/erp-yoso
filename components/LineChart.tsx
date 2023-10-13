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
    labels: string[]; datasets: any[];
}) => {
    const dataWillDisplay = datasets.map(item => ({
        label: item.label,
        data: item.data,
        fill: "start",
        backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, "rgba(250,174,50,1)");
            gradient.addColorStop(1, "rgba(250,174,50,0)");
            return gradient;
        },
        borderColor: "rgba(75,192,192,1)"
    }))

    return (
        <div className="my-5">
            <Line
                data={{
                    labels: labels,
                    datasets: dataWillDisplay,
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