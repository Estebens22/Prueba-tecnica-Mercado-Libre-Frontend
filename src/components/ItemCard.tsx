import type { Item } from "../types/item";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="item-card">
      {item.thumbnail && (
        <img
          src={item.thumbnail}
          alt={item.title}
          className="item-image"
        />
      )}

      <div className="item-info">
        <h3 className="item-title">{item.title}</h3>

        <p className="item-price">
          ${item.price.toLocaleString()}
        </p>

        {item.condition && (
          <span
            className={`badge ${
              item.condition === "new" ? "badge-new" : "badge-used"
            }`}
          >
            {item.condition.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}