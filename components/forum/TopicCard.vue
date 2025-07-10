<template>
    <div class="py-4">
      <div class="flex justify-between items-start mb-2">
        <NuxtLink :to="`/forum/${topic.id}`" class="text-lg font-semibold text-blue-600 hover:underline">
          {{ topic.title }}
        </NuxtLink>
        <span class="text-sm text-gray-500">{{ topic.postedAt }}</span>
      </div>
      <div class="flex items-center text-sm text-gray-600 mb-2">
        <img :src="topic.author.avatar" :alt="topic.author.name" class="w-6 h-6 rounded-full mr-2">
        <span>por {{ topic.author.name }}</span>
        <span class="mx-2">•</span>
        <span><i class="fas fa-comments mr-1"></i> {{ topic.repliesCount }} respostas</span>
        <span class="mx-2">•</span>
        <span><i class="fas fa-eye mr-1"></i> {{ topic.views }} visualizações</span>
      </div>
      <p class="text-gray-600 text-sm">{{ topic.excerpt }}</p>
      <div class="flex flex-wrap mt-3">
        <span v-for="tag in topic.tags" :key="tag" :class="getTagClass(tag)">
          {{ tag }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    topic: {
      type: Object,
      required: true
    }
  })
  
  const getTagClass = (tag) => {
    const colorMap = {
      'IA': 'bg-blue-100 text-blue-800',
      'Redes Neurais': 'bg-green-100 text-green-800',
      'Deep Learning': 'bg-purple-100 text-purple-800',
      'Discussão': 'bg-yellow-100 text-yellow-800',
      'Educação': 'bg-red-100 text-red-800',
      'Python': 'bg-green-100 text-green-800',
      'Recursos': 'bg-indigo-100 text-indigo-800'
    }
    
    const baseClass = 'text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2'
    return `${baseClass} ${colorMap[tag] || 'bg-gray-100 text-gray-800'}`
  }
  </script>