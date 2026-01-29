import { watchEffect, isRef, onScopeDispose, type Ref } from "vue";

export function usePageTitle(title: string | Ref<string | undefined>) {
  
  const stop = watchEffect(() => {
    const titleValue = isRef(title) ? title.value : title;
    if (titleValue) {
      document.title = `${titleValue} - Prueba Técnica`;
    }
  });

  onScopeDispose(() => {
    stop(); 
  });
}