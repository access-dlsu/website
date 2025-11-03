"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function UpcomingEventsPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Upcoming Events"
        description="Check out our upcoming workshops, seminars, and networking events."
      >
        <Placeholder
          icon="CalendarDays"
          title="Stay Tuned"
          message="Our upcoming events calendar is being prepared. Check back soon for workshops, competitions, and networking opportunities."
        />
      </PageHeader>
    </main>
  );
}
