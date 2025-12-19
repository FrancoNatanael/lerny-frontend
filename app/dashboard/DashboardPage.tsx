"use client"

import { Card } from "@/components/ui/card"
import { PathCard } from "@/components/PathCard"
import { InfoCard } from "@/components/InfoCard"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, TrendingUp, Play } from "lucide-react"
import AppSidebar from "@/components/AppSidebar"
import { useEffect, useState } from "react"
import { useFetchLearningPaths } from "@/features/learning_paths/useFetchLearningPaths"
import { Skeleton } from "@/components/ui/skeleton"

const nextResource = {
    title: "Building REST APIs with Express",
    type: "Video",
    duration: 45,
    pathTitle: "Full-Stack Web Development",
}

const weeklyStats = {
    hoursStudied: 12.5,
    streak: 7,
    progressVsLastWeek: 23,
}

export default function DashboardPage() {
    const [greeting, setGreeting] = useState("Buenos días")
    const { getAllLearningPaths, paths, loading, error } = useFetchLearningPaths()

    useEffect(() => {
        const currentHour = new Date().getHours()
        setGreeting(currentHour < 12 ? "Buenos días" : "Buenas tardes")

        getAllLearningPaths()
    }, [])

    return (
        <div className="">
            <main className="flex-1 p-6 md:p-8 lg:p-12 md:ml-64">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-balance">{greeting}, Franco</h1>
                        <p className="text-muted-foreground leading-relaxed">Listo para continuar tu viaje de aprendizaje?</p>
                    </div>

                    {/* Continue Learning Section */}
                    <div className="p-6 rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 shadow">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-md bg-accent/20 border border-accent flex items-center justify-center">
                                        <Play className="h-4 w-4 text-accent" />
                                    </div>
                                    <span className="text-sm font-medium text-accent">Continuar aprendiendo</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">{nextResource.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {nextResource.pathTitle} • {nextResource.type} • {nextResource.duration}
                                    </p>
                                </div>
                            </div>
                            <Button size="lg" className="shrink-0">
                                Reanudar
                            </Button>
                        </div>
                    </div>

                    {/* Weekly Progress Summary */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <InfoCard
                            icon={Clock}
                            value={`${weeklyStats.hoursStudied}h`}
                            label="Semana actual"
                            variant="primary"
                        />
                        <InfoCard
                            icon={TrendingUp}
                            value={`${weeklyStats.streak} días`}
                            label="Racha actual"
                            variant="accent"
                        />
                        <InfoCard
                            icon={BookOpen}
                            value={`+${weeklyStats.progressVsLastWeek}%`}
                            label="Vs semana pasada"
                            variant="chart-3"
                        />
                    </div>

                    {/* Active Learning Paths */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">Rutas de aprendizaje activas</h2>
                            <Button variant="outline" size="sm">
                                Ver todas
                            </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {paths.map((path) => (
                                <PathCard
                                    key={path.id}
                                    title={path.title}
                                    description={path.description ?? ""}
                                />
                            ))
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}