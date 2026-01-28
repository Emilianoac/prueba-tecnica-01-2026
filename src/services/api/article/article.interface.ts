import type { Article } from "@/types/article/article.type";

export interface ArticleService {
  getArticles(_limit?: number): Promise<Article[]>
}