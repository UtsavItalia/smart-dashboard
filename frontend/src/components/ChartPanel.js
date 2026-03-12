import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartPanel({ stats }) {
    const columns = Object.keys(stats);

    const charts = columns.map((col) => {
        const data = {
            labels: ["Min", "Mean", "Median (50%)", "Max"],
            datasets: [
                {
                    label: col,
                    data: [
                        stats[col]["min"],
                        stats[col]["mean"],
                        stats[col]["50%"],
                        stats[col]["max"],
                    ],
                    backgroundColor: [
                        "rgba(74, 144, 226, 0.6)",
                        "rgba(80, 200, 120, 0.6)",
                        "rgba(255, 193, 7, 0.6)",
                        "rgba(231, 76, 60, 0.6)",
                    ],
                    borderColor: [
                        "rgba(74, 144, 226, 1)",
                        "rgba(80, 200, 120, 1)",
                        "rgba(255, 193, 7, 1)",
                        "rgba(231, 76, 60, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: col.toUpperCase(),
                    font: { size: 14, weight: "bold" },
                },
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: (value) => value.toLocaleString(),
                    },
                },
            },
        };

        return { data, options, col };
    });

    return (
        <div style={{ margin: "2rem 0" }}>
            <h2 style={{ marginBottom: "1rem" }}>Column Charts</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
                    gap: "1.5rem",
                }}
            >
                {charts.map(({ data, options, col }) => (
                    <div
                        key={col}
                        style={{
                            background: "#fff",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        }}
                    >
                        <Bar data={data} options={options} />
                    </div>
                ))}
            </div>
        </div>
    );
}
