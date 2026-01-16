const API_URL = "http://localhost:8000";

// -----------------------------
// Types (opcional pero recomendado)
// -----------------------------
export interface Item {
    id: string;
    title: string;
    price: number;
    condition?: "new" | "used";
    available_quantity?: number;
    category_id?: string;
    thumbnail?: string;
}

export interface PredictionResponse {
    predicted_condition: "new" | "used";
    confidence: number;
}

// -----------------------------
// Items
// -----------------------------
export async function fetchItems(limit = 10, offset = 0) {
    const res = await fetch(`${API_URL}/items?limit=${limit}&offset=${offset}`);

    if (!res.ok) {
        throw new Error("Failed to fetch items");
    }

    return res.json();
}

export async function fetchItem(itemId: string): Promise<Item> {
    const res = await fetch(`${API_URL}/items/${itemId}`);

    if (!res.ok) {
        throw new Error("Item not found");
    }

    return res.json();
}

export async function searchItems(params: {
    q?: string;
    min_price?: number;
    max_price?: number;
    condition?: string;
}) {
    const query = new URLSearchParams(
        Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null)
            .map(([k, v]) => [k, String(v)])
    ).toString();

    const res = await fetch(`${API_URL}/items/search/?${query}`);

    if (!res.ok) {
        throw new Error("Search failed");
    }

    return res.json();
}

// -----------------------------
// ML Prediction
// -----------------------------
export async function predictCondition(payload: {
    id: string;
    title: string;
    price: number;
    available_quantity?: number;
    category_id?: string;
    accepts_mercadopago?: boolean;
    shipping?: { free_shipping?: boolean };
    pictures?: any[];
}) {
    const res = await fetch("http://localhost:8000/items/predict-condition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Prediction failed");
    }

    return res.json();
}
