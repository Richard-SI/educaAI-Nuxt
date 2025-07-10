<template>
    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Criar Novo Tópico</h2>
  
      <form @submit.prevent="submitTopic" class="space-y-6">
        <div>
          <label for="topic-title" class="block text-lg font-medium text-gray-800 mb-2">Título do Tópico</label>
          <input 
            v-model="form.title"
            type="text" 
            id="topic-title" 
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
            placeholder="Ex: Dúvida sobre algoritmos de machine learning">
        </div>
  
        <div>
          <label for="topic-category" class="block text-lg font-medium text-gray-800 mb-2">Categoria</label>
          <select 
            v-model="form.category"
            id="topic-category" 
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
            <option value="">Selecione uma categoria</option>
            <option value="doubt">Dúvida</option>
            <option value="discussion">Discussão</option>
            <option value="resource">Recurso</option>
            <option value="announcement">Anúncio</option>
          </select>
        </div>
  
        <div>
          <label for="topic-content" class="block text-lg font-medium text-gray-800 mb-2">Conteúdo</label>
          <textarea 
            v-model="form.content"
            id="topic-content" 
            rows="8" 
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Descreva seu tópico com detalhes..."></textarea>
        </div>
  
        <div>
          <label class="block text-lg font-medium text-gray-800 mb-2">Tags (opcional)</label>
          <div class="flex flex-wrap gap-2">
            <input 
              v-model="form.tags"
              type="text" 
              id="topic-tags"
              class="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Adicione tags separadas por vírgula">
          </div>
          <p class="text-sm text-gray-500 mt-2">Ex: python, machine-learning, algoritmos</p>
        </div>
  
        <div class="flex items-center space-x-4">
          <button type="button" class="text-gray-500 hover:text-blue-600">
            <i class="fas fa-paperclip mr-1"></i> Anexar Arquivo
          </button>
          <button type="button" class="text-gray-500 hover:text-blue-600">
            <i class="fas fa-code mr-1"></i> Inserir Código
          </button>
        </div>
  
        <div class="flex justify-end space-x-4">
          <NuxtLink to="/forum"
            class="px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200">
            Cancelar
          </NuxtLink>
          <button type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Publicar Tópico
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  const form = ref({
    title: '',
    category: '',
    content: '',
    tags: ''
  })
  
  const emit = defineEmits(['submit'])
  
  const submitTopic = () => {
    const tagsArray = form.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    
    const newTopic = {
      id: Date.now(),
      title: form.value.title,
      category: form.value.category,
      content: form.value.content,
      tags: tagsArray,
      author: {
        name: 'Você',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        level: 'Novato'
      },
      postedAt: 'Agora',
      views: 0,
      repliesCount: 0,
      votes: {
        up: 0,
        down: 0
      }
    }
    
    emit('submit', newTopic)
    
    // Reset form
    form.value = {
      title: '',
      category: '',
      content: '',
      tags: ''
    }
    
    navigateTo('/forum')
  }
  </script>