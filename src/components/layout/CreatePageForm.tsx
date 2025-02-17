import React from "react";

export default function CreatePageForm() {
  return (
    <div className="relative w-96 rounded-lg bg-white p-4">
      <h2 className="mb-2 text-lg font-semibold">Create Page</h2>
      <p className="mb-4 text-sm text-zinc-500">
        Create a new page to share your content with your followers.
      </p>
      <input
        type="text"
        placeholder="Page Name"
        className="mb-4 w-full rounded-md border border-zinc-300 p-2"
      />
    </div>
  );
}
