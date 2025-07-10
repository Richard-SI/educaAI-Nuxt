export default defineNuxtRouteMiddleware((to) => {
    const user = useAuthUser()
    
    // Páginas que não requerem autenticação
    const publicPages = ['/', '/login']
    
    // Se tentar acessar página protegida sem estar logado
    if (!publicPages.includes(to.path) && !user.value) {
      return navigateTo('/login')
    }
    
    // Verificação de perfil
    if (user.value) {
      // Se for aluno tentando acessar área do professor
      if (user.value.email === 'aluno@aluno.com' && user.value.password === 1234 && to.path.startsWith('/teacher')) {
        return navigateTo('/')
      }
      
      // Se for professor tentando acessar área do aluno
      if (user.value.email === 'professor@professor.com' && user.value.password === 1234 && to.path.startsWith('/student')) {
        return navigateTo('/')
      }
    }
  })