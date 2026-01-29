<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  message: string
}>();
</script>

<template>
  <div
    v-if="props.message"
    class="
      bg-red-50 border-red-300 border-dotted border-2 text-red-700 
      rounded-lg p-9 flex justify-center items-center gap-2 shadow-sm
    "
  >
  <div class="flex flex-col items-center gap-1">
    <Icon icon="mdi:warning-circle" class="w-8 h-8 flex-shrink-0"/>
    <span class="font-medium">{{ props.message }}</span>
  </div>
  </div>
</template>
