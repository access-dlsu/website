"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function AlumniPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Alumni Network"
        description="Connect with ACCESS alumni around the world."
      >
        <Placeholder
          icon="Network"
          title="Alumni Community"
          message="Our alumni network platform is under development. Soon you'll be able to connect with successful graduates, explore career paths, and build professional relationships."
        />
      </PageHeader>
    </main>
  );
}
