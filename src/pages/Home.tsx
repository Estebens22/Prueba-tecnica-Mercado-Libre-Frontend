import { useEffect, useState } from 'react'
import { fetchItems } from '../api/items'
import { ItemList } from '../components/ItemList'
import type { Item } from '../types/item'

export function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const LIMIT = 10

  useEffect(() => {
    loadItems(0)
  }, [])

  async function loadItems(newOffset: number) {
    const res = await fetchItems(LIMIT, newOffset)
    setItems(prev => [...prev, ...res.items])
    setTotal(res.total)
    setOffset(newOffset + LIMIT)
  }

  const hasMore = items.length < total

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h1>🛒 ML Items</h1>

      <ItemList items={items} />

      {hasMore && (
        <button
          style={{ marginTop: 24 }}
          onClick={() => loadItems(offset)}
        >
          Cargar más
        </button>
      )}
    </div>
  )
}