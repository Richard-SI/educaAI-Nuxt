<template>
    <div class="adjust-content">
      <NuxtLink :to="`/teacher/students/${student.id}`" class="flex items-center text-blue-600 mb-6">
        <i class="fas fa-arrow-left mr-2"></i> Voltar para os detalhes do aluno
      </NuxtLink>
  
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Ajustar Conteúdo para {{ student.name }}</h1>
            <p class="text-gray-600">Personalize o plano de estudos deste aluno</p>
          </div>
          <div class="mt-4 md:mt-0">
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Progresso atual: {{ student.progress }}%
            </span>
          </div>
        </div>
  
        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="border rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-4">Conteúdo Atual</h3>
            <ul class="space-y-2">
              <li v-for="item in currentContent" :key="item.id" class="flex items-center">
                <input type="checkbox" v-model="item.completed" class="mr-2">
                <span :class="{'line-through text-gray-400': item.completed}">{{ item.name }}</span>
              </li>
            </ul>
          </div>
  
          <div class="border rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-4">Adicionar Conteúdo</h3>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Selecione o conteúdo</label>
              <select 
                v-model="selectedContent"
                class="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="" disabled selected>Selecione um módulo</option>
                <option 
                  v-for="content in availableContent" 
                  :key="content.id"
                  :value="content"
                >
                  {{ content.name }} ({{ content.difficulty }})
                </option>
              </select>
            </div>
            <button 
              @click="addContent"
              class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Adicionar ao Plano
            </button>
          </div>
  
          <div class="border rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-4">Recomendações de IA</h3>
            <div class="space-y-3">
              <div 
                v-for="recommendation in recommendations"
                :key="recommendation.id"
                class="p-3 bg-gray-50 rounded-lg"
              >
                <div class="flex justify-between">
                  <span class="font-medium">{{ recommendation.name }}</span>
                  <button 
                    @click="addRecommendation(recommendation)"
                    class="text-green-500 hover:text-green-700"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ recommendation.reason }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Dificuldades Identificadas</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div 
              v-for="difficulty in difficulties"
              :key="difficulty.topic"
              class="p-4 border rounded-lg"
            >
              <div class="flex justify-between mb-2">
                <span class="font-medium">{{ difficulty.topic }}</span>
                <span class="text-red-500">{{ difficulty.score }}/10</span>
              </div>
              <p class="text-sm text-gray-600">{{ difficulty.description }}</p>
              <div class="mt-3">
                <button 
                  @click="showResources(difficulty.topic)"
                  class="text-sm text-blue-500 hover:text-blue-700"
                >
                  Ver recursos sugeridos
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <div class="flex justify-end space-x-4">
          <button class="px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button 
            @click="saveChanges"
            class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute()
  const id = route.params.id
  
  // Dados do aluno
  const student = ref({
    id: 1,
    name: 'João Silva',
    progress: 85
  })
  
  // Conteúdo atual do aluno
  const currentContent = ref([
    { id: 1, name: 'Introdução a Python', completed: true },
    { id: 2, name: 'Estruturas de Dados', completed: true },
    { id: 3, name: 'Pandas e NumPy', completed: true },
    { id: 4, name: 'Introdução a ML', completed: false },
    { id: 5, name: 'Regressão Linear', completed: false }
  ])
  
  // Conteúdo disponível para adicionar
  const availableContent = ref([
    { id: 6, name: 'Classificação', difficulty: 'Intermediário' },
    { id: 7, name: 'Redes Neurais', difficulty: 'Avançado' },
    { id: 8, name: 'NLP Básico', difficulty: 'Intermediário' },
    { id: 9, name: 'Visão Computacional', difficulty: 'Avançado' }
  ])
  
  const selectedContent = ref(null)
  
  // Recomendações de IA
  const recommendations = ref([
    {
      id: 1,
      name: 'Exercícios de Pandas',
      reason: 'Baseado nas dificuldades com manipulação de dados'
    },
    {
      id: 2,
      name: 'Vídeos de Álgebra Linear',
      reason: 'Para fortalecer fundamentos matemáticos'
    }
  ])
  
  // Dificuldades identificadas
  const difficulties = ref([
    {
      topic: 'Manipulação de DataFrames',
      score: 4,
      description: 'Dificuldade em operações avançadas de filtro e agregação'
    },
    {
      topic: 'Álgebra Linear',
      score: 5,
      description: 'Conceitos de matrizes e vetores precisam ser reforçados'
    }
  ])
  
  // Métodos
  const addContent = () => {
    if (selectedContent.value) {
      currentContent.value.push({
        id: Date.now(),
        name: selectedContent.value.name,
        completed: false
      })
      selectedContent.value = null
    }
  }
  
  const addRecommendation = (recommendation) => {
    currentContent.value.push({
      id: Date.now(),
      name: recommendation.name,
      completed: false
    })
  }
  
  const showResources = (topic) => {
    alert(`Recursos sugeridos para: ${topic}`)
  }
  
  const saveChanges = () => {
    alert('Alterações salvas com sucesso!')
    navigateTo(`/teacher/students/${id}`)
  }
  </script>
  
  <style scoped>
  .adjust-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  </style>