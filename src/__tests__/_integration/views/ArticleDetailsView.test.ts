import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ArticleDetail from "@/views/ArticleDetailView.vue";
import { useArticlesStore } from "@/stores/articles.store";

describe("ArticleDetail - Integración", () => {
  const mockArticle = {
    id: 1,
    title: "Artículo 1",
    body: "Body 1",
    userId: 1
  };

  it("no debería renderizar nada si no hay un artículo seleccionado", () => {
    const store = useArticlesStore();
    store.selectedArticle = null; 

    const wrapper = mount(ArticleDetail);

    expect(wrapper.find('div').exists()).toBe(false);
  });

  it("debería mostrar la información del artículo cuando está seleccionado", async () => {
    const store = useArticlesStore();
    store.selectedArticle = mockArticle;

    const wrapper = mount(ArticleDetail);

    expect(wrapper.find('h1').text()).toContain(mockArticle.title);
    expect(wrapper.find('p').text()).toContain(mockArticle.body);
    
    expect(wrapper.text()).toContain("Comentarios");
  });

  it("debería limpiar el artículo seleccionado al hacer clic en 'Volver'", async () => {
    const store = useArticlesStore();
    store.selectedArticle = mockArticle;
    
    const wrapper = mount(ArticleDetail);
    
    const spy = vi.spyOn(store, "clearSelectedArticle");

    const backButton = wrapper.findComponent({ name: "BaseButton" });
    await backButton.trigger("click");

    expect(spy).toHaveBeenCalled();
  });
});