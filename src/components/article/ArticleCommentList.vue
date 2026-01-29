<script lang="ts" setup>
import { Icon } from "@iconify/vue";

defineProps<{
  comments: { 
    author: string, 
    text: string, 
    id: number, 
    date: string 
  }[]
}>();
</script>

<template>
  <div v-for="comment in comments" :key="comment.id"
    class="bg-white border border-slate-100 p-6 rounded-lg shadow-sm mb-3">
    <div class="flex items-center gap-4">
      <Icon icon="mdi:user-circle" class="w-9 h-9 text-slate-300" />
      <div class="w-full">
        <div class="flex justify-between items-center mb-3">
          <p class="text-sm font-semibold">{{ comment.author }}</p>
          <span class="text-xs text-slate-600">{{ comment.date }}</span>
        </div>
        <p class="text-slate-700 text-sm">{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
