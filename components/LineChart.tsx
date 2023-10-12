"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

const LineChart = ({
    labels, datasets,
}: {
    labels: string[];
    datasets: number[];
}) => {
    return (
        <div>
            <Line
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: datasets,
                            backgroundColor: "purple",
                        },
                    ],
                }}
            />
        </div>
    );
};

export default LineChart;