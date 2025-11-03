"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function WorkshopsPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Workshops"
        description="Hands-on learning sessions covering the latest technologies."
      >
        <Placeholder
          icon="Wrench"
          title="Workshop Schedule"
          message="Our workshop schedule is being finalized. Check back soon for hands-on learning sessions on programming, engineering, and professional development."
        />
      </PageHeader>
    </main>
  );
}
