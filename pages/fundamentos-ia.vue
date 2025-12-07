<template>
    <div class="max-w-5xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        🎓 Fundamentos de Inteligência Artificial
      </h1>
  
      <p class="text-gray-600 mb-6">
        Aprenda os conceitos básicos de IA, Machine Learning e como tudo funciona na prática.
      </p>
  
      <!-- Vídeo -->
      <div class="relative w-full overflow-hidden rounded-xl shadow-lg">
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/2ePf9rue1Ao"
          title="Fundamentos de Inteligência Artificial"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

      </div>
  
      <!-- Botões -->
      <div class="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          @click="finalizarAula"
        >
          ✅ Concluir Aula
        </button>
  
        <button
          class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          @click="voltar"
        >
          ⬅ Voltar ao Dashboard
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  const voltar = () => {
    navigateTo('/student')
  }
  
  const finalizarAula = () => {
    alert('Aula concluída com sucesso! 🚀')
    navigateTo('/student')
  }
  </script>
  