<template>
    <div class="resources-container">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Biblioteca de Recursos Educacionais</h2>
    
      <div class="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Buscar por tópico, palavra-chave..." 
          class="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
        <select 
          v-model="resourceFilter" 
          class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option value="all">Todos os Tipos</option>
          <option value="video">Vídeo</option>
          <option value="text">Texto</option>
          <option value="quiz">Quiz</option>
          <option value="ebook">E-book</option>
        </select>
        <button 
          @click="applyFilters"
          class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Buscar
        </button>
      </div>
    
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Card de Recurso - Agora usando v-for -->
        <div 
          v-for="resource in filteredResources" 
          :key="resource.id"
          class="resource-card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
        >
          <img :src="resource.image" :alt="resource.title" class="w-full h-40 object-cover">
          <div class="p-4">
            <h4 class="font-semibold text-lg text-gray-800 mb-2">{{ resource.title }}</h4>
            <p class="text-gray-600 text-sm mb-3">{{ resource.description }}</p>
            <span 
              :class="typeClasses[resource.type]"
              class="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full"
            >
              {{ typeLabels[resource.type] }}
            </span>
            <button 
              :class="buttonClasses[resource.type]"
              class="block w-full mt-4 text-white py-2 rounded-lg transition-colors duration-200"
            >
              {{ buttonLabels[resource.type] }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Filtros
  const resourceFilter = ref('all')
  const searchQuery = ref('')
  
  // Dados dos recursos
  const resources = ref([
    {
      id: 1,
      title: 'Introdução à Inteligência Artificial',
      description: 'Vídeo aula explicativa sobre os conceitos básicos de IA.',
      type: 'video',
      image: 'https://placehold.co/400x200/edf2f7/4a5568?text=Video+Aula+IA'
    },
    {
      id: 2,
      title: 'Machine Learning Descomplicado',
      description: 'Artigo aprofundado sobre algoritmos de Machine Learning.',
      type: 'text',
      image: 'https://placehold.co/400x200/edf2f7/4a5568?text=Texto+ML'
    },
    {
      id: 3,
      title: 'Quiz Interativo de Python Básico',
      description: 'Teste seus conhecimentos em Python com este quiz rápido.',
      type: 'quiz',
      image: 'https://placehold.co/400x200/edf2f7/4a5568?text=Quiz+Python'
    },
    {
      id: 4,
      title: 'Guia Completo de Deep Learning',
      description: 'E-book com os fundamentos e aplicações de Deep Learning.',
      type: 'ebook',
      image: 'https://placehold.co/400x200/edf2f7/4a5568?text=E-book+DL'
    },
    {
      id: 5,
      title: 'Redes Neurais na Prática',
      description: 'Vídeo aula mostrando implementação de redes neurais.',
      type: 'video',
      image: 'https://placehold.co/400x200/edf2f7/4a5568?text=Redes+Neurais'
    },
    {
      id: 6,
      title: 'Fundamentos de Data Science',
      description: 'Texto introdutório sobre ciência de dados.',
      type: 'text',
      image: 'https://placehold.co/400x200/edf2f7/4a5568?text=Data+Science'
    }
  ])
  
  // Classes e labels para tipos
  const typeClasses = {
    video: 'bg-blue-100 text-blue-800',
    text: 'bg-green-100 text-green-800',
    quiz: 'bg-purple-100 text-purple-800',
    ebook: 'bg-yellow-100 text-yellow-800'
  }
  
  const typeLabels = {
    video: 'Vídeo',
    text: 'Texto',
    quiz: 'Quiz',
    ebook: 'E-book'
  }
  
  const buttonClasses = {
    video: 'bg-blue-500 hover:bg-blue-600',
    text: 'bg-green-500 hover:bg-green-600',
    quiz: 'bg-purple-500 hover:bg-purple-600',
    ebook: 'bg-yellow-500 hover:bg-yellow-600'
  }
  
  const buttonLabels = {
    video: 'Assistir',
    text: 'Ler',
    quiz: 'Iniciar Quiz',
    ebook: 'Baixar'
  }
  
  // Aplicar filtros
  const applyFilters = () => {
    // Apenas para reatividade - os filtros já são aplicados via computed
  }
  
  // Recursos filtrados
  const filteredResources = computed(() => {
    return resources.value.filter(resource => {
      // Filtro por tipo
      const typeMatch = resourceFilter.value === 'all' || resource.type === resourceFilter.value
      
      // Filtro por busca
      const searchMatch = 
        !searchQuery.value ||
        resource.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      return typeMatch && searchMatch
    })
  })
  </script>
  
  <style scoped>
  .resources-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .resource-card {
    transition: all 0.3s ease;
  }
  
  .resource-card:hover {
    transform: translateY(-5px);
  }
  </style>