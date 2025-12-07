<template>
    <div class="teacher-dashboard">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Painel do Professor</h2>
    
      <!-- Resumo Estatístico -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-4 rounded-lg shadow-md border border-blue-200">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <i class="fas fa-users text-xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Alunos Ativos</p>
              <p class="text-2xl font-bold">{{ stats.activeStudents }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-md border border-green-200">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <i class="fas fa-book text-xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Cursos Ministrados</p>
              <p class="text-2xl font-bold">{{ stats.courses }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-md border border-yellow-200">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <i class="fas fa-tasks text-xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Atividades Pendentes</p>
              <p class="text-2xl font-bold">{{ stats.pendingActivities }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-md border border-purple-200">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <i class="fas fa-chart-line text-xl"></i>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Média de Progresso</p>
              <p class="text-2xl font-bold">{{ stats.averageProgress }}%</p>
            </div>
          </div>
        </div>
      </div>
    
      <!-- Lista de Alunos -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-blue-200 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-800">Visão Geral dos Alunos</h3>
          <NuxtLink 
            to="/teacher/students/reports" 
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Ver relatórios completos
          </NuxtLink>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Aluno</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progresso</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Atividade</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="student in students" :key="student.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img :src="student.avatar" :alt="student.name" class="w-10 h-10 rounded-full mr-3">
                    <div>
                      <p class="font-medium">{{ student.name }}</p>
                      <p class="text-sm text-gray-500">{{ student.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      class="h-2.5 rounded-full" 
                      :class="{
                        'bg-red-500': student.progress < 30,
                        'bg-yellow-500': student.progress >= 30 && student.progress < 70,
                        'bg-green-500': student.progress >= 70
                      }"
                      :style="{width: student.progress + '%'}"
                    ></div>
                  </div>
                  <span class="text-sm">{{ student.progress }}%</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <p>{{ student.lastActivity }}</p>
                  <p class="text-sm text-gray-500">{{ student.lastTopic }}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="px-2 py-1 text-xs rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': student.status === 'active',
                      'bg-yellow-100 text-yellow-800': student.status === 'pending',
                      'bg-red-100 text-red-800': student.status === 'inactive'
                    }"
                  >
                    {{ statusText[student.status] }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <NuxtLink 
                    :to="`/teacher/students/${student.id}`" 
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <i class="fas fa-eye mr-1"></i> Detalhes
                  </NuxtLink>
                  <NuxtLink 
                    :to="`/teacher/students/${student.id}/adjust-content`" 
                    class="text-green-600 hover:text-green-900"
                  >
                    <i class="fas fa-edit mr-1"></i> Ajustar
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
      <!-- Seções de Ação Rápida -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Ferramentas de Conteúdo -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-green-200">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Gestão de Conteúdo</h3>
          <ul class="space-y-3">
          <li>
            <NuxtLink
              to="/teacher/content/create"
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div class="bg-blue-100 p-2 rounded-full">
                <i class="fas fa-plus text-blue-600"></i>
              </div>
              <span class="font-medium">Adicionar novo recurso educacional</span>
            </NuxtLink>
          </li>

          <li>
            <button
              class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left"
            >
              <div class="bg-purple-100 p-2 rounded-full">
                <i class="fas fa-edit text-purple-600"></i>
              </div>
              <span class="font-medium">Editar conteúdos existentes</span>
            </button>
          </li>

          <li>
            <button
              class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left"
            >
              <div class="bg-green-100 p-2 rounded-full">
                <i class="fas fa-chart-pie text-green-600"></i>
              </div>
              <span class="font-medium">Visualizar relatórios de engajamento</span>
            </button>
          </li>
        </ul>

          <button class="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
            Gerenciar Conteúdo Completo
          </button>
        </div>
    
        <!-- Relatórios Detalhados -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-blue-200">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Relatórios e Análises</h3>

          <div class="space-y-4">

            <!-- Desempenho por Tópico -->
            <NuxtLink
              to="/teacher/reports/topic-performance"
              class="block p-4 border rounded-lg hover:bg-blue-50 transition"
            >
              <h4 class="font-medium flex items-center">
                <i class="fas fa-chart-bar text-blue-500 mr-2"></i>
                Desempenho por Tópico
              </h4>
              <p class="text-sm text-gray-600 mt-1">
                Visualize o desempenho médio dos alunos em cada tópico
              </p>
            </NuxtLink>

            <!-- Comparativo de Turmas -->
            <NuxtLink
              to="/teacher/reports/class-comparison"
              class="block p-4 border rounded-lg hover:bg-blue-50 transition"
            >
              <h4 class="font-medium flex items-center">
                <i class="fas fa-users text-blue-500 mr-2"></i>
                Comparativo de Turmas
              </h4>
              <p class="text-sm text-gray-600 mt-1">
                Compare o desempenho entre diferentes grupos
              </p>
            </NuxtLink>

            <!-- Dificuldades Comuns -->
            <NuxtLink
              to="/teacher/reports/common-difficulties"
              class="block p-4 border rounded-lg hover:bg-blue-50 transition"
            >
              <h4 class="font-medium flex items-center">
                <i class="fas fa-exclamation-triangle text-blue-500 mr-2"></i>
                Dificuldades Comuns
              </h4>
              <p class="text-sm text-gray-600 mt-1">
                Identifique os tópicos com maior taxa de dificuldade
              </p>
            </NuxtLink>

          </div>

          <!-- Botão Geral -->
          <NuxtLink
            to="/teacher/reports/topic-performance"
            class="mt-6 block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Acessar Relatórios Completos
          </NuxtLink>
        </div>

      </div>
    </div>
  </template>
  
  <script setup>
  const stats = ref({
    activeStudents: 24,
    courses: 5,
    pendingActivities: 18,
    averageProgress: 72
  })
  
  const statusText = {
    active: 'Ativo',
    pending: 'Pendente',
    inactive: 'Inativo'
  }
  
  const students = ref([
    { 
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      progress: 85,
      lastActivity: 'Há 2 horas',
      lastTopic: 'Machine Learning Básico',
      status: 'active'
    },
    { 
      id: 2,
      name: 'Ana Costa',
      email: 'ana@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      progress: 60,
      lastActivity: 'Há 1 dia',
      lastTopic: 'Introdução a Python',
      status: 'active'
    },
    { 
      id: 3,
      name: 'Pedro Santos',
      email: 'pedro@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      progress: 92,
      lastActivity: 'Há 5 horas',
      lastTopic: 'Redes Neurais',
      status: 'active'
    },
    { 
      id: 4,
      name: 'Mariana Oliveira',
      email: 'mariana@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      progress: 45,
      lastActivity: 'Há 3 dias',
      lastTopic: 'Pandas e NumPy',
      status: 'pending'
    },
    { 
      id: 5,
      name: 'Carlos Mendes',
      email: 'carlos@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
      progress: 28,
      lastActivity: 'Há 2 semanas',
      lastTopic: 'Estatística Básica',
      status: 'inactive'
    }
  ])
  </script>
  
  <style scoped>
  .teacher-dashboard {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  /* Transições suaves para hover */
  .hover\:bg-gray-50:hover {
    transition: background-color 0.2s ease;
  }
  
  /* Efeito de hover nas linhas da tabela */
  tbody tr {
    transition: background-color 0.2s ease;
  }
  
  tbody tr:hover {
    background-color: #f9fafb;
  }
  </style>