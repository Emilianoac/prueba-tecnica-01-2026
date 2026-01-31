import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import App from "@/App.vue";
import { useArticlesStore } from "@/stores/articles.store";

describe("App.vue - Integración", () => {
  
  it("debería cargar los artículos al iniciar y mostrar la lista", async () => {
    const store = useArticlesStore();
    const wrapper = mount(App);

    await flushPromises();

    expect(store.articles.length).toBeGreaterThan(0);
    expect(store.loading).toBe(false);

    expect(wrapper.findComponent({ name: "ArticlesView" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "ArticleDetailView" }).exists()).toBe(false);
  });

  it("debería cambiar de vista cuando el store tiene un artículo seleccionado", async () => {
    const wrapper = mount(App);
    const store = useArticlesStore();

    store.selectedArticle = { id: 1, title: "Test", body: "..." };
    
    await nextTick();

    expect(wrapper.findComponent({ name: "ArticlesView" }).exists()).toBe(false);
    expect(wrapper.findComponent({ name: "ArticleDetailView" }).exists()).toBe(true);
  });
});