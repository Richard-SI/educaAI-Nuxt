<template>
    <div class="teacher-dashboard">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Painel do Professor</h2>
    
      <div class="bg-white p-6 rounded-lg shadow-md border border-blue-200 mb-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Visão Geral dos Alunos</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Aluno</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progresso (%)</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Atividade</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="student in students" :key="student.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ student.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" :style="{width: student.progress + '%'}"></div>
                  </div>
                  <span class="text-sm">{{ student.progress }}%</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ student.lastActivity }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <NuxtLink :to="`/teacher/students/${student.id}`" class="text-blue-600 hover:text-blue-900 mr-3"><i class="fas fa-eye mr-1"></i> Detalhes</NuxtLink>
                <NuxtLink :to="`/teacher/students/${student.id}/adjust-content`" class="text-green-600 hover:text-green-900"><i class="fas fa-edit mr-1"></i> Ajustar</NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  const students = ref([
    { 
      id: 1, 
      name: 'João Silva', 
      progress: 85, 
      lastActivity: 'Há 2 horas',
      email: 'joao@email.com',
      joinedAt: '15/03/2023',
      completedLessons: 24,
      totalLessons: 30
    },
    { 
      id: 2, 
      name: 'Ana Costa', 
      progress: 60, 
      lastActivity: 'Há 1 dia',
      email: 'ana@email.com',
      joinedAt: '22/02/2023',
      completedLessons: 18,
      totalLessons: 30
    },
    { 
      id: 3, 
      name: 'Pedro Santos', 
      progress: 92, 
      lastActivity: 'Há 5 horas',
      email: 'pedro@email.com',
      joinedAt: '10/01/2023',
      completedLessons: 28,
      totalLessons: 30
    }
  ])
  </script>