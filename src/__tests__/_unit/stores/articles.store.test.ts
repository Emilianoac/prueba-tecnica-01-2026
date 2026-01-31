import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useArticlesStore } from "@/stores/articles.store";

vi.mock("@/services/api/article/articleService", () => ({
  articleService: {
    getArticles: vi.fn()
  }
}));

import { articleService } from "@/services/api/article/articleService";

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

  it("deberia poder seleccionar y limpiar un artículo", async () => {
    const store = useArticlesStore();

    store.selectArticle(mockArticles[0]!);
    expect(store.selectedArticle).toEqual(mockArticles[0]);

    store.clearSelectedArticle();
    expect(store.selectedArticle).toBe(null);
  });

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

  it("debería evitar volver a obtener los artículos si ya fueron cargados", async () => {
    (articleService.getArticles as any).mockResolvedValue(mockArticles);

    const store = useArticlesStore();
    await store.loadArticles(1);

    await store.loadArticles(1);
    expect(articleService.getArticles).toHaveBeenCalledTimes(1);
  });
});
