import axios from "axios";
import type { ArticleService } from "./article.interface";
import { isArticleArray } from "@/types/article/article.guard";
import { API_CONFIG } from "@/config/api.config";

function createArticleService(): ArticleService {
  return {
    async getArticles(_start ,_limit) {
      const response = await axios.get(`${API_CONFIG.baseUrl}/posts`, {
        params: {
          _start,
          _limit
        }
      });

      const data = response.data;

      if (!isArticleArray(data)) {
        throw new Error("Invalid response");
      }

      return data;
    }
  };
}

export const articleService = createArticleService();
