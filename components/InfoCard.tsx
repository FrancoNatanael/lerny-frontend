import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface InfoCardProps {
    icon: LucideIcon
    value: string | number
    label: string
    variant?: "primary" | "accent" | "chart-3"
}

const variantStyles = {
    primary: {
        wrapper: "bg-primary/10",
        icon: "text-primary"
    },
    accent: {
        wrapper: "bg-accent/10",
        icon: "text-accent"
    },
    "chart-3": {
        wrapper: "bg-chart-3/10",
        icon: "text-chart-3"
    }
}

export function InfoCard({ icon: Icon, value, label, variant = "primary" }: InfoCardProps) {
    const styles = variantStyles[variant]

    return (
        <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", styles.wrapper)}>
                    <Icon className={cn("h-5 w-5", styles.icon)} />
                </div>
                <div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                </div>
            </div>
        </Card>
    )
}
