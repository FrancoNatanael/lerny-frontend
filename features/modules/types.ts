export interface Module {
    id: number;
    created_at: string;
    path_id: number;
    title: string | null;
    description: string | null;
    order_index: number | null;
}