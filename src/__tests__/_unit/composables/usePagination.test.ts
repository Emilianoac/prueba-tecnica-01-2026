import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref, nextTick } from "vue";
import { usePagination } from "@/composables/usePagination"; 

describe("usePagination Composable", () => {
  beforeEach(() => {
    vi.useFakeTimers(); 
  });

  it("debería inicializar localPage con el valor de externalPage", () => {
    const externalPage = ref(1);
    const totalPages = ref(10);
    const onPageChange = vi.fn();

    const { localPage } = usePagination({ externalPage, totalPages, onPageChange });

    expect(localPage.value).toBe(1);
  });

  it("debería actualizar localPage inmediatamente pero retrasar onPageChange", () => {
    const externalPage = ref(1);
    const totalPages = ref(10);
    const onPageChange = vi.fn();

    const { localPage, changePage } = usePagination({ externalPage, totalPages, onPageChange });

    changePage(2);

    expect(localPage.value).toBe(2);
    expect(onPageChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(400);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("debería aplicar debounce si se cambia de página rápidamente", () => {
    const externalPage = ref(1);
    const totalPages = ref(10);
    const onPageChange = vi.fn();

    const { changePage } = usePagination({ externalPage, totalPages, onPageChange });

    changePage(2);
    vi.advanceTimersByTime(200);
    changePage(3);
    vi.advanceTimersByTime(200);
    changePage(4);

    expect(onPageChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(400);
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("no debería cambiar la página si está fuera de los límites", () => {
    const externalPage = ref(1);
    const totalPages = ref(5);
    const onPageChange = vi.fn();

    const { localPage, changePage } = usePagination({ externalPage, totalPages, onPageChange });

    changePage(0);
    expect(localPage.value).toBe(1);

    changePage(6);
    expect(localPage.value).toBe(1);

    vi.advanceTimersByTime(400);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("debería sincronizar localPage cuando externalPage cambia desde fuera", async () => {
    const externalPage = ref(1);
    const totalPages = ref(10);
    const onPageChange = vi.fn();

    const { localPage } = usePagination({ externalPage, totalPages, onPageChange });

    externalPage.value = 5;
    
    await nextTick();

    expect(localPage.value).toBe(5);
  });
});