export interface Lesson {
    id: number;
    created_at: string;
    module_id: number | null;
    title: string | null;
    description: string | null;
    resource_url: string | null;
    resource_type_id: number | null;
    estimated_minutes: number | null;
    order_index: number | null;
    status_id: number | null;
    completed_at: string | null;
}

export interface LessonStatus {
    id: number;
    created_at: string;
    status: string | null;
}

export interface ResourceType {
    id: number;
    created_at: string;
    type: string | null;
}