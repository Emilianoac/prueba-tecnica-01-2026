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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <main>
    <MainHeader/>
    <div class="container mx-auto min-h-[80vh] px-4 py-8">
      <transition name="fade-slide" mode="out-in" @after-enter="scrollToTop">
        <ArticlesView v-if="!store.selectedArticle" key="list"/>
        <ArticleDetailView v-else :key="store.selectedArticle.id"/>
      </transition>
    </div>
    <MainFooter/>
  </main>
</template>

<style>
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
</style>