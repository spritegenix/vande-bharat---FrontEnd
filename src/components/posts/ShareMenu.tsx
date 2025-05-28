import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

export default function ShareMenu({ postUrl }: { postUrl: string }) {
  const shareData = {
    title: "Check this out!",
    text: "Take a look at this post on Vande Bharat!",
    url: postUrl || window.location.href,
  };

  const handleWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Web Share not supported in this browser.");
      }
    } catch (err) {
      console.error("Web share failed:", err);
    }
  };

  return (
    <Button
      variant={"ghost"}
      onClick={handleWebShare}
      className="flex items-center gap-1 hover:text-blue-600"
    >
      <Share2 size={16} />
      <span className="hidden md:flex">Share</span>
    </Button>
  );
}
