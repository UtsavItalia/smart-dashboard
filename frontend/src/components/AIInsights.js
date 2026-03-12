export default function AIInsights({ insights }) {
    return (
        <div className="card" style={{
            margin: "2rem 0",
            borderLeft: "4px solid #4a90e2",
        }}>
            <h2 style={{ marginBottom: "1rem" }}>AI Insights</h2>
            <div style={{ lineHeight: "1.8", color: "#333", whiteSpace: "pre-wrap", fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
                {insights}
            </div>
        </div>
    );
}
