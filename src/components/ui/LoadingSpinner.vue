<script setup lang="ts">

const props = defineProps<{
  message?: string
}>();

</script>

<template>
  <div data-test="loading-spinner" class="flex flex-col justify-center items-center py-10">
    <div class="w-[30px] h-[30px] border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <span class="text-sm mt-2">{{ message ? message : 'Cargando...' }}</span>
  </div>
</template>
