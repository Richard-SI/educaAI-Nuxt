<template>
  <nav class="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 rounded-b-xl">
    <div class="flex items-center space-x-2">
      <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-3 7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 000 2h4a1 1 0 100-2H8z"></path>
      </svg>
      <span class="text-2xl font-bold text-gray-800">EducaAI</span>
    </div>
    
    <div class="space-x-6 hidden md:flex">
      <NuxtLink to="/" class="nav-link text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-1 rounded-md">Início</NuxtLink>
      
      <!-- Aluno - visível para admin e aluno -->
      <NuxtLink 
        v-if="user?.email === 'admin@admin.com' || user?.email === 'aluno@aluno.com'"
        to="/student" 
        class="nav-link text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-1 rounded-md"
      >
        Aluno
      </NuxtLink>
      
      <!-- Professor - visível para admin e professor -->
      <NuxtLink 
        v-if="user?.email === 'admin@admin.com' || user?.email === 'professor@professor.com'"
        to="/teacher" 
        class="nav-link text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-1 rounded-md"
      >
        Professor
      </NuxtLink>
      
      <NuxtLink 
        v-if="user" 
        to="/resources" 
        class="nav-link text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-1 rounded-md"
      >
        Recursos
      </NuxtLink>
      
      <NuxtLink 
        v-if="user" 
        to="/forum" 
        class="nav-link text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-1 rounded-md"
      >
        Comunicação
      </NuxtLink>
    </div>
    
    <!-- Botão de Login/Logout -->
    <div v-if="!user">
      <NuxtLink 
        to="/login" 
        class="bg-blue-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base font-semibold"
      >
        Login
      </NuxtLink>
    </div>
    
    <div v-else class="flex items-center space-x-4">
      <span class="text-gray-700 hidden md:block">{{ user.email }}</span>
      <button 
        @click="logout"
        class="bg-red-500 text-white py-2 px-5 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 text-sm md:text-base font-semibold"
      >
        Sair
      </button>
    </div>
  </nav>
</template>

<script setup>
const user = useAuthUser() // Usaremos composable para gerenciar estado

// Simulação de logout
const logout = () => {
  user.value = null
  navigateTo('/login')
}
</script>

<style scoped>
.nav-link.router-link-exact-active {
  border-bottom: 2px solid #3b82f6;
  color: #3b82f6;
  font-weight: 600;
}
</style>