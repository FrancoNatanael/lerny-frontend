import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PathCardProps {
    title: string
    description: string
    progress?: number
    modulesCompleted?: number
    modulesTotal?: number
    timeRemaining?: string
    onClick?: () => void
}

export function PathCard({
    title,
    description,
    progress,
    modulesCompleted,
    modulesTotal,
    timeRemaining,
    onClick
}: PathCardProps) {
    return (
        <Card
            className="p-6 hover:border-primary/50 transition-colors cursor-pointer group text-left"
            onClick={onClick}
        >
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-medium">{progress}%</span>
                    </div>
                    {/* <Progress value={progress} className="h-2" /> */}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                        {modulesCompleted} / {modulesTotal} módulos
                    </span>
                    <span>{timeRemaining} restantes</span>
                </div>
            </div>
        </Card>
    )
}
