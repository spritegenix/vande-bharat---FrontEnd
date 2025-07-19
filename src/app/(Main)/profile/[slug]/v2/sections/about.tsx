import Box from "@/components/elements/Box";
import { Card, CardContent } from "@/components/ui/card";

// Dummy array of cards (replace with real user data or mapped components)
const aboutCards = [
  {
    id: "card-1",
    title: "Personal Info",
    content:
      "Dr. Priya Sharma is a cultural historian specializing in temple architecture with 15+ years of experience,Focused on South Indian temple architecture and traditional building techniques.",
  },
  
  
];

export default function AboutSection() {
  return (
    <Box className="dark:bg-card">
      <div
        className={`flex w-full flex-wrap justify-center gap-5  ${
          aboutCards.length === 1 ? "items-center" : "md:justify-between"
        }`}
      >
        {aboutCards.map((card) => (
          <Card
            key={card.id}
            className="w-full max-w-full flex-1 rounded-lg  bg-gray-100  dark:bg-card"
          >
            <CardContent className="space-y-4 p-4">
              <h3 className="text-lg font-semibold text-black dark:text-foreground">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-muted-foreground">
                {card.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Box>
  );
}
