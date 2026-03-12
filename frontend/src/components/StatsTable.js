export default function StatsTable({ stats }) {
    const columns = Object.keys(stats);          // ["age", "salary", "experience", "score"]
    const metrics = ["count", "mean", "std", "min", "25%", "50%", "75%", "max"];

    return (
        <div style={{ margin: "2rem 0" }}>
            <h2 style={{ marginBottom: "1rem" }}>Summary Statistics</h2>
            <div className="card scroll-x">
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "400px" }}>
                    <thead>
                        <tr style={{ background: "#4a90e2", color: "#fff" }}>
                            <th style={thStyle}>Metric</th>
                            {columns.map(col => (
                                <th key={col} style={thStyle}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {metrics.map((metric, i) => (
                            <tr key={metric} style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                                <td style={{ ...tdStyle, fontWeight: 600, color: "#4a90e2" }}>{metric}</td>
                                {columns.map(col => (
                                    <td key={col} style={tdStyle}>
                                        {stats[col][metric]?.toLocaleString() ?? "—"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const thStyle = {
    padding: "0.75rem 1rem",
    textAlign: "left",
    fontWeight: 600,
};

const tdStyle = {
    padding: "0.65rem 1rem",
    borderBottom: "1px solid #eee",
};
