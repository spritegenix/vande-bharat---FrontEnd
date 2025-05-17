import SkeletonCard from "@/components/common/SkeletonCard";
import CommunityCard from "@/components/community/CommunityCard";

const mockCommunities = [
  {
    id: "1",
    name: "Tech Minds",
    description: "A community for developers, designers, and builders.",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    membersCount: 1254,
  },
  {
    id: "2",
    name: "Art Connect",
    description: "Where creativity meets collaboration.",
    imageUrl: "https://i.pravatar.cc/150?img=15",
    membersCount: 768,
  },
  {
    id: "3",
    name: "Startup Garage",
    description: "Founders and dreamers exchanging ideas.",
    imageUrl: "https://i.pravatar.cc/150?img=25",
    membersCount: 3051,
  },
];

export default function CommunityListPage() {
  const loading = false; // simulate loading state

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <h1 className="mb-4 text-2xl font-bold">Communities You Might Like</h1>

      {loading ? (
        Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {mockCommunities.map((community, i) => (
            <CommunityCard
              key={i}
              id={community.id}
              name={community.name}
              description={community.description}
              imageUrl={community.imageUrl}
              membersCount={community.membersCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
