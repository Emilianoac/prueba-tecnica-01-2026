<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import fakeComments from "@/constants/fakeComments";
import { usePageTitle } from "@/composables/usePageTitle";
import { useArticlesStore } from "@/stores/articles.store";
import ArticleCommentList from "@/components/article/ArticleCommentList.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import ArticleRelatedList from "@/components/article/ArticleRelatedList.vue";

const store = useArticlesStore();

const dynamicTitle = computed(() => store.selectedArticle?.title);
usePageTitle(dynamicTitle);
</script>

<template>
  <div v-if="store.selectedArticle">
    <!-- Botón volver -->
    <BaseButton 
      text="Volver a Artículos" 
      variant="text"
      left-icon="mdi:arrow-left" 
      class="mb-4"
      @click="store.clearSelectedArticle()"
    />

    <div class="grid grid-cols-1 lg:grid-cols-[2.6fr_1fr] gap-6">
      <!-- Detalle Artículo -->
      <div class="self-start relative lg:sticky top-auto lg:top-16">
        <section class="bg-white border border-slate-100 p-6 rounded-lg shadow-sm">
          
          <!-- Título -->
          <h1 class="font-bold text-xl md:text-2xl mb-2 first-letter:uppercase">{{ store.selectedArticle.title }}</h1>
          
          <!-- Meta info -->
          <div class="flex flex-wrap gap-4 text-sm text-slate-500 my-4">
            <span><Icon icon="mdi:account" class="inline w-4 h-4 mr-1" /> Juan Pérez</span>
            <span><Icon icon="mdi:calendar" class="inline w-4 h-4 mr-1" /> 28 Ene 2026</span>
          </div>
    
          <hr class="border-slate-200 my-4">
    
          <!-- Cuerpo del artículo -->
          <p class="text-slate-700 leading-relaxed first-letter:uppercase">{{ store.selectedArticle.body }}</p>
    
          <!-- Botones de interacción -->
          <div class="flex gap-3 mt-6 justify-end">
            <button class="flex items-center gap-2 px-3 py-2 text-sm text-blue-500 hover:text-blue-700 hover:bg-slate-100 rounded-md transition-colors">
              <Icon icon="mdi:twitter" width="18" height="18" /> Twitter
            </button>
            <button class="flex items-center gap-2 px-3 py-2 text-sm text-blue-500 hover:text-blue-700 hover:bg-slate-100 rounded-md transition-colors">
              <Icon icon="mdi:linkedin" width="18" height="18" /> LinkedIn
            </button>
          </div>
        </section>
      </div>

      <!-- Artículos Relacinados -->
      <aside>
        <h2 class="text-lg font-semibold mb-4">
          <Icon icon="mdi-book" class="inline w-5 h-5 mr-1 text-blue-500"/> Artículos relacionados
        </h2>
        <ArticleRelatedList 
          :articles="store.relatedArticles" 
          @select="(article) => store.selectArticle(article)" 
        />
      </aside>
    </div>

    <!-- Comentarios -->
    <section class="mt-6">
      <h2 class="text-lg font-semibold mb-4">
        <Icon icon="mdi-message-text" class="inline w-5 h-5 mr-1 text-blue-500"/> Comentarios ({{ fakeComments.length }})
      </h2>
      <ArticleCommentList :comments="fakeComments"/>
    </section>
  </div>
</template>

<style lang="postcss" scoped>
</style>

