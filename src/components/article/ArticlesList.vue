<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useArticlesStore } from "@/stores/articles.store";
import { usePagination } from "@/composables/usePagination";
import SearchBar from "@/components/ui/SearchBar.vue";
import ErrorAlert from "@/components/ui/ErrorAlert.vue";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import LoadingOverlay from "@/components/ui/LoadingOverlay.vue";
import ArticleCard from "@/components/article/ArticleCard.vue";
import MainPagination from "../ui/MainPagination.vue";

const store = useArticlesStore();
const { currentPage, totalPages, itemsPerPage, totalItems } = storeToRefs(store);

const { localPage, changePage } = usePagination({
  externalPage:currentPage,
  totalPages: totalPages,
  onPageChange: (page) => store.loadArticles(page)
});

const rangeText = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value + 1;
  const end = Math.min(currentPage.value * itemsPerPage.value, totalItems.value);
  return `${start} - ${end} de ${totalItems.value} registros`;
});

onMounted(() => {
  store.loadArticles(store.currentPage);
})
</script>

<template>
  <div>
    <!-- Search bar -->
    <SearchBar 
      v-model="store.search" 
      @reset="store.resetSearch" 
      class="w-full"
    />    
    <p 
      v-if="store.search" 
      data-test="search-result-info"
      class="text-sm mt-2 mb-6 text-end">
       Artículos encontrados en esta página: <strong>{{ store.numberOfArticles }}</strong>
    </p>

    <MainPagination
      class="mx-auto lg::ms-auto lg:me-0 my-5"
      :current-page="localPage" 
      :total-pages="store.totalPages"
      :info-text="rangeText"
      @change="changePage"
    />
    <div class="relative min-h-[200px]">
      <!-- Error -->
      <ErrorAlert v-if="store.error" :message="store.error" />
      
      <!-- Loading -->
      <LoadingOverlay v-else-if="store.loading" class="absolute">
        <LoadingSpinner size="40" message="Cargando artículos..." />
      </LoadingOverlay>
  
      <!-- Grid de artículos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <template v-if="store.filteredArticles.length">
          <ArticleCard 
            v-for="article in store.filteredArticles" 
            :key="article.id"
            :article="article"
            @select="(article) => store.selectArticle(article)"
          />
        </template>
  
        <template v-if="!store.loading && !store.filteredArticles.length && !store.error">
           <div class="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
            <h3 class="text-2xl font-bold text-slate-800 mb-2">
              ¡Ups! No encontramos nada
            </h3>
            <p class="text-slate-500 max-w-md mb-8">
              No hay artículos que coincidan con "<span class="font-semibold text-blue-600">{{ store.search }}</span>". 
              Intenta con otras palabras clave o explora el catálogo completo.
            </p>
          </div>
        </template>
      </div>
      </div>
      <MainPagination
        class="mx-auto lg:ms-auto lg:me-0 my-5"
        :current-page="localPage" 
        :total-pages="store.totalPages"
        :info-text="rangeText"
        @change="changePage"
      />
  </div>
</template>
