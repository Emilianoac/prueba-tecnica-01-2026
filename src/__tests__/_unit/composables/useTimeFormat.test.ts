import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useTimeFormat } from "@/composables/useTimeFormat";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

describe("useTimeFormat", () => {

  describe("formatTimeAgo", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    it("deberia formater correctamente los minutos transcurridos", () => {
      let formatTimeAgo!: (ts: number) => string;

      mount(
        defineComponent({
          setup() {
            ({ formatTimeAgo } = useTimeFormat());
            return () => null;
          }
        })
      );

      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      const result = formatTimeAgo(fiveMinutesAgo);

      expect(result).toContain("5");
      expect(result.toLowerCase()).toContain("min");
    });

    it("debería actualiza el resultado cuando avanza el tiempo", () => {
      let formatTimeAgo!: (ts: number) => string;

      mount(
        defineComponent({
          setup() {
            ({ formatTimeAgo } = useTimeFormat());
            return () => null;
          }
        })
      );

      const timestamp = Date.now();

      vi.advanceTimersByTime(2 * 60 * 1000);

      const result = formatTimeAgo(timestamp);
      expect(result).toContain("2");
      expect(result.toLowerCase()).toContain("min");
    });

    it("limpia el intervalo al desmontarse", () => {
      const clearSpy = vi.spyOn(window, "clearInterval");

      const wrapper = mount(
        defineComponent({
          setup() {
            useTimeFormat();
            return () => null;
          }
        })
      );

      wrapper.unmount();

      expect(clearSpy).toHaveBeenCalled();
    });
  });

  describe("formatDate", () => {

    it("deberia formatear una fecha usando las opciones por defecto", () => {
      let formatDate!: (ts: number, options?: Intl.DateTimeFormatOptions) => string;

      mount(
        defineComponent({
          setup() {
            ({ formatDate } = useTimeFormat("es"));
            return () => null;
          }
        })
      );

      const timestamp = new Date("2024-02-24T15:30:00Z").getTime();
      const result = formatDate(timestamp);

      expect(result).toContain("24");
      expect(result.toLowerCase()).toContain("feb");
      expect(result).toContain("2024");
    });

    it("deberia permitir sobrescribir las opciones de formato", () => {
      let formatDate!: (ts: number, options?: Intl.DateTimeFormatOptions) => string;

      mount(
        defineComponent({
          setup() {
            ({ formatDate } = useTimeFormat("es"));
            return () => null;
          }
        })
      );

      const timestamp = new Date("2024-02-24T15:30:00Z").getTime();
      const result = formatDate(timestamp, {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      });

      expect(result).toContain("24");
      expect(result).toMatch(/\d{2}/);
    });
  });
});
