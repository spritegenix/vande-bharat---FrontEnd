"use client";

export default function TabStatsGrid({ user }: any) {
  const stats = [
    { label: "Posts", value: user?.postsCount || "0" },
    { label: "Followers", value: user?.followersCount || "0" },
    { label: "Following", value: user?.followingCount || "0" },
    { label: "Communities", value: user?.communitiesCount || "0" },
  ];

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
      {stats.map((item) => (
        <div key={item.label} className="text-center">
          <p className="text-lg font-medium text-black dark:text-foreground">
            {item.value}
          </p>
          <p className="text-xs text-gray-500 dark:text-muted-foreground">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
