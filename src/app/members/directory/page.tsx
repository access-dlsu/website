"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function DirectoryPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Member Directory"
        description="Connect with fellow ACCESS members."
      >
        <Placeholder
          icon="UserCheck"
          title="Member Directory"
          message="Our member directory is being developed. Soon you'll be able to discover and connect with fellow ACCESS members, view profiles, and build your professional network."
        />
      </PageHeader>
    </main>
  );
}
