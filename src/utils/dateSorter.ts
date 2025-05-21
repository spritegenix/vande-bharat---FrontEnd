export const formatPublishedDate = (publishedAt: string) => {
    const date = new Date(publishedAt); // Convert the publishedAt string to a Date object
    const now = new Date(); // Get the current date
    const diffInMilliseconds = now.getTime() - date.getTime(); // Get the difference in milliseconds
  
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000); // Convert milliseconds to seconds
    const diffInMinutes = Math.floor(diffInSeconds / 60); // Convert seconds to minutes
    const diffInHours = Math.floor(diffInMinutes / 60); // Convert minutes to hours

  
    // If it's less than 24 hours ago, show "time ago" format
    if (diffInHours < 24) {
      if (diffInHours < 1) {
        if (diffInMinutes < 1) {
          return 'Just now';
        }
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
      }
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
  
    // If it's more than 24 hours ago, show the full date
    const formattedDate = date.toLocaleDateString(); // Format the date to a human-readable string
    return formattedDate;
  };
  