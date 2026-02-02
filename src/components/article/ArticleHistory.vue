<script lang="ts" setup>
import { onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useArticlesStore } from "@/stores/articles.store";
import { useTimeFormat } from "@/composables/useTimeFormat";
import ArticleCard from "@/components/article/ArticleCard.vue";

const store = useArticlesStore();
const { formatTimeAgo, formatDate } = useTimeFormat();

onMounted(() => {
  store.loadHistory();
});
</script>

<template>
  <aside 
    class="bg-white p-4 fixed top-0 right-0 h-screen z-[99999] w-full max-w-[300px] shadow-xl border transition-transform duration-300 ease-in-out"
    :class="store.showHistory ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-semibold flex items-center">
        <Icon icon="mdi-history" class="inline w-5 h-5 mr-1 text-blue-500"/> 
        Historial de visitas
      </h3>
      <button 
        @click="store.setShowHistory(false)"
        title="Cerrar historial"
        data-test="close-history"> 
        <Icon icon="mdi-close" class="inline w-4 h-4 mr-1 text-slate-500 hover:text-slate-600"/> 
      </button>
    </div>

    <ul 
      v-if="store.history.length" 
      data-test="history-list"
      class="overflow-y-auto h-[calc(100vh-80px)] p-2">
      <li 
        v-for="historyItem in store.history" 
        :key="`historty-item-${historyItem.id}`" 
        class="mb-4 border-b pb-4 border-slate-100">
          <div>
            <span 
              :title="formatDate(historyItem.visitedAt)"
              class="text-xs mb-2 block text-slate-400">
              {{formatTimeAgo(historyItem.visitedAt) }}
            </span>
            <ArticleCard 
              :article="historyItem.article" 
              variant="list"
              @select="(article) => store.selectArticle(article)"
            />
          </div>
      </li>
    </ul>
    <p 
      v-else 
      data-test="no-history-message"
      class="mt-20 text-center text-sm text-slate-400 leading-relaxed">
        <span class="block font-medium text-slate-500">
          Todavía no has visto ningún artículo.
        </span>
        <span class="block mt-1">
          Tu historial aparecerá aquí.
        </span>
    </p>
  </aside>
</template>

<style lang="postcss" scoped>
</style>
