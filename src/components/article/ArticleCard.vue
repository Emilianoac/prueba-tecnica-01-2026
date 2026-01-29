<script lang="ts" setup>
import type { Article } from "@/types/article/article.type";
import { Icon } from "@iconify/vue";

interface Props {
  article: Article
  variant?: "grid" | "list";
}

withDefaults(defineProps<Props>(), {
  variant: "grid"
});

const emit = defineEmits<{
  (e: "select", article: Article): void;
}>();
</script>

<template>
  <article 
    role="button"
    data-test="article-card"
    tabindex="0"
    :class="['article-card', `variant-${variant}`]"
    @click="emit('select', article)"
    @keydown.enter="emit('select', article)"
  >
    <div class="card-content">
      <div class="text-wrapper">
        <h3 class="card-title">{{ article.title }}</h3>
        <p class="card-body">{{ article.body }}</p>
        
        <div class="action-text">
          <span>Leer más</span>
        </div>
      </div>

      <div class="icon-wrapper">
        <Icon icon="mdi:arrow-right" class="arrow-icon" />
      </div>
    </div>
    <div class="active-bar"></div>
  </article>
</template>

<style lang="postcss" scoped>
.article-card {
  @apply relative bg-white border border-slate-100 rounded-lg shadow-sm cursor-pointer 
         overflow-hidden transition-all duration-300 ease-in-out;
  outline: none;

  &:hover, &:focus {
    @apply border-blue-400 shadow-md -translate-y-1;
  }

  &:focus {
    @apply ring-4 ring-blue-500/20;
  }

  &.variant-grid { @apply p-6; }
  &.variant-list { @apply p-4; }
}

.card-content {
  @apply flex justify-between items-start gap-4;
}

.card-title {
  @apply font-semibold text-slate-800 first-letter:uppercase transition-colors duration-300;

  .variant-grid & { @apply  min-h-12 line-clamp-2; }
  .variant-list & { @apply text-sm line-clamp-1; }

  .article-card:hover &, .article-card:focus & {
    @apply text-blue-600;
  }
}

.card-body {
  @apply text-slate-600 first-letter:uppercase mt-2;

  .variant-grid & { @apply text-sm my-4 line-clamp-2; }
  .variant-list & { @apply text-xs line-clamp-2; }
}

.action-text {
  @apply text-blue-500 text-sm font-medium mt-2 transition-opacity duration-300;
}

.icon-wrapper {
  @apply transition-all duration-300 opacity-0 -translate-x-2;

  .article-card:hover &, .article-card:focus & {
    @apply opacity-100 translate-x-0;
  }
}

.arrow-icon {
  @apply text-blue-500;
  
  .variant-grid & { @apply w-6 h-6; }
  .variant-list & { @apply w-5 h-5; }
}

.active-bar {
  @apply absolute bottom-0 left-0 bg-blue-500 transition-all duration-500 w-0 rounded-b-lg;

  .variant-grid & { @apply h-1; }
  .variant-list & { @apply h-0.5; }

  .article-card:hover &, .article-card:focus & {
    @apply w-full;
  }
}
</style>