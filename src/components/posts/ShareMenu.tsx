import { Button } from "../ui/button";
import { Share2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ShareMenuProps {
  postUrl: string;
  className?: string;
  title?: string;
  text?: string;
}

export default function ShareMenu({
  postUrl,
  className,
  title = "Check this out!",
  text = "Take a look at this post on Vande Bharat!",
}: ShareMenuProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text,
    url: postUrl || window.location.href,
  };

  const handleWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await handleCopyLink();
      }
    } catch (err) {
      // User cancelled the share or other error occurred
      if (err) {
        console.error("Web share failed:", err);
        // Fallback to copy link
        await handleCopyLink();
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      // Last resort fallback
      fallbackCopyToClipboard(shareData.url);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Fallback copy failed:", err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleWebShare}
      className={cn("flex items-center gap-1 transition-colors hover:text-blue-600", className)}
      aria-label="Share this post"
    >
      {copied ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
      <span className="hidden md:flex">{copied ? "Copied!" : "Share"}</span>
    </Button>
  );
}
