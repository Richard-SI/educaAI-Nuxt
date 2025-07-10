<template>
    <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
      <img :src="resource.image" :alt="resource.title" class="w-full h-40 object-cover">
      <div class="p-4">
        <h4 class="font-semibold text-lg text-gray-800 mb-2">{{ resource.title }}</h4>
        <p class="text-gray-600 text-sm mb-3">{{ resource.description }}</p>
        <span :class="typeBadgeClass">{{ resource.typeLabel }}</span>
        <button class="block w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
          {{ actionLabel }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    resource: {
      type: Object,
      required: true
    }
  })
  
  const actionLabels = {
    video: 'Assistir',
    text: 'Ler',
    quiz: 'Iniciar Quiz',
    ebook: 'Baixar'
  }
  
  const typeBadgeClasses = {
    video: 'inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full',
    text: 'inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full',
    quiz: 'inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full',
    ebook: 'inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full'
  }
  
  const actionLabel = computed(() => actionLabels[props.resource.type] || 'Acessar')
  const typeBadgeClass = computed(() => typeBadgeClasses[props.resource.type] || 'inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full')
  </script>