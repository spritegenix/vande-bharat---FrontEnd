import { Input } from "@/components/ui/input";
import React from "react";
import ListingForm from "./Listing-form";

export default function page() {
  return (
    <div id="main-content" className="flex-1 p-8">
      {/* <!-- Product Listing Creation Section --> */}
      <section id="create-listing" className="mb-12">
        <h2 className="mb-6 text-2xl text-neutral-900 dark:text-white">Create Product Listing</h2>

        <div className="p-6">
          <ListingForm />
        </div>
      </section>
    </div>
  );
}
