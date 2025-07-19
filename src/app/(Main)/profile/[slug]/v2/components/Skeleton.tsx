import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Box from "@/components/elements/Box";

export default function SimpleSectionSkeleton() {
  return (
    <Box>
      <div className="w-full max-w-5xl mx-auto px-5 py-5 sm:px-6">
        <Card className="rounded-lg border bg-muted p-1 px-32 py-5 dark:border-border dark:bg-card">
          <Skeleton className="h-5 w-full rounded-md" />
        </Card>
      </div>
    </Box>
  );
}


