// utils/hashtag.util.ts
export function extractHashtags(text: string): string[] {
  const regex = /#(\w+)/g;
  const hashtags = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    hashtags.push(match[1]); // remove the #
  }

  return hashtags;
}
