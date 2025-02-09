"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "./components/dashboard-header";
import DashboardSidebar from "./components/dashboard-sidebar";
import DashboardStats from "./components/dashboard-stats";
import CommunityMap from "./components/community-map";
import type {
  Resource,
  LocalEvent,
  Notification,
  FilterState,
  EventCategory,
  ResourceType,
} from "./types/dashboard";

export default function CommunityDashboard() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    resources: [],
    events: [],
    search: "",
  });

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const [resourceData, eventData, notificationData] = await Promise.all([
          fetch("/api/resources").then((res) => res.json()),
          fetch("/api/events").then((res) => res.json()),
          fetch("/api/notifications").then((res) => res.json()),
        ]);

        setResources(resourceData);
        setEvents(eventData);
        setNotifications(notificationData);
      } catch (error) {
        console.error("Failed to fetch community data:", error);
      }
    };

    fetchCommunityData();
  }, []);

  const filteredResources = resources.filter(
    (resource) =>
      (filters.resources.length === 0 ||
        filters.resources.includes(resource.type as ResourceType)) &&
      (filters.search === "" ||
        resource.name.toLowerCase().includes(filters.search.toLowerCase()))
  );

  const filteredEvents = events.filter(
    (event) =>
      (filters.events.length === 0 ||
        filters.events.includes(event.category as EventCategory)) &&
      (filters.search === "" ||
        event.title.toLowerCase().includes(filters.search.toLowerCase()))
  );

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader
        onSearch={(term) => handleFilterChange({ search: term })}
        notificationCount={notifications.length}
      />
      <div className="flex flex-1">
        <DashboardSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <main className="flex-1 space-y-4 p-4 md:p-6">
          <DashboardStats
            resourceCount={filteredResources.length}
            eventCount={filteredEvents.length}
            notificationCount={notifications.length}
          />
          <div className="rounded-lg border bg-card">
            <CommunityMap
              resources={filteredResources}
              localEvents={filteredEvents}
              notifications={notifications}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
