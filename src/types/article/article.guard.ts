import type { Article } from "@/types/article/article.type";

export function isArticle(value: unknown): value is Article {
  if (typeof value !== "object" || value === null) return false;

  const a = value as Record<string, unknown>;

  return (
    typeof a.id === "number" &&
    typeof a.title === "string" &&
    typeof a.body === "string"
  );
}

export function isArticleArray(value: unknown): value is Article[] {
  return (
    Array.isArray(value) &&
    value.every(isArticle)
  );
}
