export default function CorrelationHeatmap({ correlation }) {
    const columns = Object.keys(correlation);

    // Color scale: -1 = red, 0 = white, 1 = blue
    function getColor(value) {
        if (value === null || value === undefined) return "#f0f0f0";
        if (value >= 0) {
            const intensity = Math.round(value * 180);
            return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
        } else {
            const intensity = Math.round(Math.abs(value) * 180);
            return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
        }
    }

    function getTextColor(value) {
        if (value === null) return "#999";
        return Math.abs(value) > 0.6 ? "#fff" : "#333";
    }

    return (
        <div style={{ margin: "2rem 0" }}>
            <h2 style={{ marginBottom: "0.5rem" }}>Correlation Matrix</h2>
            <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
                Blue = positive correlation · Red = negative correlation · White = no correlation
            </p>
            <div style={{ background: "#fff", borderRadius: "12px", padding: "1.5rem", display: "inline-block" }}>
                <table style={{ borderCollapse: "collapse", minWidth: "400px" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "0.5rem 1rem" }}></th>
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        fontWeight: 600,
                                        color: "#4a90e2",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {columns.map((row) => (
                            <tr key={row}>
                                <td
                                    style={{
                                        padding: "0.5rem 1rem",
                                        fontWeight: 600,
                                        color: "#4a90e2",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    {row}
                                </td>
                                {columns.map((col) => {
                                    const value = correlation[row][col];
                                    return (
                                        <td
                                            key={col}
                                            style={{
                                                padding: "0.75rem 1rem",
                                                background: getColor(value),
                                                color: getTextColor(value),
                                                textAlign: "center",
                                                fontWeight: 500,
                                                borderRadius: "4px",
                                                minWidth: "80px",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            {value !== null ? value.toFixed(2) : "—"}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
