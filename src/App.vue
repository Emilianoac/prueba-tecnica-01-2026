<script setup lang="ts">
import { onMounted } from "vue";
import { useArticlesStore } from "@/stores/articles.store";

import MainHeader from "@/components/ui/MainHeader.vue";
import MainFooter from "@/components/ui/MainFooter.vue";
import ArticlesView from "@/views/ArticlesView.vue";
import ArticleDetailView from "@/views/ArticleDetailView.vue";

const store = useArticlesStore();

onMounted(() => {
  store.fetchArticles();
})
</script>

<template>
  <main>
    <MainHeader/>
    <div class="container mx-auto min-h-[80vh] px-4 py-8">
      <ArticlesView v-if="!store.selectedArticle"/>
      <ArticleDetailView v-else/>
    </div>
    <MainFooter/>
  </main>
</template>

<style>
</style>