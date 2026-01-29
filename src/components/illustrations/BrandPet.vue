<script lang="ts" setup>
import brandPet from "@/assets/images/brand-pet.png";
</script>

<template>
  <svg 
    viewBox="0 0 500 500" 
    xmlns="http://www.w3.org/2000/svg" 
    class="w-full h-auto mx-auto drop-shadow-2xl"
  >
    <defs>
      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:#2563eb;stop-opacity:0.8" />
      </linearGradient>
      
      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <circle class="shape float-slow" cx="100" cy="150" r="30" fill="url(#blueGrad)" />
    <rect class="shape float-fast" x="380" y="100" width="40" height="40" rx="8" fill="#93c5fd" opacity="0.5" />
    
    <path class="shape float-medium accent-glow" d="M420,150 l5,5 l5,-5 l-5,-5 z" fill="#fbbf24" />
    <circle class="shape float-slow" cx="80" cy="380" r="8" fill="#f59e0b" />

    <image 
      :href="brandPet" 
      x="100" 
      y="100" 
      width="300" 
      height="300" 
      class="main-pet"
    />

    <circle class="shape float-fast accent-glow" cx="400" cy="320" r="12" fill="#ec4899" />
    <path class="shape float-reverse" d="M350,150 Q370,130 390,150" stroke="#db2777" stroke-width="3" fill="none" stroke-linecap="round" />
    
    <path class="shape float-reverse" d="M50,350 Q80,320 110,350 T170,350" stroke="#60a5fa" stroke-width="4" fill="none" opacity="0.6" />
    <circle class="shape float-medium" cx="420" cy="350" r="15" fill="#3b82f6" opacity="0.8" />
    
    <circle class="shape float-fast" cx="160" cy="140" r="5" fill="#fcd34d" />
  </svg>
</template>

<style lang="postcss" scoped>
.main-pet {
  animation: mainFloat 4s ease-in-out infinite;
  transform-origin: center;
}

.shape {
  transform-box: fill-box;
  transform-origin: center;
}

.accent-glow {
  filter: url(#neonGlow);
}

.float-slow { animation: float 7s ease-in-out infinite; }
.float-medium { animation: float 5s ease-in-out infinite; }
.float-fast { animation: float 3s ease-in-out infinite; }
.float-reverse { animation: float 6s ease-in-out infinite reverse; }

@keyframes mainFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-15px) scale(1.02); }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  50% {
    transform: translateY(-25px) rotate(15deg) scale(1.1);
  }
}
</style>