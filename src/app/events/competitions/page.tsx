"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function CompetitionsPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Competitions"
        description="Test your skills in hackathons and coding challenges."
      >
        <Placeholder
          icon="Award"
          title="Competition Events"
          message="Stay tuned for upcoming hackathons, coding challenges, and engineering competitions. Get ready to showcase your skills!"
        />
      </PageHeader>
    </main>
  );
}
