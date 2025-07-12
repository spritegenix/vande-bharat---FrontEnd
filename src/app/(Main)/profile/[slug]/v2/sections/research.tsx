import Box from "@/components/elements/Box";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Star, Quote } from "lucide-react";

export default function ResearchPublications() {
  const publications = [
    {
      title: "Architectural Evolution of South Indian Temples",
      journal: "Journal of Cultural Heritage Studies",
      year: "2025",
      summary:
        "Comprehensive analysis of architectural patterns and construction techniques used in South Indian temple complexes spanning over 1000 years of history...",
      downloads: 234,
      citations: 18,
      rating: 4.8,
    },
    {
      title: "Mathematical Principles in Ancient Architecture",
      journal: "Heritage Research Quarterly",
      year: "2024",
      summary:
        "Exploration of geometric and mathematical concepts embedded in historical temple designs, revealing sophisticated understanding of proportions...",
      downloads: 156,
      citations: 12,
      rating: 4.6,
    },
    {
      title: "Stone Carving Techniques of Medieval India",
      journal: "Archaeological Review",
      year: "2024",
      summary:
        "Detailed study of stone carving methodologies and tools used in medieval Indian temple construction...",
      downloads: 89,
      citations: 8,
      rating: 4.5,
    },
  ];

  return (
    <>
      <Box>
        <Card className="mb-5 rounded-lg border border-gray-200 bg-white dark:border-border dark:bg-card">
          <CardContent className="space-y-3 p-5">
            {publications.map((pub, index) => (
              <div key={index} className="pt-2 first:pt-0">
                <div className="flex gap-3">
                  {/* PDF icon or placeholder */}
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-200 text-sm font-semibold text-gray-600 dark:bg-muted dark:text-muted-foreground">
                    PDF
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-foreground">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-muted-foreground">
                      {pub.journal} • {pub.year}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-muted-foreground">
                      {pub.summary}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-6 text-sm text-gray-500 dark:text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" /> {pub.downloads} downloads
                      </div>
                      <div className="flex items-center gap-1">
                        <Quote className="h-4 w-4" /> {pub.citations} citations
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-gray-500 dark:fill-muted-foreground" />{" "}
                        {pub.rating} rating
                      </div>
                      <Separator></Separator>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
