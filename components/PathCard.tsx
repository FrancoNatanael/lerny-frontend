import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface PathCardProps {
    id: number
    title: string
    description: string
    progress?: number
    modulesCompleted?: number
    modulesTotal?: number
    timeRemaining?: string
    onClick?: () => void
}

export function PathCard({
    id,
    title,
    description,
    progress,
    modulesCompleted,
    modulesTotal,
    timeRemaining,
    onClick
}: PathCardProps) {
    const cardContent = (
        <Card
            className="p-8 hover:shadow-lg transition-shadow duration-200 cursor-pointer group text-left border-border/50"
            onClick={onClick}
        >
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                {(progress !== undefined && progress !== null) && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progreso</span>
                            <span className="font-medium">{progress}%</span>
                        </div>
                        {/* <Progress value={progress} className="h-2" /> */}
                    </div>
                )}

                {(modulesCompleted !== undefined && modulesTotal !== undefined && modulesTotal > 0) && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                            {modulesCompleted} / {modulesTotal} módulos
                        </span>
                        {timeRemaining && timeRemaining !== "--" && (
                            <span>{timeRemaining} restantes</span>
                        )}
                    </div>
                )}
            </div>
        </Card>
    )

    // If onClick is provided, use it directly without Link
    if (onClick) {
        return cardContent
    }

    // Otherwise, wrap in Link for navigation
    return (
        <Link href={`/dashboard/paths/${id}`} className="block">
            {cardContent}
        </Link>
    )
}
