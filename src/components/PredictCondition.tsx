import { useState } from "react";
import { predictCondition } from "../api/items";
import type { Item } from "../types/item";

export function PredictCondition({ item }: { item: Item }) {
  const [result, setResult] = useState<{
    predicted_condition: "new" | "used";
    confidence: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  async function handlePredict() {
    setLoading(true);
    try {
      const res = await predictCondition(item);
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="predict-box">
      <button onClick={handlePredict} disabled={loading}>
        {loading ? "Analizando..." : "Predecir condición (ML)"}
      </button>

      {result && (
        <div
          className={`prediction ${
            result.predicted_condition === "new"
              ? "prediction-new"
              : "prediction-used"
          }`}
        >
          🤖 {result.predicted_condition.toUpperCase()} ·{" "}
          {(result.confidence * 100).toFixed(1)}%
        </div>
      )}
    </div>
  );
}