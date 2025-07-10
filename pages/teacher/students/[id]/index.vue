<template>
    <div class="student-detail">
      <NuxtLink to="/teacher" class="flex items-center text-blue-600 mb-6">
        <i class="fas fa-arrow-left mr-2"></i> Voltar para o Painel
      </NuxtLink>
  
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{{ student.name }}</h1>
            <p class="text-gray-600">{{ student.email }}</p>
          </div>
          <div class="mt-4 md:mt-0">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Membro desde {{ student.joinedAt }}
            </span>
          </div>
        </div>
  
        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Progresso Geral</h3>
            <div class="flex items-center">
              <div class="w-full bg-gray-200 rounded-full h-4 mr-3">
                <div 
                  class="bg-blue-600 h-4 rounded-full" 
                  :style="{width: student.progress + '%'}"
                ></div>
              </div>
              <span class="font-bold">{{ student.progress }}%</span>
            </div>
            <p class="text-sm text-gray-600 mt-2">
              {{ student.completedLessons }} de {{ student.totalLessons }} aulas concluídas
            </p>
          </div>
  
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Última Atividade</h3>
            <p class="text-gray-700">{{ student.lastActivity }}</p>
            <p class="text-sm text-gray-600 mt-2">Tópico: Introdução a Machine Learning</p>
          </div>
  
          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Desempenho</h3>
            <div class="flex items-center">
              <span class="text-2xl font-bold mr-2">8.7</span>
              <div class="text-yellow-400">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
            </div>
            <p class="text-sm text-gray-600 mt-2">Média em avaliações</p>
          </div>
        </div>
  
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Atividades Recentes</h3>
          <div class="space-y-4">
            <div 
              v-for="(activity, index) in activities"
              :key="index"
              class="border-l-4 border-blue-500 pl-4 py-2"
            >
              <p class="text-gray-800">{{ activity.description }}</p>
              <p class="text-sm text-gray-500">{{ activity.date }} • {{ activity.time }}</p>
            </div>
          </div>
        </div>
  
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Progresso por Tópico</h3>
          <div class="space-y-3">
            <div v-for="topic in topics" :key="topic.name" class="mb-2">
              <div class="flex justify-between mb-1">
                <span class="text-gray-700">{{ topic.name }}</span>
                <span class="text-gray-700">{{ topic.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  class="h-2.5 rounded-full" 
                  :class="{
                    'bg-red-500': topic.progress < 30,
                    'bg-yellow-500': topic.progress >= 30 && topic.progress < 70,
                    'bg-green-500': topic.progress >= 70
                  }"
                  :style="{width: topic.progress + '%'}"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute()
  const id = route.params.id
  
  // Simulando busca de dados do aluno
  const student = ref({
    id: 1,
    name: 'João Silva',
    progress: 85,
    lastActivity: 'Há 2 horas',
    email: 'joao@email.com',
    joinedAt: '15/03/2023',
    completedLessons: 24,
    totalLessons: 30
  })
  
  // Atividades recentes
  const activities = ref([
    {
      description: 'Completou a aula "Introdução a Redes Neurais"',
      date: '10/06/2023',
      time: '14:30'
    },
    {
      description: 'Submeteu o exercício prático de Machine Learning',
      date: '09/06/2023',
      time: '18:45'
    },
    {
      description: 'Participou do fórum de discussão sobre Python',
      date: '08/06/2023',
      time: '10:20'
    }
  ])
  
  // Progresso por tópico
  const topics = ref([
    { name: 'Introdução a Python', progress: 95 },
    { name: 'Fundamentos de Machine Learning', progress: 85 },
    { name: 'Redes Neurais Artificiais', progress: 70 },
    { name: 'Processamento de Linguagem Natural', progress: 45 },
    { name: 'Visão Computacional', progress: 30 }
  ])
  
  // Aqui você faria uma requisição para buscar os dados reais do aluno
  onMounted(() => {
    // Buscar dados do aluno baseado no ID
    // Exemplo: const { data } = await useFetch(`/api/students/${id}`)
    // student.value = data.value
  })
  </script>
  
  <style scoped>
  .student-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  </style>