"use client";

import { useSearchParams } from "next/navigation";
import Workplace from "./forms/Workplace";
import ToggleForm from "./ToggleForm";

export function AboutSection() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("sk") || "about_overview";

  switch (tab) {
    case "about_work":
      return <ToggleForm />;
    case "about_places":
      return <div>Places Lived Info</div>;
    case "about_overview":
    default:
      return <div>Overview Info</div>;
  }
}
