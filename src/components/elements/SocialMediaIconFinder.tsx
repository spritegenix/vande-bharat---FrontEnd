import React from "react";
import { FaFacebook, FaInstagram, FaLink, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

interface SocialMediaIconFinderProps {
  url: string;
  className: string;
}

const SocialMediaIconFinder: React.FC<SocialMediaIconFinderProps> = ({ url, className }: any) => {
  // Function to detect the platform from the URL
  const detectPlatform = (url: string): string => {
    if (url.includes("facebook.com")) return "facebook";
    if (url.includes("twitter.com")) return "twitter";
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("linkedin.com")) return "linkedin";
    if (url.includes("youtube.com")) return "youtube";
    return "generic"; // Default platform if none match
  };

  // Function to return the respective icon
  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <FaFacebook className={`text-blue-600 ${className}`} />;
      case "twitter":
        return <FaSquareXTwitter className={`text-zinc-800 ${className}`} />;
      case "instagram":
        return <FaInstagram className={`text-pink-500 ${className}`} />;
      case "linkedin":
        return <FaLinkedin className={`text-blue-700 ${className}`} />;
      case "youtube":
        return <FaYoutube className={`text-red-600 ${className}`} />;
      default:
        return <FaLink className={`text-gray-500 ${className}`} />;
    }
  };

  // Detect platform and get the corresponding icon
  const platform = detectPlatform(url);
  return getIcon(platform);
};

export default SocialMediaIconFinder;

//  <SocialMediaIconFinder url={link} />
