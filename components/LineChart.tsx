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
                    responsive: true,
                }}
            />
        </div>
    );
};

export default LineChart;