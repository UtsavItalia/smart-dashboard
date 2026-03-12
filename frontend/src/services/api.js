const BASE_URL = "http://localhost:8000";

export async function uploadCSV(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/upload/`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Upload failed");
    }

    return response.json();
}

export async function getStats(filename) {
    const response = await fetch(`${BASE_URL}/analysis/stats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: filename })
    })

    if (!response.ok) {
        const error = await response.json();
        console.log("Full error response:", JSON.stringify(error, null, 2));  // ADD THIS
        throw new Error(error.detail || "Stats fetch failed");
    }
    return response.json()
}

export async function getCorrelation(filename) {
    const response = await fetch(`${BASE_URL}/analysis/correlation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: filename })
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Cannot fetch correlation")
    }
    return response.json()
}

export async function getInsights(filename) {
    const response = await fetch(`${BASE_URL}/insights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: filename })
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Cannot fetch insights")
    }
    return response.json()
}
