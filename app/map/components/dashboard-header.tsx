"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface DashboardHeaderProps {
  onSearch: (term: string) => void;
  notificationCount?: number;
}

export default function DashboardHeader({
  onSearch,
  notificationCount = 0,
}: DashboardHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <h1 className="text-2xl font-bold">DataBridge Community</h1>
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search community..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pr-8"
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="font-medium">New Resource Added</span>
                <span className="text-sm text-muted-foreground">
                  A new food bank has been added to your area
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="font-medium">Upcoming Event</span>
                <span className="text-sm text-muted-foreground">
                  Community meetup tomorrow at 6 PM
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
