"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function BenefitsPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Member Benefits"
        description="Discover the exclusive benefits of being an ACCESS member."
      >
        <Placeholder
          icon="Gift"
          title="Member Perks"
          message="We're compiling a comprehensive list of member benefits. Soon you'll discover all the exclusive perks, opportunities, and resources available to ACCESS members."
        />
      </PageHeader>
    </main>
  );
}
