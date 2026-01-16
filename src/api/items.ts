const API_BASE = "http://localhost:8000";

export async function fetchItem(itemId: string) {
    const res = await fetch(`${API_BASE}/items/${itemId}`);
    if (!res.ok) throw new Error("Error fetching item");
    return res.json();
}

export async function predictCondition(payload: any) {
    const res = await fetch(`${API_BASE}/items/predict-condition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Prediction failed");
    return res.json();
}
