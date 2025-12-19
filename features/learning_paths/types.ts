export interface LearningPath {
    id: number;
    created_at: string;
    user_id: string;
    title: string;
    description: string | null;
    goal: string;
    status_id: number;
    is_public: boolean | null;
    updated_at: string | null;
}

export interface PathStatus {
    id: number;
    created_at: string;
    status: string;
}