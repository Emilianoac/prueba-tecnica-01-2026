export interface Article {
  id: number;
  title: string;
  body: string
}

export interface ArticleHistoryItem {
  id: string
  article: Article
  visitedAt: number
}