"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LearningPath } from "./types";

const supabase = createClient();

export function useFetchLearningPaths() {
    const [paths, setPaths] = useState<LearningPath[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getAllLearningPaths = async () => {
        setLoading(true);

        let query = supabase
            .from("learning_paths")
            .select("*");

        const { data, error } = await query;

        if (error) setError(error.message);
        else setPaths(data ?? []);

        setLoading(false);
    };

    return { getAllLearningPaths, paths, loading, error };
}