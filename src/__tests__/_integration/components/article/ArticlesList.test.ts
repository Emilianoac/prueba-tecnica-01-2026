import { nextTick } from "vue";
import { describe, it, expect, afterEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { http, HttpResponse, delay } from "msw";
import { server } from "@/__tests__/mocks/server";
import ArticleList from "@/components/article/ArticlesList.vue";
import { useArticlesStore } from "@/stores/articles.store";

const mockArticles = [
  { id: 1, title: "Artículo 1", body: "Body 1", userId: 1 },
  { id: 2, title: "Artículo 2", body: "Body 2", userId: 1 },
  { id: 3, title: "Artículo 3", body: "Body 3", userId: 1 }
];

describe("ArticlesList - Integración", () => {
  afterEach(() => {
    server.resetHandlers();
  });

  describe("Estado de Carga", () => {
    it("debería mostrar el spinner mientras se obtienen los datos", async () => {
      server.use(
        http.get("*/posts", async () => {
          await delay("infinite");
          return HttpResponse.json([]);
        })
      );

      const wrapper = mount(ArticleList);
      const store = useArticlesStore();

      store.fetchArticles();

      await nextTick();

      const spinner = wrapper.find('[data-test="loading-spinner"]');

      expect(spinner.exists()).toBe(true);
      expect(spinner.text()).toBe("Cargando artículos...");
    });
  });

  describe("Éxito y Filtrado", () => {
    it("debería renderizar la lista completa al cargar", async () => {
      server.use(http.get("*/posts", () => HttpResponse.json(mockArticles)));
      
      const wrapper = mount(ArticleList);
      const store = useArticlesStore();
      
      await store.fetchArticles();
      await flushPromises();

      const cards = wrapper.findAll('[data-test="article-card"]');
      expect(cards).toHaveLength(3);
      expect(wrapper.text()).toContain("3 Artículos encontrados");
    });

    it("debería filtrar artículos dinámicamente mediante la SearchBar", async () => {
      server.use(http.get("*/posts", () => HttpResponse.json(mockArticles)));
      
      const wrapper = mount(ArticleList);
      const store = useArticlesStore();
      await store.fetchArticles();
      await flushPromises();

      const searchInput = wrapper.find('[data-test="search-input"]');
      await searchInput.setValue("Artículo 1");

      const cards = wrapper.findAll('[data-test="article-card"]');
      expect(cards).toHaveLength(1);
      expect(cards[0]!.text()).toContain("Artículo 1");
    });
  });

  describe("Casos Especiales", () => {
    it("debería mostrar el mensaje de 'No encontramos nada' si el filtro no coincide", async () => {      
      const wrapper = mount(ArticleList);
      const store = useArticlesStore();
      await store.fetchArticles();
      await flushPromises();

      await wrapper.find('[data-test="search-input"]').setValue("Busqueda sin resultado");

      expect(wrapper.text()).toContain("¡Ups! No encontramos nada");
      expect(wrapper.findAll('[data-test="article-card"]')).toHaveLength(0);
    });

    it("debería mostrar la alerta de error si el servidor falla", async () => {
      server.use(http.get("*/posts", () => new HttpResponse(null, { status: 500 })));
      
      const wrapper = mount(ArticleList);
      const store = useArticlesStore();
      await store.fetchArticles();
      await flushPromises();

      expect(wrapper.findComponent({ name: "ErrorAlert" }).exists()).toBe(true);
    });
  });

  it("debería llamar a la acción de seleccionar artículo cuando se pulsa el botón de la tarjeta", async () => {
    server.use(http.get("*/posts", () => HttpResponse.json(mockArticles)));
    
    const wrapper = mount(ArticleList);
    const store = useArticlesStore();
    
    await store.fetchArticles();
    await flushPromises();

    const spy = vi.spyOn(store, "selectArticle");

    const firstCard = wrapper.findComponent({ name: "ArticleCard" });
    
    await firstCard.vm.$emit("select", mockArticles[0]);

    expect(spy).toHaveBeenCalledWith(mockArticles[0]);
    expect(store.selectedArticle).toEqual(mockArticles[0]);
});
});