export interface Item {
    id: string;
    title: string;
    price: number;
    condition?: "new" | "used";
    available_quantity?: number;
    category_id?: string;
    thumbnail?: string;
}
