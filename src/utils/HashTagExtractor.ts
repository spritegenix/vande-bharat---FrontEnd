export function extractHashtags(text: string): string[] {
  const regex = /#(\w+)/g;
  const matches = [...text.matchAll(regex)];
  return matches.map((m) => m[1]);
}
