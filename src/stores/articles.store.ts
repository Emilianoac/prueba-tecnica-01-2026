import { defineStore } from "pinia";
import { articleService } from "@/services/api/article/articleService";
import type { Article } from "@/types/article/article.type";

export const useArticlesStore = defineStore("articles", {
  state: () => ({
    articles: [] as Article[],

    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 10,

    selectedArticle: null as Article | null,
    search: "",

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
    },

    clearSelectedArticle() {
      this.selectedArticle = null;
    }
  }
});
