import React from "react";

export default function CommunityBanner() {
  return (
    <div
      id="community-banner"
      className="overflow-hidden border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
    >
      {/* Cover Image */}
      <div className="relative h-40 w-full bg-neutral-200 dark:bg-neutral-800 sm:h-52 md:h-64">
        <img
          src="/images/profile/coverplaceholder.jpg"
          alt="Community Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-3 right-3">
          <button className="rounded bg-white bg-opacity-80 px-3 py-1 text-sm text-neutral-700 hover:bg-opacity-100 dark:bg-black/50 dark:text-white dark:hover:bg-black/70">
            📷 Edit Cover
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 pb-6 sm:px-6">
        <div className="mb-4 mt-12 flex flex-col space-y-4 sm:flex-row sm:items-end sm:justify-between sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4">
            {/* Info */}
            <div className="pb-2">
              <h1 className="mb-1 text-xl font-semibold text-neutral-900 dark:text-white sm:text-2xl">
                Ancient Architecture Society
              </h1>
              <p className="mb-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
                Preserving and celebrating India's architectural heritage
              </p>
              <div className="flex flex-wrap items-center gap-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                <span>👥 12.5k members</span>
                <span>👁️ Public</span>
                <span>📅 Created March 2020</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-0 sm:space-x-3">
            <button className="w-full rounded-lg bg-neutral-900 px-6 py-2 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 sm:w-auto">
              ➕ Join Community
            </button>
            <button className="w-full rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 sm:w-auto">
              🔗 Share
            </button>
            <button className="w-full rounded-lg border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 sm:w-auto">
              ⋯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
