import type { Article } from "@/types/article/article.type";

export interface ArticleService {
  getArticles(_start?: number, _limit?: number,): Promise<Article[]>
}