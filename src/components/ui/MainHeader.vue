<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useArticlesStore } from "@/stores/articles.store";

const store = useArticlesStore();
</script>

<template>
  <header class="bg-white border border-slate-100 sticky top-0 z-[999]">
    <div class="container mx-auto flex justify-between items-center px-4 py-3">
      <span class="font-bold text-xl">
        <span class="text-blue-500">Prueba</span> 
        <span class="font-semibold ms-1">técnica</span> 
      </span>

      <div class="flex gap-3">
        <button 
          @click="store.setShowHistory(true)"
          class=" flex items-center gap-1 group hover:opacity-90">
          <Icon class="text-blue-500 group-hover:text-blue-700 transition-colors" icon="mdi:history" width="20" height="20" /> 
          <span class="text-sm">Historial de visitas</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="postcss" scoped></style>
