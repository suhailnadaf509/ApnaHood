"use client";
import { useEffect, useState } from "react";
import {
  Bell,
  Heart,
  MapPin,
  MessageCircle,
  PawPrintIcon as Paw,
  Search,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import EventPopup from "./components/event-popup";

export default function Dashboard() {
  const [userName, setUserName] = useState<string>("");
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      setUserName(session.user.email);
    }
  }, [session]);
  const [isEventPopupOpen, setIsEventPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    date: string;
    description: string;
  } | null>(null);

  const openEventPopup = (event: {
    title: string;
    date: string;
    description: string;
  }) => {
    setSelectedEvent(event);
    setIsEventPopupOpen(true);
  };

  const closeEventPopup = () => {
    setIsEventPopupOpen(false);
    setSelectedEvent(null);
  };

  {
    selectedEvent && (
      <EventPopup
        isOpen={isEventPopupOpen}
        onClose={closeEventPopup}
        event={selectedEvent}
      />
    );
  }

  const usernames = userName.split("@")[0];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-semibold">DataBridge</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                (window.location.href = "/dashboard-Admin/event-manager")
              }
            >
              Add Events
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        {/* Welcome Sectxn */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Welcome back, {usernames}! 👋</h2>
          <p className="text-muted-foreground">
            Your community is active today. Here&apos;s what&apos;s happening
            around you.
          </p>
        </div>

        {/* quick actions grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Find Lost Pets
              </CardTitle>
              <Paw className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <Link href="/pets" className="text-2xl font-bold">
                12 Active Cases
              </Link>
              <p className="text-xs text-muted-foreground">
                3 new reports today
              </p>
            </CardContent>
          </Card>
          <Card className="transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Emergency Services
              </CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <Link href="/emergency" className="text-2xl font-bold">
                24/7 Support
              </Link>
              <p className="text-xs text-muted-foreground">
                Quick access to help
              </p>
            </CardContent>
          </Card>
          <Card className="transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Local Resources
              </CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <Link href="/resources" className="text-2xl font-bold">
                45+ Services
              </Link>
              <p className="text-xs text-muted-foreground">
                Food banks, shelters & more
              </p>
            </CardContent>
          </Card>
          <Card className="transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Community Posts
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <Link href="/community_page" className="text-2xl font-bold">
                8 New Posts
              </Link>
              <p className="text-xs text-muted-foreground">
                Join the conversation
              </p>
            </CardContent>
          </Card>
        </div>

        {/* MaiN */}
        <div className="grid gap-6 md:grid-cols-7">
          {/* Community FeEEd */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Community Feed</CardTitle>
              <CardDescription>
                Recent updates from your neighborhood
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {/* Emergency Alert */}
                  <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-red-600">
                        Emergency Alert
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Flash flood warning in effect for downtown area. Seek
                        higher ground.
                      </p>
                      <p className="mt-1 text-xs text-red-600">
                        Posted 5 minutes ago
                      </p>
                    </CardContent>
                  </Card>

                  {/* Lost Pet Report */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-sm font-medium">
                          Sarah M.
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Lost golden retriever near Central Park. Responds to
                        &quot;Max&quot;. Please call if spotted!
                      </p>

                      <div className="mt-2 flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8">
                          <Heart className="mr-2 h-4 w-4" /> Help Search
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          <MessageCircle className="mr-2 h-4 w-4" /> Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Community Resource Update */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>FB</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-sm font-medium">
                          Food Bank
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Extra supplies available today. Open until 7 PM. No
                        registration required.
                      </p>
                      <div className="mt-2">
                        <Button variant="ghost" size="sm" className="h-8">
                          <MapPin className="mr-2 h-4 w-4" /> Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Local Business Update */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>PC</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-sm font-medium">
                          Pet Care Clinic
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Free vaccination drive this Saturday. First come, first
                        served basis.
                      </p>
                      <div className="mt-2">
                        <Button variant="ghost" size="sm" className="h-8">
                          <MessageCircle className="mr-2 h-4 w-4" /> Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Sidebar Content */}
          <div className="col-span-3 space-y-6">
            {/* Search Box */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Search</CardTitle>
                <CardDescription>
                  Find resources or report sightings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    placeholder="Search resources, pets, or services..."
                    className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Community gatherings and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                    onClick={() =>
                      openEventPopup({
                        title: "Sangeet",
                        date: "Tomorrow, 9 PM",
                        description:
                          "Join us for a night of music and dance celebrating our community's diverse cultural heritage.",
                      })
                    }
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sangeet</p>
                      <p className="text-xs text-muted-foreground">
                        Tomorrow, 9 PM
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
                    onClick={() =>
                      openEventPopup({
                        title: "Jungle Camp",
                        date: "This Weekend",
                        description:
                          "Experience nature up close with our family-friendly camping trip in the nearby national park.",
                      })
                    }
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                      <Paw className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Jungle Camp</p>
                      <p className="text-xs text-muted-foreground">
                        This Weekend
                      </p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    View All Events
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weather Alert */}
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/10">
              <CardHeader>
                <CardTitle className="text-orange-600">Weather Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-600">
                  Heavy rain expected this evening. Keep pets indoors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        {selectedEvent && (
          <EventPopup
            isOpen={isEventPopupOpen}
            onClose={closeEventPopup}
            event={selectedEvent}
          />
        )}
      </main>
    </div>
  );
}
