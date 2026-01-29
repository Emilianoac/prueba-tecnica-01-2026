import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ArticleRelatedList from "@/components/article/ArticleRelatedList.vue";
import ArticleCard from "@/components/article/ArticleCard.vue";

describe("ArticleRelatedList.vue", () => {
  const mockArticles = [
    { id: 1, title: "Relacionado 1", body: "...", userId: 1 },
    { id: 2, title: "Relacionado 2", body: "...", userId: 1 }
  ];

  it("debe pasar la prop variant='list' a todos los hijos", () => {
    const wrapper = shallowMount(ArticleRelatedList, {
      props: { articles: mockArticles }
    });

    const cards = wrapper.findAllComponents(ArticleCard);
    
    cards.forEach(card => {
      expect(card.props("variant")).toBe("list");
    });
  });

  it("debe emitir 'select' con el objeto article cuando una card es seleccionada", async () => {
    const wrapper = shallowMount(ArticleRelatedList, {
      props: { articles: mockArticles }
    });

    const firstCard = wrapper.findComponent(ArticleCard);
    
    firstCard.vm.$emit("select", mockArticles[0]);

    const emitted = wrapper.emitted("select");
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]?.[0]).toEqual(mockArticles[0]);
  });
});