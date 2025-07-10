<template>
    <div class="new-topic-page">
      <div class="flex items-center mb-6">
        <NuxtLink to="/forum" class="mr-4 text-blue-600 hover:text-blue-800">
          <i class="fas fa-arrow-left"></i> 
        </NuxtLink>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800">Criar Novo Tópico</h1>
      </div>
  
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <form @submit.prevent="submitTopic" class="space-y-6">
          <!-- Título do Tópico -->
          <div>
            <label for="title" class="block text-lg font-medium text-gray-800 mb-2">
              Título do Tópico <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              id="title"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
              placeholder="Ex: Dúvida sobre algoritmos de machine learning"
            >
            <p class="text-sm text-gray-500 mt-1">Seja claro e descritivo no título</p>
          </div>
  
          <!-- Categoria -->
          <div>
            <label for="category" class="block text-lg font-medium text-gray-800 mb-2">
              Categoria <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.category"
              id="category"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="" disabled selected>Selecione uma categoria</option>
              <option value="doubt">Dúvida</option>
              <option value="discussion">Discussão</option>
              <option value="resource">Recurso</option>
              <option value="announcement">Anúncio</option>
            </select>
          </div>
  
          <!-- Conteúdo -->
          <div>
            <label for="content" class="block text-lg font-medium text-gray-800 mb-2">
              Conteúdo <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.content"
              id="content"
              rows="8"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Descreva seu tópico com detalhes..."
            ></textarea>
            <div class="flex items-center mt-2 space-x-4">
              <button type="button" class="text-gray-500 hover:text-blue-600">
                <i class="fas fa-paperclip mr-1"></i> Anexar Arquivo
              </button>
              <button type="button" class="text-gray-500 hover:text-blue-600">
                <i class="fas fa-code mr-1"></i> Inserir Código
              </button>
              <button type="button" class="text-gray-500 hover:text-blue-600">
                <i class="fas fa-image mr-1"></i> Adicionar Imagem
              </button>
            </div>
          </div>
  
          <!-- Tags -->
          <div>
            <label class="block text-lg font-medium text-gray-800 mb-2">
              Tags (opcional)
            </label>
            <div class="flex flex-wrap items-center gap-2">
              <input
                v-model="tagInput"
                type="text"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Adicionar tag"
                @keydown.enter.prevent="addTag"
              >
              <button
                type="button"
                @click="addTag"
                class="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
            
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                v-for="(tag, index) in form.tags"
                :key="index"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {{ tag }}
                <button
                  type="button"
                  @click="removeTag(index)"
                  class="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <i class="fas fa-times"></i>
                </button>
              </span>
            </div>
            <p class="text-sm text-gray-500 mt-1">Use tags relevantes para ajudar outros usuários a encontrar seu tópico</p>
          </div>
  
          <!-- Ações -->
          <div class="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <NuxtLink
              to="/forum"
              class="px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </NuxtLink>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">
                <i class="fas fa-paper-plane mr-2"></i> Publicar Tópico
              </span>
              <span v-else>
                <i class="fas fa-spinner fa-spin mr-2"></i> Publicando...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  const router = useRouter()
  
  // Implementação simples do toast
  const toast = {
    success: (msg) => alert(msg),
    error: (msg) => alert('Erro: ' + msg)
  }
  
  const form = ref({
    title: '',
    category: '',
    content: '',
    tags: []
  })
  
  const tagInput = ref('')
  const isSubmitting = ref(false)
  
  const addTag = () => {
    const tag = tagInput.value.trim()
    if (tag && !form.value.tags.includes(tag)) {
      form.value.tags.push(tag)
      tagInput.value = ''
    }
  }
  
  const removeTag = (index) => {
    form.value.tags.splice(index, 1)
  }
  
  const submitTopic = async () => {
    if (isSubmitting.value) return
    
    try {
      isSubmitting.value = true
      
      // Chamada API para criar o tópico
      const newTopic = await $fetch('/api/topics', {
        method: 'POST',
        body: {
          title: form.value.title,
          category: form.value.category,
          content: form.value.content,
          tags: form.value.tags
        }
      })
  
      alert('Tópico criado com sucesso!') 
      router.push(`/forum/${newTopic.id}`)
      
    } catch (error) {
      console.error('Erro ao criar tópico:', error)
      alert('Ocorreu um erro ao criar o tópico. Tente novamente.')
    } finally {
      isSubmitting.value = false
    }
  }
  </script>
  
  <style scoped>
  .new-topic-page {
    max-width: 800px;
    margin: 0 auto;
  }
  
  /* Transição para o botão de submit */
  button[type="submit"] {
    transition: all 0.3s ease;
  }
  </style>