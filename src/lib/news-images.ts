/** Cover + in-article images, deduplicated, cover first. */
export function getNewsImages(news: {
  coverImage: string | null;
  images: string[];
}): string[] {
  const merged = [
    ...(news.coverImage ? [news.coverImage] : []),
    ...news.images,
  ];
  return [...new Set(merged.filter(Boolean))];
}
