import type { Item } from "../types/item";
import { ItemCard } from "./ItemCard";
import { PredictCondition } from "./PredictCondition";

export function ItemList({ items }: { items: Item[] }) {
  return (
    <div className="items-grid">
      {items.map((item) => (
        <div key={item.id}>
          <ItemCard item={item} />
          <PredictCondition item={item} />
        </div>
      ))}
    </div>
  );
}