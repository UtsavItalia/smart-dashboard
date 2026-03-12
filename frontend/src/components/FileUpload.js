import { useState, useRef } from "react";

export default function FileUpload({ onUpload }) {
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef(null);

    function handleFile(file) {
        if (!file) return;
        if (!file.name.endsWith(".csv")) {
            alert("Please upload a CSV file");
            return;
        }
        onUpload(file);  // Pass file up to App.jsx which calls the API
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }

    function handleChange(e) {
        const file = e.target.files[0];
        handleFile(file);
    }

    return (
        <div
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            style={{
                border: `2px dashed ${dragging ? "#4a90e2" : "#ccc"}`,
                borderRadius: "12px",
                padding: "clamp(1.5rem, 5vw, 3rem)",
                textAlign: "center",
                cursor: "pointer",
                background: dragging ? "#eef4ff" : "#fff",
                transition: "all 0.2s ease",
            }}
        >
            <div style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}></div>
            <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", marginTop: "0.5rem", color: "#444" }}>
                Drag and drop a CSV file here
            </p>
            <p style={{ color: "#999", marginTop: "0.3rem", fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>
                or click to browse
            </p>
            <input
                ref={inputRef}
                type="file"
                accept=".csv"
                onChange={handleChange}
                style={{ display: "none" }}
            />
        </div>
    );
}
