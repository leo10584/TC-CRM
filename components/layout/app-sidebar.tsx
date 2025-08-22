"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Building2,
  ChevronDown,
  ChevronRight,
  FileText,
  Home,
  PenTool,
  PieChart,
  Search,
  Settings,
  Shield,
  Users,
  Workflow,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavItem[]
}

export function AppSidebar() {
  const pathname = usePathname()
  const t = useTranslations("nav")
  const [openSections, setOpenSections] = useState<string[]>(["sales"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const navItems: NavItem[] = [
    {
      title: t("dashboard"),
      href: "/",
      icon: Home,
    },
    {
      title: "Sales Pipeline",
      href: "#",
      icon: Workflow,
      children: [
        {
          title: t("rfp"),
          href: "/rfp/new",
          icon: FileText,
        },
        {
          title: t("pipeline"),
          href: "/pipeline",
          icon: BarChart3,
        },
        {
          title: t("opportunities"),
          href: "/opps",
          icon: Building2,
        },
        {
          title: t("quotes"),
          href: "/quotes",
          icon: PenTool,
        },
      ],
    },
    {
      title: t("search"),
      href: "/search",
      icon: Search,
    },
    {
      title: t("reports"),
      href: "/reports",
      icon: PieChart,
    },
    {
      title: "Administration",
      href: "#",
      icon: Settings,
      children: [
        {
          title: t("settings"),
          href: "/admin/settings",
          icon: Settings,
        },
        {
          title: "Users & Teams",
          href: "/admin/users",
          icon: Users,
        },
        {
          title: t("audit"),
          href: "/audit",
          icon: Shield,
        },
      ],
    },
  ]

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = pathname === item.href
    const hasChildren = item.children && item.children.length > 0
    const sectionKey = item.title.toLowerCase().replace(/\s+/g, "-")
    const isOpen = openSections.includes(sectionKey)

    if (hasChildren) {
      return (
        <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleSection(sectionKey)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 h-9",
                level > 0 && "ml-4",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.title}</span>
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children?.map((child) => renderNavItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Button
        key={item.title}
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 h-9",
          level > 0 && "ml-4",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        )}
        asChild
      >
        <Link href={item.href}>
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
          {item.badge && (
            <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
              {item.badge}
            </span>
          )}
        </Link>
      </Button>
    )
  }

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">TC</span>
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Tatvacare</h1>
            <p className="text-xs text-muted-foreground">HealthTech CRM</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">{navItems.map((item) => renderNavItem(item))}</nav>

      {/* User section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">User Name</p>
            <p className="text-xs text-muted-foreground truncate">user@tatvacare.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}