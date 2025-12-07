<template>
  <div class="student-dashboard">
    <!-- Cabeçalho Personalizado -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
          Bem-vindo(a), {{ userName }}!
        </h2>
        <p class="text-gray-600 mt-2">Seu plano de aprendizado personalizado</p>
      </div>
      <div class="mt-4 md:mt-0">
        <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          Progresso: {{ progress }}%
        </span>
      </div>
    </div>

    <!-- Grade de Conteúdo -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <!-- Cartão de Progresso Detalhado -->
      <div class="bg-white p-6 rounded-xl shadow-md border border-blue-200 hover:shadow-lg transition-shadow">
        <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-chart-line text-blue-500 mr-2"></i> Seu Progresso
        </h3>
        <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full" :style="`width: ${progress}%;`">
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-2xl font-bold text-blue-600">{{ completedLessons }}</p>
            <p class="text-xs text-gray-500">AULAS FEITAS</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-green-600">{{ activeStreak }}</p>
            <p class="text-xs text-gray-500">DIAS SEGUIDOS</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-purple-600">{{ points }}</p>
            <p class="text-xs text-gray-500">PONTOS</p>
          </div>
        </div>
        <button @click="showProgressDetails"
          class="mt-6 w-full bg-white text-blue-600 border border-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
          Ver detalhes
        </button>
      </div>

      <!-- Recomendações Personalizadas -->
      <div class="bg-white p-6 rounded-xl shadow-md border border-green-200 hover:shadow-lg transition-shadow">
        <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-lightbulb text-green-500 mr-2"></i> Recomendações
        </h3>
        <ul class="space-y-3">
          <li v-for="(rec, index) in recommendations" :key="index"
            class="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span :class="`mr-3 text-lg ${rec.completed ? 'text-green-500' : 'text-gray-300'}`">
              <i :class="rec.completed ? 'fas fa-check-circle' : 'far fa-circle'"></i>
            </span>
            <div class="flex-1">
              <p class="font-medium">{{ rec.title }}</p>
              <p class="text-sm text-gray-500">{{ rec.type }} • {{ rec.duration }}</p>
            </div>
            <button @click="startRecommendation(rec)" class="ml-2 text-blue-500 hover:text-blue-700">
              <i class="fas fa-play"></i>
            </button>
          </li>
        </ul>
        <button @click="showAllRecommendations"
          class="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md">
          Ver todas ({{ recommendations.length }})
        </button>
      </div>

      <!-- Chat com IA -->
        <!-- Chat com IA -->
<div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
  <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    
    <img 
      src="../public/educaAI.png" 
      alt="Lumi - Assistente de IA"
      class="w-6 h-6 mr-2"
    />

    Lumi, seu assistente de IA
  </h3>

  <AIChat />
