export const ImageChecker = (imageUrl: string | undefined) => {
  if (!imageUrl || imageUrl === "null" || imageUrl === "undefined") {
    return "/images/profile/profileplaceholder.jpg";
  }
  if (imageUrl.includes("amazonaws") || imageUrl.includes("img.clerk.com")) {
    return imageUrl;
  }
  return "/images/profile/profileplaceholder.jpg";
};
