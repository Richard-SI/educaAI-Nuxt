<template>
    <div
      v-if="mounted"
      class="assistant-bot"
      @click="toggleChat"
      role="button"
      aria-label="Abrir assistente"
    >
      <img
        src="/educaAI.png"
        alt="Mascote EducaAI"
        class="assistant-img"
        @error="onError"
        decoding="async"
        loading="lazy"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const mounted = ref(false)
  
  function toggleChat() {
    window.dispatchEvent(new CustomEvent("assistant-open"))
  }
  
  function onError(e) {
    const img = e.target
    img.style.opacity = "0.5"
    img.style.filter = "grayscale(1)"
  }
  
  onMounted(() => {
    mounted.value = true
  })
  </script>
  
  <style scoped>
  .assistant-bot {
    position: fixed;
    right: 1.25rem;
    bottom: 1.5rem;
    z-index: 9999;
    width: 5.2rem;
    height: 5.2rem;
    cursor: pointer;
  }
  
  .assistant-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: float 3s ease-in-out infinite;
    transition: transform .2s ease;
  }
  
  @keyframes float {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-8px); }
    100% { transform: translateY(0); }
  }
  </style>
  