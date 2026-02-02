import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { useArticlesStore } from "@/stores/articles.store";
import ArticleHistory from "@/components/article/ArticleHistory.vue";

describe("ArticleHistory.vue", () => {
  const mockArticle = { id: 1, title: "Relacionado 1", body: "...", userId: 1 };

  describe("montaje", () => {
    it("deberia cargar el historial al montarse", () => {
      const store = useArticlesStore();
      const spy = vi.spyOn(store, "loadHistory");

      mount(ArticleHistory);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe("renderizado", () => {
    it("debería mostrar un mensaje si no hay historial", () => {
      const store = useArticlesStore();
      store.history = [];

      const wrapper = mount(ArticleHistory);
      const noHistoryMessage = wrapper.find('[data-test="no-history-message"]')

      expect(noHistoryMessage.exists()).toBe(true);
    });

    it("deberia renderizar la lista con el historial", () => {
      const store = useArticlesStore();
      store.history = [
        { id: "1", visitedAt: Date.now(), article: mockArticle },
      ];

      const wrapper = mount(ArticleHistory);
      const historyList = wrapper.find('[data-test="history-list"]');

      expect(historyList.findAll("li")).toHaveLength(1);
    });
  });

  describe("interacciones", () => {
    it("deberia cerrar el historial al clicker el boton cerrar", async () => {
      const store = useArticlesStore();
      const spy = vi.spyOn(store, "setShowHistory");

      const wrapper = mount(ArticleHistory);

      const closeHistoryBtn = wrapper.find('[data-test="close-history"]');
      await closeHistoryBtn.trigger("click");

      expect(spy).toHaveBeenCalledWith(false);
    });
  });
});