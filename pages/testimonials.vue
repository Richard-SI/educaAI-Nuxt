<template>
    <div class="depoimentos-page">
      <!-- Cabeçalho -->
      <div class="text-center py-12 md:py-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-lg mb-12">
        <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Depoimentos de <span class="text-blue-600">Nossos Alunos</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Veja o que nossos estudantes têm a dizer sobre suas experiências com nossa plataforma de aprendizado personalizado.
        </p>
      </div>
  
      <!-- Filtros e Ordenação -->
      <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="w-full md:w-1/3">
            <label for="filter" class="block text-sm font-medium text-gray-700 mb-1">Filtrar por curso</label>
            <select
              id="filter"
              v-model="selectedCourse"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">Todos os cursos</option>
              <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
            </select>
          </div>
          
          <div class="w-full md:w-1/3">
            <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
            <select
              id="sort"
              v-model="sortBy"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="recent">Mais recentes</option>
              <option value="rating">Melhores avaliações</option>
            </select>
          </div>
          
          <div class="w-full md:w-1/3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Buscar depoimento</label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Pesquisar..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Lista de Depoimentos -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div 
          v-for="testimonial in filteredTestimonials" 
          :key="testimonial.id"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500"
        >
          <div class="flex items-start mb-4">
            <img 
              :src="testimonial.avatar" 
              :alt="testimonial.name"
              class="w-14 h-14 rounded-full mr-4 object-cover"
            >
            <div>
              <h3 class="text-xl font-semibold">{{ testimonial.name }}</h3>
              <p class="text-gray-600 text-sm">{{ testimonial.role }}</p>
              <div class="flex items-center mt-1">
                <div class="flex text-yellow-400 mr-2">
                  <i class="fas fa-star" v-for="n in testimonial.rating" :key="n"></i>
                </div>
                <span class="text-sm text-gray-500">{{ testimonial.date }}</span>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <span 
              class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2"
              v-for="(tag, index) in testimonial.tags"
              :key="index"
            >
              {{ tag }}
            </span>
          </div>
          
          <p class="text-gray-700 mb-4 italic">"{{ testimonial.quote }}"</p>
          
          <div class="flex items-center text-sm text-gray-500">
            <i class="fas fa-graduation-cap mr-2"></i>
            <span>Curso: {{ testimonial.course }}</span>
          </div>
        </div>
      </div>
  
      <!-- Paginação -->
      <div class="flex justify-center mb-12">
        <nav class="inline-flex rounded-md shadow">
          <button
            @click="currentPage = page"
            v-for="page in totalPages"
            :key="page"
            :class="{'bg-blue-600 text-white': currentPage === page, 'bg-white text-gray-700 hover:bg-gray-50': currentPage !== page}"
            class="px-4 py-2 border border-gray-300 rounded-md mx-1"
          >
            {{ page }}
          </button>
        </nav>
      </div>
  
      <!-- Seção de Envio de Depoimento -->
      <div class="bg-blue-50 p-8 rounded-xl shadow-md mb-12">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Deixe Seu Depoimento</h2>
        <form @submit.prevent="submitTestimonial" class="max-w-2xl mx-auto">
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
              <input
                v-model="newTestimonial.name"
                type="text"
                id="name"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
            </div>
            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Seu Cargo/Área</label>
              <input
                v-model="newTestimonial.role"
                type="text"
                id="role"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
            </div>
          </div>
          
          <div class="mb-6">
            <label for="course" class="block text-sm font-medium text-gray-700 mb-1">Curso Realizado</label>
            <select
              v-model="newTestimonial.course"
              id="course"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled selected>Selecione um curso</option>
              <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
            </select>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Avaliação</label>
            <div class="flex space-x-2">
              <button
                type="button"
                v-for="n in 5"
                :key="n"
                @click="newTestimonial.rating = n"
                :class="{'text-yellow-400': n <= newTestimonial.rating, 'text-gray-300': n > newTestimonial.rating}"
                class="text-2xl focus:outline-none"
              >
                ★
              </button>
            </div>
          </div>
          
          <div class="mb-6">
            <label for="testimonial" class="block text-sm font-medium text-gray-700 mb-1">Seu Depoimento</label>
            <textarea
              v-model="newTestimonial.quote"
              id="testimonial"
              rows="4"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Compartilhe sua experiência com nossa plataforma..."
            ></textarea>
          </div>
          
          <div class="text-center">
            <button
              type="submit"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <i class="fas fa-paper-plane mr-2"></i> Enviar Depoimento
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Dados dos cursos disponíveis
  const courses = ref([
    'Machine Learning',
    'Data Science',
    'Python Avançado',
    'Deep Learning',
    'Análise de Dados',
    'Inteligência Artificial'
  ])
  
  // Estado para filtros e ordenação
  const selectedCourse = ref('all')
  const sortBy = ref('recent')
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = 6
  
  // Novo depoimento
  const newTestimonial = ref({
    name: '',
    role: '',
    course: '',
    rating: 0,
    quote: ''
  })
  
  // Lista de depoimentos (simulando dados do banco)
  const testimonials = ref([
    {
      id: 1,
      name: 'Carlos Silva',
      role: 'Engenheiro de Dados',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'A plataforma revolucionou minha carreira. Em 3 meses consegui minha certificação em IA e já estou aplicando os conhecimentos no meu trabalho diário.',
      rating: 5,
      course: 'Machine Learning',
      date: '15/05/2023',
      tags: ['Recomendo', 'Conteúdo Prático', 'Instrutores Qualificados']
    },
    {
      id: 2,
      name: 'Ana Oliveira',
      role: 'Cientista de Dados Jr',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'O conteúdo personalizado me ajudou a focar exatamente no que eu precisava aprender. A metodologia é incrível!',
      rating: 5,
      course: 'Data Science',
      date: '22/06/2023',
      tags: ['Aprendizado Acelerado', 'Suporte Excelente']
    },
    {
      id: 3,
      name: 'Roberto Costa',
      role: 'Desenvolvedor Python',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      quote: 'Finalmente encontrei um curso que realmente ensina Python para Data Science de forma prática e objetiva.',
      rating: 4,
      course: 'Python Avançado',
      date: '10/04/2023',
      tags: ['Projetos Reais', 'Didática Clara']
    },
    {
      id: 4,
      name: 'Juliana Santos',
      role: 'Analista de BI',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      quote: 'O suporte 24/7 foi essencial para mim que estudo à noite. Sempre tinha alguém para tirar minhas dúvidas.',
      rating: 5,
      course: 'Análise de Dados',
      date: '05/07/2023',
      tags: ['Flexibilidade', 'Suporte 24/7']
    },
    {
      id: 5,
      name: 'Marcos Ribeiro',
      role: 'Estudante de Engenharia',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      quote: 'Como iniciante em programação, achei o material muito bem estruturado e com curva de aprendizado perfeita.',
      rating: 4,
      course: 'Python Avançado',
      date: '18/03/2023',
      tags: ['Para Iniciantes', 'Passo a Passo']
    },
    {
      id: 6,
      name: 'Fernanda Lima',
      role: 'Pesquisadora em IA',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      quote: 'Os conceitos de Deep Learning foram explicados de forma tão clara que finalmente consegui aplicar em minha pesquisa.',
      rating: 5,
      course: 'Deep Learning',
      date: '30/06/2023',
      tags: ['Conteúdo Avançado', 'Aplicações Práticas']
    }
  ])
  
  // Depoimentos filtrados e ordenados
  const filteredTestimonials = computed(() => {
    let result = [...testimonials.value]
    
    // Filtro por curso
    if (selectedCourse.value !== 'all') {
      result = result.filter(t => t.course === selectedCourse.value)
    }
    
    // Filtro por busca
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(t => 
        t.name.toLowerCase().includes(query) || 
        t.quote.toLowerCase().includes(query) ||
        t.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    // Ordenação
    if (sortBy.value === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else {
      // Ordenação por data (simplificada)
      result.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')))
    }
    
    // Paginação
    const start = (currentPage.value - 1) * itemsPerPage
    return result.slice(start, start + itemsPerPage)
  })
  
  // Total de páginas
  const totalPages = computed(() => {
    return Math.ceil(testimonials.value.length / itemsPerPage)
  })
  
  // Enviar novo depoimento
  const submitTestimonial = () => {
    const newId = Math.max(...testimonials.value.map(t => t.id)) + 1
    const today = new Date()
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
    
    testimonials.value.unshift({
      id: newId,
      name: newTestimonial.value.name,
      role: newTestimonial.value.role,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      quote: newTestimonial.value.quote,
      rating: newTestimonial.value.rating,
      course: newTestimonial.value.course,
      date: formattedDate,
      tags: ['Novo Depoimento']
    })
    
    // Resetar formulário
    newTestimonial.value = {
      name: '',
      role: '',
      course: '',
      rating: 0,
      quote: ''
    }
    
    // Mostrar feedback (você pode substituir por um toast real)
    alert('Depoimento enviado com sucesso! Obrigado por compartilhar sua experiência.')
  }
  </script>
  
  <style scoped>
  .depoimentos-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Estilo para o hover nos cards de depoimento */
  .border-l-4 {
    transition: border-color 0.3s ease;
  }
  
  .border-l-4:hover {
    border-color: #3b82f6;
  }
  
  /* Estilo para os botões de avaliação */
  button[type="button"].text-2xl {
    transition: transform 0.2s ease;
  }
  
  button[type="button"].text-2xl:hover {
    transform: scale(1.2);
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .depoimentos-page {
      padding: 0 0.5rem;
    }
  }
  </style>