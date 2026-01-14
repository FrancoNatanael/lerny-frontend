"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Clock, BookOpen, TrendingUp, Play } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { LearningPath } from "@/features/learning_paths/types"
import Link from "next/link"

const supabase = createClient()

export default function PathDetailPage() {
    const params = useParams()
    const router = useRouter()
    const pathId = params.id as string

    const [path, setPath] = useState<LearningPath | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPath = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from("learning_paths")
                .select("*")
                .eq("id", pathId)
                .single()

            if (error) {
                setError(error.message)
            } else {
                setPath(data)
            }
            setLoading(false)
        }

        if (pathId) {
            fetchPath()
        }
    }, [pathId])

    if (loading) {
        return (
            <div className="">
                <main className="flex-1 p-6 md:p-8 lg:p-12 md:ml-64">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-16 w-full" />
                        <div className="grid gap-4 md:grid-cols-3">
                            <Skeleton className="h-32" />
                            <Skeleton className="h-32" />
                            <Skeleton className="h-32" />
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    if (error || !path) {
        return (
            <div className="">
                <main className="flex-1 p-6 md:p-8 lg:p-12 md:ml-64">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <Link href="/dashboard/paths">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver a rutas
                            </Button>
                        </Link>
                        <Card className="p-8 border-destructive/50 bg-destructive/10">
                            <p className="text-destructive font-medium">
                                {error || "No se pudo cargar el path"}
                            </p>
                        </Card>
                    </div>
                </main>
            </div>
        )
    }

    // Mock data for demonstration - in real app, fetch from database
    const stats = {
        timeInvested: "12.5h",
        modulesCompleted: 7,
        modulesTotal: 15,
        progress: 47
    }

    const modules = [
        { id: 1, title: "Introduction to React", status: "completed", duration: "2h" },
        { id: 2, title: "React Hooks Deep Dive", status: "in_progress", duration: "3h" },
        { id: 3, title: "State Management", status: "not_started", duration: "4h" },
        { id: 4, title: "Advanced Patterns", status: "not_started", duration: "3h" },
        { id: 5, title: "Performance Optimization", status: "not_started", duration: "2.5h" },
    ]

    return (
        <div className="">
            <main className="flex-1 p-6 md:p-8 lg:p-12 md:ml-64">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Back button */}
                    <Link href="/dashboard/paths">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver a rutas
                        </Button>
                    </Link>

                    {/* Path header */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-balance">{path.title}</h1>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {path.description || "Sin descripción disponible"}
                        </p>
                        {path.goal && (
                            <div className="p-4 rounded-lg bg-secondary/50 border-l-4 border-primary">
                                <p className="text-sm font-medium">Objetivo: {path.goal}</p>
                            </div>
                        )}
                    </div>

                    {/* Stats cards */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="p-8 border-border/50">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-foreground" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">{stats.timeInvested}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Tiempo invertido</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 border-border/50">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-foreground" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">{stats.modulesCompleted}/{stats.modulesTotal}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Módulos completados</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 border-border/50">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-foreground" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold">{stats.progress}%</p>
                                    <p className="text-sm text-muted-foreground mt-1">Progreso total</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Continue learning button */}
                    <div className="p-8 rounded-xl bg-card shadow-md border-l-4 border-primary">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                                    <Play className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold">Continuar aprendiendo</p>
                                    <p className="text-sm text-muted-foreground">React Hooks Deep Dive</p>
                                </div>
                            </div>
                            <Button size="lg">
                                Reanudar
                            </Button>
                        </div>
                    </div>

                    {/* Modules list */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold">Módulos del Path</h2>
                        <div className="space-y-3">
                            {modules.map((module) => (
                                <Card
                                    key={module.id}
                                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-border/50"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${module.status === 'completed'
                                                    ? 'bg-primary/20 text-primary'
                                                    : module.status === 'in_progress'
                                                        ? 'bg-secondary border-2 border-primary text-primary'
                                                        : 'bg-secondary text-muted-foreground'
                                                }`}>
                                                {module.status === 'completed' ? '✓' :
                                                    module.status === 'in_progress' ? '→' :
                                                        module.id}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{module.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {module.status === 'completed' ? 'Completado' :
                                                        module.status === 'in_progress' ? 'En progreso' :
                                                            'No iniciado'} • {module.duration}
                                                </p>
                                            </div>
                                        </div>
                                        {module.status !== 'not_started' && (
                                            <Button variant="ghost" size="sm">
                                                {module.status === 'completed' ? 'Revisar' : 'Continuar'}
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
