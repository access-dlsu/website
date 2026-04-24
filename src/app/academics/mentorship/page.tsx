"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function MentorshipPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Mentorship Program"
        description="Connect with upperclassmen and alumni for academic guidance."
      >
        <Placeholder
          icon="HeartHandshake"
          title="Mentorship Platform"
          message="Our mentorship matching platform is in development. Soon you'll be able to connect with experienced students and alumni for guidance in your academic journey."
        />
      </PageHeader>
    </main>
  );
}
