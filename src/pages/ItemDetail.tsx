import { useEffect, useState } from "react";
import { fetchItem, predictCondition } from "../api/items";

const ITEM_ID = "MLA580205907"; // hardcodeado a propósito para la prueba

export default function ItemDetail() {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [predicting, setPredicting] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // -----------------------------
  // Cargar item
  // -----------------------------
  useEffect(() => {
    fetchItem(ITEM_ID)
      .then(setItem)
      .catch(() => setError("No se pudo cargar el item"))
      .finally(() => setLoading(false));
  }, []);

  // -----------------------------
  // Predicción ML
  // -----------------------------
  const handlePredict = async () => {
    if (!item) return;

    setPredicting(true);
    setError(null);

    try {
      const result = await predictCondition(item.id);
      setPrediction(result);
    } catch (err) {
      setError("Error al predecir la condición");
    } finally {
      setPredicting(false);
    }
  };

  // -----------------------------
  // Estados
  // -----------------------------
  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return <p>No se encontró el item</p>;

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>{item.title}</h1>

      {item.thumbnail && (
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{ width: 300, marginBottom: 20 }}
        />
      )}

      <p>
        <strong>Precio:</strong> ${item.price}
      </p>

      <p>
        <strong>Stock:</strong> {item.available_quantity}
      </p>

      <p>
        <strong>Condición real:</strong> {item.condition}
      </p>

      <button onClick={handlePredict} disabled={predicting}>
        {predicting ? "Prediciendo..." : "Predecir condición (ML)"}
      </button>

      {prediction && (
        <div style={{ marginTop: 20 }}>
          <h3>🤖 Predicción ML</h3>
          <p>
            <strong>Condición:</strong>{" "}
            {prediction.predicted_condition}
          </p>
          <p>
            <strong>Confianza:</strong>{" "}
            {(prediction.confidence * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}