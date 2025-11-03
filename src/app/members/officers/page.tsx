"use client";

import PageHeader from "@/components/ui/page-header";
import Placeholder from "@/components/ui/placeholder";

export default function OfficersPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <PageHeader
        title="Officers"
        description="Meet the ACCESS leadership team."
      >
        <Placeholder
          icon="Users"
          title="Leadership Team"
          message="Our officers page is being updated. Soon you'll be able to meet our dedicated team of student leaders who work hard to make ACCESS great."
        />
      </PageHeader>
    </main>
  );
}