</div>

    </div>

    <!-- Seção de Conteúdos Recentes -->
    <div class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-gray-800">Seus Conteúdos Recentes</h3>
        <button class="text-blue-600 hover:text-blue-800 font-medium">Ver histórico completo</button>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="item in recentContent" :key="item.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
          <div class="h-40 bg-gray-100 flex items-center justify-center">
            <i :class="`fas ${item.icon} text-4xl ${item.iconColor}`"></i>
          </div>
          <div class="p-4">
            <h4 class="font-bold text-lg mb-2">{{ item.title }}</h4>
            <p class="text-gray-600 text-sm mb-3">{{ item.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">{{ item.date }}</span>
              <button class="text-blue-500 hover:text-blue-700 text-sm font-medium">
                Continuar <i class="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes do Progresso -->
    <div v-if="showProgressModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Detalhes do Seu Progresso</h3>
          <button @click="showProgressModal = false" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <!-- Conteúdo do modal aqui -->
        <button @click="showProgressModal = false" class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

import AIChat from '~/components/AIChat.vue'
import { ref, computed, onMounted } from 'vue'
const { user } = useAuth() // Hook de autenticação
// Dados do usuário
const userName = computed(() => {
  if (!user.value?.email) return 'Estudante'
  const namePart = user.value.email.split('@')[0]
  return namePart.charAt(0).toUpperCase() + namePart.slice(1)
})

// Progresso
const progress = ref(75)
const completedLessons = ref(24)
const activeStreak = ref(7)
const points = ref(350)
const showProgressModal = ref(false)

// Recomendações
const recommendations = ref([
  { id: 1, title: 'Fundamentos de IA', type: 'Vídeo Aula', duration: '15 min', completed: true },
  { id: 2, title: 'Quiz: Python Básico', type: 'Questionário', duration: '10 min', completed: true },
  { id: 3, title: 'História da Computação', type: 'Artigo', duration: '8 min', completed: false },
  { id: 4, title: 'Exercícios de Pandas', type: 'Prática', duration: '20 min', completed: false }
])

// Chat com IA
const chatMessages = ref([
  { text: 'Olá! eu sou o Lumi seu assistente de IA. Como posso te ajudar hoje?', sender: 'ai', time: '21:30' }
])
const userQuestion = ref('')
const chatContainer = ref(null)

// Conteúdos Recentes
const recentContent = ref([
  { id: 1, title: 'Introdução ao Python', description: 'Conceitos básicos da linguagem', icon: 'fa-code', iconColor: 'text-blue-500', date: 'Hoje' },
  { id: 2, title: 'Machine Learning', description: 'O que são modelos preditivos', icon: 'fa-brain', iconColor: 'text-purple-500', date: 'Ontem' },
  { id: 3, title: 'Análise de Dados', description: 'Pandas e NumPy na prática', icon: 'fa-chart-bar', iconColor: 'text-green-500', date: '2 dias atrás' },
  { id: 4, title: 'Projeto Final', description: 'Crie seu primeiro modelo', icon: 'fa-project-diagram', iconColor: 'text-red-500', date: 'Semana passada' }
])

// Métodos
const showProgressDetails = () => {
  showProgressModal.value = true
}

const showAllRecommendations = () => {
  // Navegar para página de recomendações completas
  navigateTo('/student/recommendations')
}

import { useRouter } from 'vue-router'
const router = useRouter()
const startRecommendation = (rec) => {
  if (rec.title === 'Fundamentos de IA') {
    router.push('/fundamentos-ia')
     // Implementar navegação para o conteúdo
  } else {
    alert(`Iniciando: ${rec.title}`)
  }
}

const sendQuestion = async () => {
  if (!userQuestion.value.trim()) return

  // Adiciona mensagem do usuário
  const userMsg = {
    text: userQuestion.value,
    sender: 'user',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  chatMessages.value.push(userMsg)

  const question = userQuestion.value
  userQuestion.value = ''

  // Resposta simulada da IA
  setTimeout(() => {
    const aiResponses = {
      'oi': 'Olá! Como posso te ajudar com seus estudos hoje?',
      'o que é machine learning': 'Machine Learning é um subcampo da IA que permite sistemas aprenderem com dados, identificando padrões e tomando decisões com intervenção humana mínima. Quer um exemplo prático?',
      'exemplo': 'Claro! Quando a Netflix recomenda filmes baseados no que você assistiu, isso é Machine Learning em ação!',
      'como começar': 'Recomendo começar pelo curso "Fundamentos de Python" e depois seguir para "Introdução a Machine Learning". Posso te mostrar o caminho!',
      'obrigado': 'De nada! Estou aqui para ajudar. Se tiver mais dúvidas, é só perguntar!'
    }

    const response = aiResponses[question.toLowerCase()] ||
      `Interessante sua pergunta sobre "${question}". Posso te direcionar para materiais sobre esse tema. Quer que eu busque recursos específicos?`

    chatMessages.value.push({
      text: response,
      sender: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })

    // Rolagem automática
    scrollChatToBottom()
  }, 1000)
}

const scrollChatToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// Inicialização
onMounted(() => {
  scrollChatToBottom()
})
</script>

<style scoped>
.student-dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

/* Animações */
.float-hover {
  transition: transform 0.3s ease;
}

.float-hover:hover {
  transform: translateY(-5px);
}
</style>