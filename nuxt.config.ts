export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  ssr: true,
  routeRules: {
    '/teacher/students/**': { ssr: false } // Desativa SSR para estas rotas
  },
  app: {
    head: {
      title: 'EducaAI',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      auth: {
        adminEmail: 'admin@admin.com',
        professorEmail: 'professor@professor.com',
        studentEmail: 'aluno@aluno.com'
      },
      ollama: { 
        baseUrl: 'http://localhost:11434', // URL padrão do Ollama
        defaultModel: 'phi3', // Modelo padrão
        timeout: 30000, // Tempo máximo de espera (30 segundos)
        systemPrompt: 'Você é um tutor educacional especializado em IA e programação. Seja claro e conciso.' // Prompt padrão
      }
    }
  }
})