<script lang="ts" setup>
  import { usePageTitle } from "@/composables/usePageTitle";
  import ArticlesList from "@/components/article/ArticlesList.vue";
  import BrandPet from "@/components/illustrations/BrandPet.vue";

  usePageTitle("Lista de Artículos");
</script>

<template>
  <div>
    <!-- Hero -->
    <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 mb-8">
      <div>
        <h1 class="text-3xl md:text-6xl font-extrabold !leading-[1.3] mb-6">
          Explora nuestros <span class="text-blue-500">Artículos</span> y descubre 
          <span class="text-blue-500">contenido relevante</span>
        </h1>
        <p class="text-xl text-slate-600">
          Encuentra los últimos artículos, consejos y tutoriales para mantenerte al día.
        </p>
      </div>
      <BrandPet class="max-w-[260px] md:max-w-[360px]"/>
    </div>
    <ArticlesList/>
  </div>
</template>

<style lang="css" scoped></style>
