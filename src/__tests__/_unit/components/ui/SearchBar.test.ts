import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import SearchBar from "@/components/ui/SearchBar.vue";

describe("SearchBar.vue", () => {
  it("debería actualizar el modelValue cuando el usuario escribe", async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: "",
      },
    });

    const input = wrapper.find('[data-test="search-input"]');
    const userInput = "busqueda usuario";
    await input.setValue(userInput);

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([userInput]);
  });

  it("no debería renderizar el botón de reset cuando el input está vacío", () => {
    const wrapper = mount(SearchBar, { 
      props: { modelValue: "" } 
    });

    expect(wrapper.find('[data-test="reset-button"]').exists()).toBe(false);
  });

  it("debería renderizar el botón de reset cuando el input tiene texto", () => {
    const wrapper = mount(SearchBar, { 
      props: { modelValue: "Some" } 
    });

    expect(wrapper.find('[data-test="reset-button"]').exists()).toBe(true);
  });

  it("debería emitir 'reset' al hacer clic en el botón de limpiar", async () => {
    const wrapper = mount(SearchBar, { props: { modelValue: "texto" } });
    
    const resetBtn = wrapper.find('[data-test="reset-button"]');
    await resetBtn.trigger("click");
    
    expect(wrapper.emitted("reset")).toBeTruthy();
  });
});