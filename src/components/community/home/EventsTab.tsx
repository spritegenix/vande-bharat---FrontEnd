"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export default function EventsTab() {
  return (
    <div className="rounded-lg border bg-background text-foreground">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-1 text-2xl font-semibold">Events</h2>
            <p className="text-muted-foreground">Upcoming community events and workshops</p>
          </div>
          <Button className="gap-2" asChild>
            <Link href={"/community/events"}>
              <PlusIcon className="h-4 w-4" /> Create Event
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {[
          {
            month: "MAR",
            date: "25",
            title: "Temple Architecture Workshop",
            description:
              "Learn about ancient temple construction techniques and architectural principles from expert historians and archaeologists.",
            day: "March 25, 2025",
            time: "2:00 PM - 5:00 PM",
            location: "Heritage Center, Delhi",
            attending: "45 attending",
          },
          {
            month: "APR",
            date: "02",
            title: "Heritage Site Visit - Konark Sun Temple",
            description:
              "Guided tour of the magnificent Konark Sun Temple with detailed explanation of its architectural marvels and historical significance.",
            day: "April 2, 2025",
            time: "9:00 AM - 4:00 PM",
            location: "Konark, Odisha",
            attending: "23 attending",
          },
        ].map((event, idx) => (
          <Card key={idx} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-start space-x-4">
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-muted">
                  <span className="text-sm text-muted-foreground">{event.month}</span>
                  <span className="text-lg font-semibold text-foreground">{event.date}</span>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{event.title}</h3>
                  <p className="mb-3 text-muted-foreground">{event.description}</p>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" /> {event.day}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" /> {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <UsersIcon className="h-4 w-4" /> {event.attending}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button>Join Event</Button>
                    <Button variant="outline">Share</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
