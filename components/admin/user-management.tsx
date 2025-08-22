"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { userManagementSchema, type UserManagement } from "@/lib/validations/admin"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Shield, Mail } from "lucide-react"

export function UserManagementComponent() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserManagement | null>(null)

  const form = useForm<UserManagement>({
    resolver: zodResolver(userManagementSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: "",
      department: "",
      isActive: true,
    },
  })

  // Mock users data
  const users = [
    {
      id: "1",
      email: "rajesh.kumar@tatvacare.com",
      firstName: "Rajesh",
      lastName: "Kumar",
      role: "Sales Manager",
      department: "Sales",
      isActive: true,
      lastLogin: "2024-01-15 10:30 AM",
    },
    {
      id: "2",
      email: "priya.sharma@tatvacare.com",
      firstName: "Priya",
      lastName: "Sharma",
      role: "Sales Rep",
      department: "Sales",
      isActive: true,
      lastLogin: "2024-01-15 09:15 AM",
    },
    {
      id: "3",
      email: "amit.patel@tatvacare.com",
      firstName: "Amit",
      lastName: "Patel",
      role: "Admin",
      department: "IT",
      isActive: true,
      lastLogin: "2024-01-14 04:45 PM",
    },
  ]

  const roles = [
    { value: "admin", label: "Administrator" },
    { value: "sales_manager", label: "Sales Manager" },
    { value: "sales_rep", label: "Sales Representative" },
    { value: "viewer", label: "Viewer" },
  ]

  const onSubmit = async (data: UserManagement) => {
    try {
      // TODO: Replace with actual API call
      console.log("User data:", data)

      toast({
        title: editingUser ? "User Updated" : "User Created",
        description: `User ${data.firstName} ${data.lastName} has been ${editingUser ? "updated" : "created"} successfully.`,
      })

      setIsDialogOpen(false)
      setEditingUser(null)
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (user: any) => {
    setEditingUser(user)
    form.reset(user)
    setIsDialogOpen(true)
  }

  const handleDelete = async (userId: string) => {
    try {
      // TODO: Replace with actual API call
      console.log("Deleting user:", userId)

      toast({
        title: "User Deleted",
        description: "User has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "sales manager":
        return "bg-blue-100 text-blue-800"
      case "sales rep":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            User Management
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingUser(null)
                  form.reset()
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Active User</FormLabel>
                          <div className="text-sm text-muted-foreground">User can access the system</div>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingUser ? "Update User" : "Create User"}</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center font-medium">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
                <div>
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </div>
                  <div className="text-xs text-muted-foreground">Last login: {user.lastLogin}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  <div className="text-xs text-muted-foreground mt-1">{user.department}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(user.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
