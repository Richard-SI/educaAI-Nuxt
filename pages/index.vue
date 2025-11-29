


<template>
  <div>

    <!-- Hero Section -->
    <div class="text-center py-16 md:py-24 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-lg mb-12">
      <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
        Seu Caminho para o <span class="text-blue-600">Aprendizado Personalizado</span>
      </h1>
      <p class="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
        Descubra o futuro da educação com a Inteligência Artificial. Adaptamos o conteúdo às suas necessidades, maximizando seu potencial.
      </p>
      <div class="space-x-4">
        <NuxtLink 
          to="/login" 
          class="inline-block bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
        >
          Começar Agora
        </NuxtLink>
        <NuxtLink 
          to="/testimonials" 
          class="inline-block bg-white text-blue-600 border border-blue-600 py-3 px-8 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
        >
          Saber Mais
        </NuxtLink>
      </div>
    </div>

    <!-- Vantagens -->
    <div class="grid md:grid-cols-3 gap-8 mb-12">
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
        <div class="flex justify-center mb-4">
          <svg class="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-3">Avaliação Precisa</h3>
        <p class="text-gray-600">Identificamos seus pontos fortes e fracos com avaliações iniciais inteligentes.</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
        <div class="flex justify-center mb-4">
          <svg class="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM11 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1z"></path>
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-3">Conteúdo Personalizado</h3>
        <p class="text-gray-600">Receba recomendações de aulas e materiais que realmente importam para você.</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
        <div class="flex justify-center mb-4">
          <svg class="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm-3 7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 000 2h4a1 1 0 100-2H8z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-3">Suporte 24/7 com IA</h3>
        <p class="text-gray-600">Tire suas dúvidas instantaneamente com nosso assistente de IA.</p>
      </div>
    </div>

    <!-- Como Funciona -->
    <div class="bg-white p-8 rounded-xl shadow-md mb-12">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Como Funciona</h2>
      <div class="grid md:grid-cols-4 gap-6">
        <div class="text-center" v-for="(step, index) in steps" :key="index">
          <div class="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mb-4">
            {{ index + 1 }}
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <!-- Destaques -->
    <div class="mb-12">
      <h2 class="text-33xl font-bold text-center text-gray-800 mb-8">O Que Você Vai Aprender</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div class="text-blue-500 text-2xl mb-3">
            <i :class="feature.icon"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>

    <!-- Depoimentos -->
    <div class="bg-blue-50 p-8 rounded-xl mb-20">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">O Que Nossos Alunos Dizem</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="index"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <div class="flex items-center mb-4">
            <img 
              :src="testimonial.avatar" 
              :alt="testimonial.name"
              class="w-12 h-12 rounded-full mr-4"
            >
            <div>
              <h4 class="font-semibold">{{ testimonial.name }}</h4>
              <p class="text-gray-500 text-sm">{{ testimonial.role }}</p>
            </div>
          </div>
          <p class="text-gray-700 italic">"{{ testimonial.quote }}"</p>
          <div class="flex mt-3 text-yellow-400">
            <i class="fas fa-star" v-for="n in testimonial.rating" :key="n"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 🧠 MASCOTE ASSISTENTE -->
    <client-only>
      <AssistantBot />
    </client-only>

    <!-- Janela de chat -->
    <AssistantChat v-if="openAssistant" />
  </div>

  <div>
    <AssistantBot />
    <AssistantChat />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AssistantBot from "~/components/AssistantBot.vue"
import AssistantChat from "~/components/AssistantChat.vue"

const openAssistant = ref(false);

/* Escuta o evento vindo do AssistantBot.vue */
function toggleChat() {
  openAssistant.value = !openAssistant.value;
}

onMounted(() => {
  window.addEventListener("assistant-toggle", toggleChat);
});

onUnmounted(() => {
  window.removeEventListener("assistant-toggle", toggleChat);
});

/* --- Dados da Página --- */
const steps = [
  { title: "Cadastro", description: "Crie sua conta em menos de 1 minuto" },
  { title: "Avaliação", description: "Responda nosso teste de nivelamento" },
  { title: "Plano de Estudos", description: "Receba seu roteiro personalizado" },
  { title: "Comece a Aprender", description: "Acesse conteúdos selecionados" }
];

const features = [
  { icon: "fas fa-brain", title: "Machine Learning", description: "Aprenda IA" },
  { icon: "fas fa-code", title: "Programação", description: "Python, R, etc" },
  { icon: "fas fa-chart-bar", title: "Análise de Dados", description: "Visualização e BI" },
  { icon: "fas fa-robot", title: "Deep Learning", description: "Redes neurais" }
];

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Engenheiro de Dados",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "A plataforma revolucionou minha carreira.",
    rating: 5
  },
  {
    name: "Ana Oliveira",
    role: "Cientista de Dados Jr",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "O conteúdo personalizado me ajudou demais.",
    rating: 5
  }
];
</script>

<style scoped>
/* Nada aqui interfere com o mascote — tudo está no AssistantBot.vue */
</style>
