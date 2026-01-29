import { defineStore } from "pinia";
import { articleService } from "@/services/api/article/articleService";
import type { Article } from "@/types/article/article.type";

export const useArticlesStore = defineStore("articles", {
  state: () => ({
    articles: [] as Article[],
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
    async fetchArticles() {
      if (this.articles.length) return;

      this.loading = true;
      this.error = null;

      try {
        this.articles = await articleService.getArticles(10);
      } catch {
        this.error = "Error cargando artículos";
      } finally {
        this.loading = false;
      }
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
