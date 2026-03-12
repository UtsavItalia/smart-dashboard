import { useState } from "react";
import { uploadCSV, getStats, getCorrelation, getInsights } from "./services/api";
import FileUpload from "./components/FileUpload";
import StatsTable from "./components/StatsTable";
import AIInsights from "./components/AIInsights";
import ChartPanel from "./components/ChartPanel";
import CorrelationHeatmap from "./components/CorrelationHeatmap";

export default function App() {
  const [filename, setFilename] = useState(null);
  const [preview, setPreview] = useState(null);
  const [stats, setStats] = useState(null);
  const [correlation, setCorrelation] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);

  async function handleUpload(file) {
    try {
      setError(null);
      setLoading("Uploading...");
      const result = await uploadCSV(file);
      console.log(result.filename)
      setFilename(result.filename);
      setPreview(result.data);

      setLoading("Computing statistics...");
      const statsResult = await getStats(result.filename);
      setStats(statsResult.stats);

      setLoading("Computing correlations...");
      const corrResult = await getCorrelation(result.filename);
      setCorrelation(corrResult.correlation);

      setLoading("Generating AI insights...");
      const insightsResult = await getInsights(result.filename);
      setInsights(insightsResult.insights);

      setLoading("");
    } catch (err) {
      setError(err.message);
      setLoading("");
    }
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: "0.5rem" }}>Smart Data Dashboard</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Upload a CSV to get instant statistics, correlations, and AI insights
      </p>

      <FileUpload onUpload={handleUpload} />

      {loading && (
        <div style={{ margin: "1rem 0", color: "#4a90e2", fontWeight: 500 }}>
          {loading}
        </div>
      )}

      {error && (
        <div style={{ margin: "1rem 0", color: "#e74c3c", fontWeight: 500 }}>{error}
        </div>
      )}

      {preview && (
        <div style={{ margin: "1.5rem 0" }}>
          <h2>{filename}</h2>
          <p style={{ color: "#666" }}>
            {preview.rows} rows x {preview.columns} columns
          </p>
        </div>
      )}

      {stats && <StatsTable stats={stats} />}
      {stats && <ChartPanel stats={stats} />}
      {correlation && <CorrelationHeatmap correlation={correlation} />}
      {insights && <AIInsights insights={insights} />}
    </div>
  );
}
