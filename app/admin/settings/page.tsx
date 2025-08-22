"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagementComponent } from "@/components/admin/user-management"
import { SystemSettingsComponent } from "@/components/admin/system-settings"
import { AuditLogViewer } from "@/components/audit/audit-log-viewer"

export default function AdminSettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
          <p className="text-muted-foreground">Manage users, system configuration, and audit trails</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagementComponent />
          </TabsContent>

          <TabsContent value="system">
            <SystemSettingsComponent />
          </TabsContent>

          <TabsContent value="audit">
            <AuditLogViewer />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
