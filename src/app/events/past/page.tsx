"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function PastEventsPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Past Events"
        description="Explore our archive of successful events and activities."
      >
        <Placeholder
          icon="History"
          title="Event Archive"
          message="Our past events archive is currently being compiled. Check back soon to explore our history of workshops, competitions, and networking events."
        />
      </PageHeader>
    </main>
  );
}
