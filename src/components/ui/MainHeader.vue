<script lang="ts" setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <header class="bg-white border border-slate-100 sticky top-0 z-[999]">
    <div class="container mx-auto flex justify-between items-center px-4 py-3">
      <span class="font-bold text-xl">
        <span class="text-blue-500">Prueba</span> 
        <span class="font-semibold ms-1">técnica</span> 
      </span>

      <div class="flex gap-3">
        <a href="https://github.com/Emilianoac/prueba-tecnica-01-2026" class="text-blue-500 hover:text-blue-700 transition-colors">
          <Icon icon="mdi:github" width="20" height="20" />
        </a>
      </div>
    </div>
  </header>
</template>

<style lang="postcss" scoped></style>
