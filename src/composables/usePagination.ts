import { ref, watch, type Ref } from 'vue';

interface UsePaginationInterface {
  externalPage: Ref<number>,
  totalPages: Ref<number>,
  onPageChange: (page: number) => void
}

export function usePagination({externalPage, totalPages, onPageChange}: UsePaginationInterface) {
  const localPage = ref(externalPage.value);
  let timeout: ReturnType<typeof setTimeout> | null = null;

  watch(externalPage, (newVal) => {
    localPage.value = newVal;
  });

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages.value) return;
    
    localPage.value = newPage; 

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      onPageChange(newPage);
    }, 400);
  };

  return { localPage, changePage };
}

