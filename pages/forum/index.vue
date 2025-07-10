<script setup>
// Lógica para buscar tópicos pode ser adicionada aqui
const { data: topics } = await useFetch('/api/topics')
</script>

<template>
  <div class="forum-container">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800">Fórum de Discussão</h2>
      <NuxtLink to="/forum/new" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
        <i class="fas fa-plus mr-2"></i> Novo Tópico
      </NuxtLink>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
      <div class="flex flex-col md:flex-row justify-between mb-6">
        <div class="relative w-full md:w-1/2 mb-4 md:mb-0">
          <input 
            type="text" 
            placeholder="Buscar tópicos..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
          <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        <select
          class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option value="">Filtrar por categoria</option>
          <option value="doubt">Dúvidas</option>
          <option value="discussion">Discussões</option>
          <option value="resource">Recursos</option>
          <option value="announcement">Anúncios</option>
        </select>
      </div>

      <div class="divide-y divide-gray-200">
        <!-- Tópico 1 -->
        <div class="py-4">
          <div class="flex justify-between items-start mb-2">
            <NuxtLink to="/forum/1" class="text-lg font-semibold text-blue-600 hover:underline">
              Dúvida sobre Redes Neurais Convolucionais
            </NuxtLink>
            <span class="text-sm text-gray-500">Há 30 min</span>
          </div>
          <div class="flex items-center text-sm text-gray-600 mb-2">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="João"
              class="w-6 h-6 rounded-full mr-2">
            <span>por João Silva</span>
            <span class="mx-2">•</span>
            <span><i class="fas fa-comments mr-1"></i> 5 respostas</span>
            <span class="mx-2">•</span>
            <span><i class="fas fa-eye mr-1"></i> 42 visualizações</span>
          </div>
          <p class="text-gray-600 text-sm">
            Alguém pode me ajudar a entender a arquitetura de uma CNN para classificação de imagens? 
            Estou com dificuldades na camada de pooling.
          </p>
          <div class="flex flex-wrap mt-3">
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">IA</span>
            <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">Redes Neurais</span>
            <span class="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">Deep Learning</span>
          </div>
        </div>

        <!-- Tópico 2 -->
        <div class="py-4">
          <div class="flex justify-between items-start mb-2">
            <NuxtLink to="/forum/2" class="text-lg font-semibold text-blue-600 hover:underline">
              Discussão: O Futuro da IA na Educação
            </NuxtLink>
            <span class="text-sm text-gray-500">Há 2 horas</span>
          </div>
          <div class="flex items-center text-sm text-gray-600 mb-2">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Ana"
              class="w-6 h-6 rounded-full mr-2">
            <span>por Professora Ana</span>
            <span class="mx-2">•</span>
            <span><i class="fas fa-comments mr-1"></i> 12 respostas</span>
            <span class="mx-2">•</span>
            <span><i class="fas fa-eye mr-1"></i> 78 visualizações</span>
          </div>
          <p class="text-gray-600 text-sm">
            Compartilhe suas opiniões sobre como a IA pode revolucionar o ensino e o aprendizado. 
            Quais são as principais oportunidades e desafios?
          </p>
          <div class="flex flex-wrap mt-3">
            <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">Discussão</span>
            <span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">Educação</span>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">Futuro</span>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center">
        <span class="text-sm text-gray-600">Mostrando 1-3 de 15 tópicos</span>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">Anterior</button>
          <button class="px-3 py-1 border border-gray-300 rounded-lg bg-blue-600 text-white">1</button>
          <button class="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">2</button>
          <button class="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">3</button>
          <button class="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">Próximo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forum-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Estilos para os links de tópicos */
a {
  transition: color 0.2s ease;
}

/* Efeito hover nos cards de tópico */
.py-4:hover {
  background-color: #f9fafb;
}

/* Estilo para o select */
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em;
}
</style>