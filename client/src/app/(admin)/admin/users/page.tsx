"use client"
export const dynamic = "force-dynamic";

import { useQuery } from "@tanstack/react-query"
import { GetAllUsers } from "@/api/adminapi"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
 import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Users } from "lucide-react"

function UserSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="w-12 h-12 bg-muted rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-32" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function UserList() {
  const fetchAllUsers = async () => {
    const res = await GetAllUsers()
    return res.data
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-users"],
    queryFn: fetchAllUsers,
  })

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md border-destructive/50">
          <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="text-3xl">⚠️</div>
            <p className="text-destructive font-medium">Failed to load users</p>
            <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-6 h-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Users</h1>
        </div>
        <p className="text-sm text-muted-foreground">{data?.length || 0} total users</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <UserSkeleton key={i} />
          ))}
        </div>
      ) : (
        /* Responsive grid layout: 1 col mobile, 2 cols tablet, 3 cols desktop */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((user: any) => (
            <Card key={user._id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} referrerPolicy="no-referrer" />
                    <AvatarFallback>
                      {user.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Badge variant="outline" className="text-xs">
                    Active
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground text-balance">{user.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && (!data || data.length === 0) && (
        <div className="flex items-center justify-center min-h-96 p-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="flex flex-col items-center gap-4 p-8">
              <Users className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground font-medium">No users found</p>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
