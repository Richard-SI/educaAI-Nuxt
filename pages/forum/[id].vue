<script setup>
const route = useRoute()
const { data: topic, error } = await useFetch(`/api/topics/${route.params.id}`)

if (error.value) {
  throw createError({ 
    statusCode: 404, 
    statusMessage: 'Tópico não encontrado',
    fatal: true
  })
}

const showReply = ref(false)
const replyContent = ref('')
const newReply = ref('')

const toggleReply = () => {
  showReply.value = !showReply.value
}

const vote = (type) => {
  if (type === 'up') {
    topic.value.votes.up++
  } else {
    topic.value.votes.down++
  }
}

const postReply = () => {
  const content = replyContent.value || newReply.value
  if (content.trim()) {
    topic.value.replies.push({
      id: topic.value.replies.length + 1,
      content,
      author: {
        name: 'Você',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        level: 'Novato'
      },
      postedAt: 'Agora',
      votes: {
        up: 0,
        down: 0
      }
    })
    replyContent.value = ''
    newReply.value = ''
    showReply.value = false
  }
}
</script>

<template>
  <div v-if="topic">
    <div class="flex items-center mb-6">
      <NuxtLink to="/forum" class="mr-4 text-blue-600 hover:text-blue-800">
        <i class="fas fa-arrow-left"></i>
      </NuxtLink>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800">{{ topic.title }}</h2>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
      <div class="flex justify-between items-start mb-4">
        <div class="flex items-center">
          <img :src="topic.author.avatar" :alt="topic.author.name" class="w-10 h-10 rounded-full mr-3">
          <div>
            <h3 class="font-semibold text-gray-800">{{ topic.author.name }}</h3>
            <p class="text-sm text-gray-500">{{ topic.postedAt }} • <span :class="{
              'text-blue-600': topic.author.level === 'Iniciante',
              'text-green-600': topic.author.level === 'Intermediário',
              'text-purple-600': topic.author.level === 'Especialista'
            }">{{ topic.author.level }}</span></p>
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

      <div class="mb-6">
        <p class="text-gray-700 mb-4">{{ topic.content }}</p>
        <div v-if="topic.questions" class="text-gray-700">
          <p>Especificamente, não entendi:</p>
          <ul class="list-disc list-inside text-gray-700 pl-4 mb-4">
            <li v-for="(question, index) in topic.questions" :key="index">{{ question }}</li>
          </ul>
        </div>
        <p class="text-gray-700">Agradeço qualquer ajuda!</p>
      </div>

      <div class="flex items-center justify-between border-t border-b border-gray-200 py-3 mb-4">
        <div class="flex items-center space-x-4">
          <button class="vote-btn text-gray-500 hover:text-green-600 transition-transform" @click="vote('up')">
            <i class="fas fa-arrow-up"></i> {{ topic.votes.up }}
          </button>
          <button class="vote-btn text-gray-500 hover:text-red-600 transition-transform" @click="vote('down')">
            <i class="fas fa-arrow-down"></i> {{ topic.votes.down }}
          </button>
        </div>
        <div class="flex items-center space-x-4">
          <button class="text-gray-500 hover:text-blue-600" @click="toggleReply">
            <i class="far fa-comment mr-1"></i> Responder
          </button>
          <button class="text-gray-500 hover:text-blue-600">
            <i class="fas fa-share mr-1"></i> Compartilhar
          </button>
        </div>
      </div>

      <div v-if="showReply" class="reply-box bg-gray-50 rounded-lg p-4">
        <textarea
          v-model="replyContent"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
          placeholder="Escreva sua resposta..." rows="4"></textarea>
        <div class="flex justify-end space-x-3">
          <button class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50" @click="toggleReply">
            Cancelar
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" @click="postReply">
            Publicar
          </button>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ topic.replies.length }} Respostas</h3>

      <div v-for="reply in topic.replies" :key="reply.id" class="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-4">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center">
            <img :src="reply.author.avatar" :alt="reply.author.name" class="w-10 h-10 rounded-full mr-3">
            <div>
              <h3 class="font-semibold text-gray-800">{{ reply.author.name }}</h3>
              <p class="text-sm text-gray-500">{{ reply.postedAt }} • <span :class="{
                'text-green-600': reply.author.level === 'Especialista',
                'text-blue-600': reply.author.level === 'Intermediário',
                'text-purple-600': reply.author.level === 'IA'
              }">{{ reply.author.level }}</span></p>
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
            <button class="vote-btn text-gray-500 hover:text-green-600 transition-transform" @click="reply.votes.up++">
              <i class="fas fa-arrow-up"></i> {{ reply.votes.up }}
            </button>
            <button class="vote-btn text-gray-500 hover:text-red-600 transition-transform" @click="reply.votes.down++">
              <i class="fas fa-arrow-down"></i> {{ reply.votes.down }}
            </button>
          </div>
          <button class="text-gray-500 hover:text-blue-600" @click="toggleReply">
            <i class="far fa-comment mr-1"></i> Responder
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Sua Resposta</h3>
      <textarea
        v-model="newReply"
        class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="Escreva sua resposta detalhada..." rows="6"></textarea>
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <button class="text-gray-500 hover:text-blue-600">
            <i class="fas fa-paperclip"></i>
          </button>
          <button class="text-gray-500 hover:text-blue-600">
            <i class="fas fa-code"></i>
          </button>
        </div>
        <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" @click="postReply">
          Publicar Resposta
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vote-btn:hover {
  transform: scale(1.1);
}
.reply-box {
  transition: all 0.3s ease;
}
</style>