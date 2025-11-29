<template>
    <!-- Não exibe mais mascote — apenas área clicável -->
    <div
      class="assistant-bot"
      @click="onClick"
      role="button"
      aria-label="Abrir assistente"
    >
      <!-- Área clicável invisível para não duplicar o mascote -->
      <div class="click-area"></div>
    </div>
  </template>
  
  <script setup>
  function onClick() {
    window?.dispatchEvent?.(new CustomEvent('assistant-toggle'))
    console.log('assistant-toggle dispatched')
  }
  </script>
  
  <style scoped>
  .assistant-bot {
    position: fixed;
    right: 1.25rem;
    bottom: 1.5rem;
    z-index: 9998; /* abaixo do mascote principal */
    width: 110px;
    height: 110px;
    cursor: pointer;
  }
  
  /* Área invisível apenas para capturar clique */
  .click-area {
    width: 100%;
    height: 100%;
    background: transparent;
  }
  </style>
  