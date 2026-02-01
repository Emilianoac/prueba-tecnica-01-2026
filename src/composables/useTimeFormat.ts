import { ref, onMounted, onUnmounted } from "vue";

export function useTimeFormat(locale = "es") {
  const now = ref(Date.now());
  let timer: number | undefined;

  function formatTimeAgo(timestamp: number) {
    const diff = timestamp - now.value;
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    const minutes = Math.round(diff / 60000);
    if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");

    const hours = Math.round(diff / 3600000);
    if (Math.abs(hours) < 24) return rtf.format(hours, "hour");

    const days = Math.round(diff / 86400000);
    if (Math.abs(days) < 30) return rtf.format(days, "day");

    const months = Math.round(diff / 2592000000);
    if (Math.abs(months) < 12) return rtf.format(months, "month");

    const years = Math.round(diff / 31536000000);
    return rtf.format(years, "year");
  }

  function formatDate(
    timestamp: number,
    options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }
  ) {
    return new Date(timestamp).toLocaleDateString(locale, options);
  }

  onMounted(() => {
    timer = window.setInterval(() => {
      now.value = Date.now();
    }, 60_000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  })

  return {
    formatTimeAgo,
    formatDate
  }
}
