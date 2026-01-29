<script lang="ts" setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";

interface Props {
  text?: string;
  leftIcon?: string;
  rightIcon?: string;
  variant?: "primary" | "text";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary" 
});

const variantClasses = computed(() => {
  return {
    primary: "px-6 py-2 text-blue-500 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600",
    text: "p-0 text-blue-500 border-transparent hover:underline hover:text-blue-600"
  }[props.variant];
});
</script>

<template>
  <button 
    type="button"
    class="
      flex justify-center items-center gap-2 rounded-full 
      text-sm font-semibold transition-all duration-300 active:scale-95 outline-none focus-visible:ring-2 
      focus-visible:ring-blue-400
    "
    :class="variantClasses"
  >
    <component v-if="leftIcon" :is="Icon" :icon="leftIcon" width="20" height="20" />
    <span><slot>{{ text }}</slot></span>
    <component v-if="rightIcon" :is="Icon" :icon="rightIcon" width="20" height="20" />
  </button>
</template>