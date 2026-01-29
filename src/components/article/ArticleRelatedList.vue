<script lang="ts" setup>
import type { Article } from "@/types/article/article.type";
import ArticleCard from "@/components/article/ArticleCard.vue";

defineProps<{
  articles: Article[];
}>();

const emit = defineEmits<{
  (e: "select", article: Article): void;
}>();
</script>

<template>
  <ul class="space-y-3">
    <li v-for="article in articles" :key="article.id">
      <ArticleCard 
        :article="article"
        variant="list"
        @select="emit('select', $event)"
      />
    </li>
  </ul>
</template>

<style lang="postcss" scoped>
</style>