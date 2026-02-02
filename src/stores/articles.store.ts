import { defineStore } from "pinia";
import { articleService } from "@/services/api/article/articleService";
import { localStorageService } from "@/services/local-storage/localStorageService";
import type { Article, ArticleHistoryItem } from "@/types/article/article.type";

export const useArticlesStore = defineStore("articles", {
  state: () => ({
    articles: [] as Article[],

    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 10,

    selectedArticle: null as Article | null,
    search: "",

    history: [] as ArticleHistoryItem[],
    showHistory: false,

    loading: false,
    error: null as string | null
  }),

  getters: {
    filteredArticles: (state) => {
      const search = state.search.trim().toLowerCase();
      
      if (!search) return state.articles;
      
      return state.articles.filter(article =>
        article.title.toLowerCase().includes(search)
      );
    },

    numberOfArticles(): number {
      return this.filteredArticles.length;
    },

    relatedArticles: (state) => {
      if (!state.selectedArticle) return [];
    
      return state.articles.filter(article => article.id !== state.selectedArticle?.id).slice(0, 3);
    },
  },

  actions: {
    async loadArticles(page: number) {
      const hasValidCache = this.currentPage === page && this.articles.length > 0;
      const isFetching = this.loading && this.currentPage === page;

      if (hasValidCache || isFetching) return;

      this.loading = true;
      this.error = null;
      const start = (page - 1) * this.itemsPerPage;

      try {
        const data = await articleService.getArticles(start, this.itemsPerPage);
        this.articles = data;
        this.currentPage = page
      } catch (e) {
        this.error = "Error cargando artículos";
      } finally {
        this.loading = false;
      }
    },

    setArticles(articles: Article[]) {
      this.articles = articles
    },

    setSearch(value: string) {
      this.search = value;
    },

    resetSearch() {
      this.search = "";
    },

    selectArticle(article: Article) {
      this.selectedArticle = article;
      this.addToHistory(article);
    },

    clearSelectedArticle() {
      this.selectedArticle = null;
    },

    loadHistory() {
      if (!this.history.length) {
        this.history = localStorageService.load<ArticleHistoryItem[]>('articles-history') ?? []
      }
    },

    setShowHistory(status: boolean) {
      this.showHistory = status;
    },

    addToHistory(article: Article) {
      const KEY = "articles-history";
      const MAX = 10;

      const now = Date.now();

      const entry = {
        article,
        visitedAt: now,
        id: `article-${now}-${article.id}`
      }

      this.history = [entry,...this.history].slice(0, MAX);

      localStorageService.save(KEY, this.history);
    }
  }
});
