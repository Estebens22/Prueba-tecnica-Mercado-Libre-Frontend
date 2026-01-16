import { useEffect, useState } from "react";
import { fetchItem, predictCondition } from "../api/items";

const ITEM_ID = "MLA580205907"; // hardcodeado a propósito

export default function ItemDetail() {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState<any>(null);

  useEffect(() => {
    fetchItem(ITEM_ID)
      .then(setItem)
      .finally(() => setLoading(false));
  }, []);

  const handlePredict = async () => {
    const result = await predictCondition(item);
    setPrediction(result);
  };

  if (loading) return <p>Cargando...</p>;
  if (!item) return <p>No se encontró el item</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>{item.title}</h1>

      <img
        src={item.thumbnail}
        alt={item.title}
        style={{ width: 300, marginBottom: 20 }}
      />

      <p>
        <strong>Precio:</strong> ${item.price}
      </p>

      <p>
        <strong>Stock:</strong> {item.available_quantity}
      </p>

      <p>
        <strong>Condición real:</strong> {item.condition}
      </p>

      <button onClick={handlePredict}>
        Predecir condición (ML)
      </button>

      {prediction && (
        <div style={{ marginTop: 20 }}>
          <h3>🤖 Predicción ML</h3>
          <p>
            <strong>Condición:</strong> {prediction.predicted_condition}
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