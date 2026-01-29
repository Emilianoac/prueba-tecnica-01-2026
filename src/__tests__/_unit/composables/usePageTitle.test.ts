import { describe, it, expect, beforeEach } from "vitest";
import { ref, effectScope, nextTick } from "vue";
import { usePageTitle } from "@/composables/usePageTitle";

describe("usePageTitle", () => {
  beforeEach(() => {
    document.title = "Default";
  });

  it("debería establecer el título con un string estático", () => {
    const scope = effectScope();
    scope.run(() => {
      usePageTitle("Mis Artículos");
    });

    expect(document.title).toBe("Mis Artículos - Prueba Técnica");
    scope.stop();
  });

  it("debería actualizar el título reactivamente cuando cambia un Ref", async () => {
    const titleRef = ref("Título Inicial");
    const scope = effectScope();

    scope.run(() => {
      usePageTitle(titleRef);
    });

    expect(document.title).toBe("Título Inicial - Prueba Técnica");

    titleRef.value = "Nuevo Título";
    
    await nextTick();
    
    expect(document.title).toBe("Nuevo Título - Prueba Técnica");
    scope.stop();
  });

  it("debería dejar de actualizar el título después de que el scope se destruye", async () => {
    const titleRef = ref("Activo");
    const scope = effectScope();

    scope.run(() => {
      usePageTitle(titleRef);
    });

    scope.stop();

    titleRef.value = "Cambiado después de morir";
    await nextTick();

    expect(document.title).toBe("Activo - Prueba Técnica");
  });
});