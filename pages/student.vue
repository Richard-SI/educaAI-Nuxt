<template>
    <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Bem-vindo(a), Maria!</h2>
  
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <!-- Cartão de Progresso -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-blue-200">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Seu Progresso Geral</h3>
        <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div class="bg-blue-600 h-4 rounded-full" style="width: 75%;"></div>
        </div>
        <p class="text-gray-600 text-sm mb-3">Você completou 75% do seu currículo personalizado.</p>
      </div>
  
      <!-- Recomendações Personalizadas -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-green-200">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Próximas Recomendações</h3>
        <ul class="space-y-3">
          <li class="flex items-center text-gray-700">
            <span class="mr-2 text-green-500">✓</span> Aula: Fundamentos de IA
            <span class="ml-auto text-sm text-gray-500">Video</span>
          </li>
          <li class="flex items-center text-gray-700">
            <span class="mr-2 text-green-500">✓</span> Quiz: Python para Iniciantes
            <span class="ml-auto text-sm text-gray-500">Interativo</span>
          </li>
          <li class="flex items-center text-gray-700">
            <span class="mr-2 text-green-500">✓</span> Texto: História da Computação
            <span class="ml-auto text-sm text-gray-500">Leitura</span>
          </li>
        </ul>
        <button class="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">Ver todas</button>
      </div>
  
      <!-- Área de Perguntas e Respostas com IA -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Assistente de IA</h3>
        <div class="border border-gray-300 rounded-lg h-40 overflow-y-auto p-4 text-sm bg-gray-50 mb-4">
          <p class="text-gray-700 mb-2"><span class="font-bold text-blue-600">Você:</span> O que é Machine Learning?</p>
          <p class="text-gray-500 mb-2"><span class="font-bold text-green-600">IA:</span> Machine Learning é um subcampo da inteligência artificial que permite que os sistemas aprendam com dados, identifiquem padrões e tomem decisões com o mínimo de intervenção humana.</p>
          <p class="text-gray-700 mb-2"><span class="font-bold text-blue-600">Você:</span> Pode me dar um exemplo?</p>
          <p class="text-gray-500"><span class="font-bold text-green-600">IA:</span> Claro! Sistemas de recomendação em plataformas de streaming (como Netflix) usam ML para sugerir filmes baseados no seu histórico.</p>
        </div>
        <div class="flex">
          <input type="text" placeholder="Pergunte algo à IA..." class="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
          <button class="bg-blue-600 text-white px-5 rounded-r-lg hover:bg-blue-700 transition-colors duration-200">Enviar</button>
        </div>
      </div>
    </div>
  </template>