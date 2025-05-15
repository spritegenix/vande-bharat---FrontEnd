"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "about_overview", label: "Overview" },
  { key: "about_work", label: "Work & Education" },
];

export function AboutSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = searchParams.get("sk") || "about_overview";

  const handleTabClick = (key: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("sk", key);
    router.replace(url.pathname + "?" + url.searchParams.toString(), { scroll: false });
  };

  return (
    <div className="space-y-2">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          variant={currentTab === tab.key ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => handleTabClick(tab.key)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
