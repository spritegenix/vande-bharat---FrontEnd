import Box from "@/components/elements/Box";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BriefcaseBusiness, MapPin, Calendar } from "lucide-react";

export default function AboutSection() {
  return (
    <>
      <Box>
        <div className="grid gap-5 px-5 py-5 sm:grid-cols-1 md:grid-cols-2">
          {/* Personal Information */}
          <Card className="rounded-lg border border-gray-300 bg-gray-100 dark:border-border dark:bg-card">
            <CardContent className="space-y-4 p-3">
              <h3 className="text-lg font-semibold text-black dark:text-foreground">
                Personal Information
              </h3>
              <p className="text-left text-sm text-gray-600 dark:text-muted-foreground">
                Dr. Priya Sharma is a renowned cultural historian specializing in temple
                architecture and ancient Indian construction techniques. With over 15 years of
                research experience, she has documented architectural marvels across South India.
              </p>
              <ul className="space-y-2 text-left text-sm text-gray-600 dark:text-muted-foreground">
                <li className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> PhD in Cultural History, Delhi University
                </li>
                <li className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" /> Senior Researcher at Heritage Foundation
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Mumbai, India
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Joined March 2023
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Specializations & Achievements */}
          {/* <Card className="rounded-xl border border-gray-300 bg-gray-100 dark:border-border dark:bg-card">
            <CardContent className="space-y-4 p-3">
              <h3 className="text-lg font-semibold text-black dark:text-foreground">
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Temple Architecture",
                  "Cultural History",
                  "Ancient Construction",
                  "South Indian Heritage",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted-foreground/10 px-3 py-1 text-xs text-gray-600 dark:text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h4 className="text-md mb-2 mt-4 font-medium text-gray-400 dark:text-muted">
                Recent Achievements
              </h4>
              <ul className="list-inside list-disc space-y-1 text-left text-sm text-gray-600 dark:text-muted-foreground">
                <li>Published 12 research papers in 2024</li>
                <li>Heritage Conservation Award 2024</li>
                <li>Featured speaker at Cultural Heritage Summit</li>
                <li>Lead researcher on UNESCO project</li>
              </ul>
            </CardContent>
          </Card> */}


        </div>
      </Box>
    </>
  );
}
