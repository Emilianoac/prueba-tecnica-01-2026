<script setup lang="ts">
import { onMounted } from "vue";
import { useArticlesStore } from "@/stores/articles.store";
import ArticlesView from "@/views/ArticlesView.vue";
import ArticleDetailView from "@/views/ArticleDetailView.vue";

const store = useArticlesStore();

onMounted(() => {
  store.fetchArticles();
})
</script>

<template>
  <main>
    <div class="container mx-auto min-h-[80vh] px-4 py-8">
      <ArticlesView v-if="!store.selectedArticle"/>
      <ArticleDetailView v-else/>
    </div>
  </main>
</template>

<style>
</style>