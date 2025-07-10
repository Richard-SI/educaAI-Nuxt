// composables/usePageNavigation.js
import { ref, watch } from 'vue'
import { useRouter } from '#imports'

export const usePageNavigation = () => {
  const router = useRouter()
  const currentPage = ref('home')
  
  // Mapeamento de rotas para páginas
  const routeToPageMap = {
    '/': 'home',
    '/student': 'student',
    '/teacher': 'teacher',
    '/resources': 'resources',
    '/forum': 'communication',
    '/login': 'login'
  }
  
  // Atualiza a página atual baseada na rota
  const updateCurrentPage = () => {
    const routePath = router.currentRoute.value.path
    currentPage.value = routeToPageMap[routePath] || 'home'
  }
  
  // Navega para uma página específica
  const navigateTo = (page) => {
    const pageToRoute = {
      'home': '/',
      'student': '/student',
      'teacher': '/teacher',
      'resources': '/resources',
      'communication': '/forum',
      'login': '/login'
    }
    
    if (pageToRoute[page]) {
      router.push(pageToRoute[page])
      currentPage.value = page
    }
  }
  
  // Observa mudanças na rota para atualizar a página atual
  watch(
    () => router.currentRoute.value.path,
    () => {
      updateCurrentPage()
    }
  )
  
  // Inicializa com a página correta
  updateCurrentPage()
  
  return {
    currentPage,
    navigateTo
  }
}