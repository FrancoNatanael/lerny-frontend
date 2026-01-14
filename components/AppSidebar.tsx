
"use client"
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Home, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AppSidebar() {
    const router = useRouter()
    const items = [
        {
            title: "Dashboard",
            url: "#",
            icon: Home,
        },
        {
            title: "Planes de aprendizaje",
            url: "#",
            icon: Inbox,
        }
    ]

    return (
        <Sidebar className="w-64 flex flex-col h-full px-4 py-6">
            <SidebarHeader className="mb-6">
                <SidebarGroupLabel
                    onClick={() => { router.push("/dashboard") }}
                    className="cursor-pointer hover:bg-sidebar-hover">
                    <div className="">
                        <h1 className="text-2xl font-bold">
                            Lerny
                        </h1>
                        <p className="text-xs text-sidebar-foreground/60 mt-1">Sistema de Aprendizaje Personal</p>
                    </div>
                </SidebarGroupLabel>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex-1 space-y-2">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className={cn(
                                        "w-full justify-start gap-3 h-11"
                                    )}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className="pt-6 border-t border-sidebar-border">
                    <div className="text-xs text-sidebar-foreground/60 text-center">
                        Construyendo conocimiento.
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}