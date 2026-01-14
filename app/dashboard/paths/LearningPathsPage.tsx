"use client"

import { PathCard } from "@/components/PathCard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect } from "react"
import { useFetchLearningPaths } from "@/features/learning_paths/useFetchLearningPaths"
import { Skeleton } from "@/components/ui/skeleton"

export default function LearningPathsPage() {
    const { getAllLearningPaths, paths, loading, error } = useFetchLearningPaths()

    useEffect(() => {
        getAllLearningPaths()
    }, [])

    return (
        <div className="">
            <main className="flex-1 p-6 md:p-8 lg:p-12 md:ml-64">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-balance">Rutas de aprendizaje</h1>
                            <p className="text-muted-foreground leading-relaxed">
                                Gestiona y explora todas tus rutas de aprendizaje
                            </p>
                        </div>
                        <Button size="lg" className="shrink-0">
                            <Plus className="h-4 w-4 mr-2" />
                            Nueva ruta
                        </Button>
                    </div>

                    {error && (
                        <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive">
                            <p className="text-sm font-medium">Error al cargar las rutas</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {
                            loading ? (
                                <>
                                    <Skeleton className="h-48 p-6 bg-card shadow" />
                                    <Skeleton className="h-48 p-6 bg-card shadow" />
                                    <Skeleton className="h-48 p-6 bg-card shadow" />
                                </>
                            ) : paths.length === 0 ? (
                                <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
                                    <div className="space-y-3 max-w-md">
                                        <h3 className="text-xl font-semibold">No hay rutas de aprendizaje</h3>
                                        <p className="text-muted-foreground">
                                            Comienza tu viaje de aprendizaje creando tu primera ruta
                                        </p>
                                        <Button size="lg" className="mt-4">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Crear primera ruta
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                paths.map((path) => (
                                    <PathCard
                                        key={path.id}
                                        id={path.id}
                                        title={path.title}
                                        description={path.description ?? ""}
                                        progress={0}
                                        modulesCompleted={0}
                                        modulesTotal={0}
                                        timeRemaining="--"
                                    />
                                ))
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}