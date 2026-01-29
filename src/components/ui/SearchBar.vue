<script setup lang="ts">
import { Icon } from "@iconify/vue";
const modelValue = defineModel<string>();

const emit = defineEmits<{
  (e: "reset"): void
}>();
</script>

<template>
  <div class="w-full">
    <div class="relative">
      <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
      <input
        data-test="search-input"
        type="search"
        v-model="modelValue"
        placeholder="Filtrar artículos"
        class="
          w-full border border-slate-300 rounded-md  py-2 px-10 text-lg
          focus:outline-none focus:ring-2 focus:ring-blue-300
        "
      />
      <button 
        v-if="modelValue"
        data-test="reset-button"
        title="Limpiar filtro"
        class="absolute right-2 top-1/2 -translate-y-1/2"
        @click="emit('reset')">
        <Icon icon="mdi:close" class="text-blue-500 h-5 w-5"/>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
