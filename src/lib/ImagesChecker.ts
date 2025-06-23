export const ImageChecker = (imageUrl:string | undefined) => {
    if(!imageUrl || imageUrl === "null" || imageUrl === "undefined") {
        return "/images/profile/profileplaceholder.jpg";
    }
    if (imageUrl.includes("amazonaws")) {
        return imageUrl;
    }
     return "/images/profile/profileplaceholder.jpg";
}