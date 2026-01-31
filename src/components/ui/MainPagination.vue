<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  currentPage: number; 
  totalPages: number;
  infoText: string;
}>();

defineEmits<{ (e: "change", page: number): void }>();
</script>

<template>
  <nav class="flex flex-col items-center w-fit">
    <div class="inline-flex shadow-sm rounded-lg" role="group">
      <button 
        @click="$emit('change', currentPage - 1)" 
        :disabled="currentPage === 1"
        class="
          inline-flex items-center justify-center w-10 h-10 
          text-slate-500 bg-white border border-slate-300 rounded-l-lg 
          hover:bg-slate-50  transition-colors
          disabled:cursor-not-allowed disabled:opacity-45
        "
      >
        <Icon icon="mdi:chevron-left" class="w-5 h-5" />
      </button>

      <div class="inline-flex items-center justify-center px-4 h-10 text-sm font-medium text-slate-700 bg-white border-t border-b border-slate-300 min-w-[100px]">
        <span class="text-blue-500 font-bold mr-1">{{ currentPage }}</span> 
        <span class="text-slate-400 mx-1">de</span> 
        <span>{{ totalPages }}</span>
      </div>

      <button 
        @click="$emit('change', currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="
          inline-flex items-center justify-center w-10 h-10 
          text-slate-500 bg-white border border-slate-300 rounded-r-lg 
          hover:bg-slate-50 transition-colors
          disabled:cursor-not-allowed disabled:opacity-45
        "
      >
        <Icon icon="mdi:chevron-right" class="w-5 h-5" />
      </button>
    </div>
    <span class="block text-[11px] uppercase tracking-wider font-medium mt-2 text-slate-500 opacity-80">
      {{ infoText }}
    </span>
  </nav>
</template>