import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useArticlesStore } from "@/stores/articles.store";
import { localStorageService } from "@/services/local-storage/localStorageService";
import { articleService } from "@/services/api/article/articleService";

vi.mock("@/services/local-storage/localStorageService", () => ({
  localStorageService: {
    load: vi.fn(),
    save: vi.fn(),
  },
}));

vi.mock("@/services/api/article/articleService", () => ({
  articleService: {
    getArticles: vi.fn(),
  }
}));

const mockArticles = [
  { id: 1, title: "Artículo test 1", body: "Body 1" },
  { id: 2, title: "Artículo test 2", body: "Body 2" },
  { id: 3, title: "Artículo test 3", body: "Body 3" },
];

describe("Store de artículos", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe("Cargar Artículos", () => {
    it("obtiene los artículos correctamente", async () => {
      (articleService.getArticles as any).mockResolvedValue(mockArticles);
  
      const store = useArticlesStore();
      await store.loadArticles(1);
  
      expect(articleService.getArticles).toHaveBeenCalled();
      expect(store.articles).toHaveLength(3);
      expect(store.loading).toBe(false);
      expect(store.error).toBe(null);
    });
  
    it("deberia maneja los errores al obtener los artículos", async () => {
      (articleService.getArticles as any).mockRejectedValue(new Error("Error de API"));
  
      const store = useArticlesStore();
      await store.loadArticles(1);
  
      expect(store.articles).toHaveLength(0);
      expect(store.loading).toBe(false);
      expect(store.error).toBe("Error cargando artículos");
    });

    it("debería evitar volver a obtener los artículos si ya fueron cargados", async () => {
      (articleService.getArticles as any).mockResolvedValue(mockArticles);

      const store = useArticlesStore();
      await store.loadArticles(1);

      await store.loadArticles(1);
      expect(articleService.getArticles).toHaveBeenCalledTimes(1);
    });
  });

  describe("Selección de Artículo", () => {
    it("deberia seleccionar un artículo", () => {
      const store = useArticlesStore();
  
      store.selectArticle(mockArticles[0]!);
      expect(store.selectedArticle).toEqual(mockArticles[0]);
    });
  
    it("deberia limpiar el artículo seleccionado", () => {
      const store = useArticlesStore();
  
      store.selectArticle(mockArticles[0]!);
      store.clearSelectedArticle();
  
      expect(store.selectedArticle).toBe(null);
    });
  });

  describe("Busqueda de Artículos", () => {
    it("deberia retornar el número de artículos", async () => {
      (articleService.getArticles as any).mockResolvedValue(mockArticles);
  
      const store = useArticlesStore();
      await store.loadArticles(1);
  
      expect(store.numberOfArticles).toBe(3);
    });
    
    it("deberia filtrar los artículos por búsqueda", async () => {
      (articleService.getArticles as any).mockResolvedValue(mockArticles);
  
      const store = useArticlesStore();
      await store.loadArticles(1);
  
      store.setSearch("test");
      expect(store.filteredArticles).toHaveLength(3);
  
      store.setSearch("test 3");
      expect(store.filteredArticles).toHaveLength(1);
      expect(store.filteredArticles[0]!.title).toBe("Artículo test 3");
  
      store.setSearch("test 4");
      expect(store.filteredArticles).toHaveLength(0);
  
      store.resetSearch();
      expect(store.filteredArticles).toHaveLength(3);
    });
  });

  describe("Historial de Artículos", () => {
    it("deberia cargar el historial desde localStorage si está vacío", () => {
      const storedHistory = [
        {
          id: "article-1",
          article: { id: 1, title: "Artículo test", body: "Body" },
          visitedAt: 1700000000000,
        },
      ];

      (localStorageService.load as any).mockReturnValue(storedHistory);

      const store = useArticlesStore();
      store.loadHistory();

      expect(localStorageService.load).toHaveBeenCalledWith("articles-history");
      expect(store.history).toEqual(storedHistory);
    });

    it("no deberia cargar el historial si ya existe en el store", () => {
      const store = useArticlesStore();
      store.history = [
        {
          id: "article-1",
          article: { id: 1, title: "Artículo test", body: "Body" },
          visitedAt: 1700000000000,
        },
      ];

      store.loadHistory();

      expect(localStorageService.load).not.toHaveBeenCalled();
    });

    it("deberia agregar un artículo al historial", () => {
      const store = useArticlesStore();

      store.addToHistory(mockArticles[0]!);

      expect(store.history).toHaveLength(1);
      expect(store.history[0]!.article.id).toBe(1);
    });

    it("deberia limitar el historial a 10 elementos", () => {
      const store = useArticlesStore();
  
      for (let i = 0; i < 12; i++) {
        store.addToHistory({ id: i, title: `Artículo ${i}`, body: "" } as any);
      }
  
      expect(store.history).toHaveLength(10);
    });
  });
});
