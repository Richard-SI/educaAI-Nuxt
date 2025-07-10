<template>
    <div>
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center">
          <img :src="reply.author.avatar" :alt="reply.author.name" class="w-10 h-10 rounded-full mr-3">
          <div>
            <h3 class="font-semibold text-gray-800">{{ reply.author.name }}</h3>
            <p class="text-sm text-gray-500">{{ reply.postedAt }} • <span :class="levelColor">{{ reply.author.level }}</span></p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button class="text-gray-500 hover:text-blue-600">
            <i class="far fa-bookmark"></i>
          </button>
          <button class="text-gray-500 hover:text-blue-600">
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
  
      <div class="mb-4">
        <p class="text-gray-700">{{ reply.content }}</p>
      </div>
  
      <div class="flex items-center justify-between border-t border-gray-200 pt-3">
        <div class="flex items-center space-x-4">
          <button class="vote-btn text-gray-500 hover:text-green-600 transition-transform" @click="vote('up')">
            <i class="fas fa-arrow-up"></i> {{ reply.votes.up }}
          </button>
          <button class="vote-btn text-gray-500 hover:text-red-600 transition-transform" @click="vote('down')">
            <i class="fas fa-arrow-down"></i> {{ reply.votes.down }}
          </button>
        </div>
        <button class="text-gray-500 hover:text-blue-600" @click="toggleReply">
          <i class="far fa-comment mr-1"></i> Responder
        </button>
      </div>
  
      <div v-if="showReply" class="reply-box bg-gray-50 rounded-lg mt-3 p-3">
        <textarea
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
          placeholder="Escreva sua resposta..." rows="3" v-model="replyContent"></textarea>
        <div class="flex justify-end space-x-3">
          <button class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50" @click="toggleReply">Cancelar</button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" @click="postReply">Publicar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    reply: {
      type: Object,
      required: true
    }
  })
  
  const showReply = ref(false)
  const replyContent = ref('')
  
  const levelColor = computed(() => {
    switch(props.reply.author.level) {
      case 'Especialista': return 'text-green-600'
      case 'Intermediário': return 'text-blue-600'
      case 'IA': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  })
  
  const toggleReply = () => {
    showReply.value = !showReply.value
  }
  
  const vote = (type) => {
    if (type === 'up') {
      props.reply.votes.up++
    } else {
      props.reply.votes.down++
    }
  }
  
  const postReply = () => {
    if (replyContent.value.trim()) {
      // Lógica para postar resposta
      console.log('Resposta postada:', replyContent.value)
      replyContent.value = ''
      showReply.value = false
    }
  }
  </script>
  
  <style scoped>
  .vote-btn:hover {
    transform: scale(1.1);
  }
  </style>