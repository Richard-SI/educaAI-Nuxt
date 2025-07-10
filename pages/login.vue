<script setup>
const email = ref('')
const password = ref('')

const { setUser } = useAuth()

const handleLogin = () => {
  // Validação do login
  if (
    (email.value === 'admin@admin.com' && password.value === '1234') ||
    (email.value === 'professor@professor.com' && password.value === '1234') ||
    (email.value === 'aluno@aluno.com' && password.value === '1234')
  ) {
    setUser(email.value)
    navigateTo('/')
  } else {
    alert('E-mail ou senha incorretos!')
  }
}
</script>


<template>

<div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
    {{ error }}
  </div>

  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        Acesse sua <span class="text-blue-600">conta EducaAI</span>
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Utilize seu e-mail e senha para acessar o sistema e continuar sua jornada de aprendizado personalizado.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-10">
      <!-- Formulário de Login -->

      <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100 float-hover">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Faça seu login</h2>
        
          <form id="login-form" class="space-y-6" @submit.prevent="handleLogin">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
      <input 
        v-model="email"
        type="email" 
        id="email" 
        name="email" 
        required
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        placeholder="seu@email.com"
      >
    </div>
    
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
      <input 
        v-model="password"
        type="password" 
        id="password" 
        name="password" 
        required
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        placeholder="••••••••"
      >
      <div class="flex justify-end mt-2">
        <a href="#forgot-password" class="text-sm text-blue-600 hover:text-blue-800">Esqueceu a senha?</a>
      </div>
    </div>
          
          <div class="flex items-center">
            <input type="checkbox" id="remember" name="remember"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
            <label for="remember" class="ml-2 block text-sm text-gray-700">Lembrar de mim</label>
          </div>
          
          <button type="submit"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md">
            Entrar
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Não tem uma conta? 
            <a href="#register" class="text-blue-600 font-medium hover:text-blue-800">Cadastre-se</a>
          </p>
        </div>
        
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Ou entre com</span>
            </div>
          </div>
          
          <div class="mt-6 grid grid-cols-2 gap-3">
            <a href="#google-login" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <i class="fab fa-google text-red-500 mr-2 mt-0.5"></i> Google
            </a>
            <a href="#microsoft-login" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <i class="fab fa-microsoft text-blue-500 mr-2 mt-0.5"></i> Microsoft
            </a>
          </div>
        </div>
      </div>
      
      <!-- Benefícios do Login -->
      <div class="space-y-6">
        <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 float-hover">
          <div class="flex items-start">
            <div class="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">Acesso Personalizado</h3>
              <p class="mt-1 text-gray-600">Continue de onde parou com seu progresso salvo e recomendações adaptadas ao seu perfil.</p>
            </div>
          </div>
        </div>
        
        <div class="bg-green-50 p-6 rounded-xl border border-green-100 float-hover">
          <div class="flex items-start">
            <div class="flex-shrink-0 bg-green-100 p-2 rounded-lg">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">Conteúdo Exclusivo</h3>
              <p class="mt-1 text-gray-600">Acesse materiais, exercícios e recursos disponíveis apenas para usuários cadastrados.</p>
            </div>
          </div>
        </div>
        
        <div class="bg-purple-50 p-6 rounded-xl border border-purple-100 float-hover">
          <div class="flex items-start">
            <div class="flex-shrink-0 bg-purple-100 p-2 rounded-lg">
              <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">Comunidade Ativa</h3>
              <p class="mt-1 text-gray-600">Participe de fóruns, grupos de estudo e interaja com outros alunos e professores.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

