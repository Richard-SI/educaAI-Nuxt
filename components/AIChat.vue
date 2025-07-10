<script setup lang="ts">
interface ChatMessage {
  text: string
  sender: 'user' | 'ai'
  time: string
}

const { sendMessage, checkServer } = useOllama()
const { user } = useAuth()

const messages = ref<ChatMessage[]>([
  {
    text: 'Olá! Sou seu assistente de IA. Como posso te ajudar com seus estudos hoje?',
    sender: 'ai',
    time: new Date().toLocaleTimeString(),
  },
])

const userInput = ref('')
const isLoading = ref(false)
const serverAvailable = ref(true)

onMounted(async () => {
  serverAvailable.value = await checkServer()
})

const handleSend = async () => {
  if (!userInput.value.trim() || isLoading.value || !serverAvailable.value) return

  const question = userInput.value
  userInput.value = ''
  
  messages.value.push({
    text: question,
    sender: 'user',
    time: new Date().toLocaleTimeString(),
  })

  isLoading.value = true

  try {
    const response = await sendMessage(
      `Você é um tutor educacional. Responda de forma clara e didática. Aluno: ${user?.value?.email || 'Estudante'}. Pergunta: ${question}`
    )

    messages.value.push({
      text: response,
      sender: 'ai',
      time: new Date().toLocaleTimeString(),
    })
  } catch (error) {
    messages.value.push({
      text: 'Erro ao conectar com o assistente de IA',
      sender: 'ai',
      time: new Date().toLocaleTimeString()
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="ai-chat-container border rounded-lg shadow-sm bg-white">
    <div v-if="!serverAvailable" class="bg-red-100 border border-red-400 text-red-700 p-3 mx-4 mt-4 rounded">
      Servidor Ollama não disponível. Certifique-se que o Ollama está rodando localmente.
    </div>

    <div class="chat-messages p-4 h-64 overflow-y-auto bg-gray-50">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`"
      >
        <div
          :class="`inline-block px-4 py-2 rounded-lg ${
            msg.sender === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`"
        >
          <p class="text-sm">{{ msg.text }}</p>
          <p
            :class="`text-xs mt-1 ${
              msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
            }`"
          >
            {{ msg.sender === 'user' ? 'Você' : 'Assistente' }} • {{ msg.time }}
          </p>
        </div>
      </div>
      <div v-if="isLoading" class="text-center py-2">
        <div class="inline-block animate-pulse">Pensando...</div>
      </div>
    </div>

    <div class="p-4 border-t">
      <form @submit.prevent="handleSend" class="flex gap-2">
        <input
          v-model="userInput"
          type="text"
          placeholder="Digite sua pergunta..."
          class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          :disabled="isLoading || !serverAvailable"
        />
        <button
          type="submit"
          :disabled="isLoading || !userInput.trim() || !serverAvailable"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.ai-chat-container {
  max-width: 600px;
  margin: 0 auto;
}

.chat-messages {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f7fafc;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 3px;
}
</style>