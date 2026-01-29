<script setup lang="ts">
import { useArticlesStore } from "@/stores/articles.store";

const store = useArticlesStore();
</script>

<template>
  <div v-if="store.selectedArticle">
    {{ store.selectedArticle }}
  </div>
</template>

<style lang="postcss" scoped>
</style>
