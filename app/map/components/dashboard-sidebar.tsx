"use client";

import { Calendar, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import type {
  FilterState,
  ResourceType,
  EventCategory,
} from "../types/dashboard";

interface DashboardSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export default function DashboardSidebar ({
  filters,
  onFilterChange,
}: DashboardSidebarProps) {
  const resourceTypes: ResourceType[] = [
    "Food Bank",
    "Shelter",
    "Healthcare",
    "Community Center",
  ];
  const eventCategories: EventCategory[] = [
    "Community",
    "Sports",
    "Educational",
    "Charity",
  ];

  const handleResourceFilterChange = (type: ResourceType) => {
    const newResources = filters.resources.includes(type)
      ? filters.resources.filter((t) => t !== type)
      : [...filters.resources, type];
    onFilterChange({ resources: newResources });
  };

  const handleEventFilterChange = (category: EventCategory) => {
    const newEvents = filters.events.includes(category)
      ? filters.events.filter((c) => c !== category)
      : [...filters.events, category];
    onFilterChange({ events: newEvents });
  };

  return (
    <aside className="w-80 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="h-[calc(100vh-3.5rem)] px-4">
        <div className="py-6">
          <h2 className="px-2 text-lg font-semibold tracking-tight">Filters</h2>
          <Accordion
            type="multiple"
            defaultValue={["resources", "events"]}
            className="w-full"
          >
            <AccordionItem value="resources">
              <AccordionTrigger className="px-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Resources</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-2">
                  {resourceTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`resource-${type}`}
                        checked={filters.resources.includes(type)}
                        onCheckedChange={() => handleResourceFilterChange(type)}
                      />
                      <Label htmlFor={`resource-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="events">
              <AccordionTrigger className="px-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Events</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-2">
                  {eventCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`event-${category}`}
                        checked={filters.events.includes(category)}
                        onCheckedChange={() =>
                          handleEventFilterChange(category)
                        }
                      />
                      <Label htmlFor={`event-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </aside>
  );
}
