export const useAuthUser = () => {
    return useState('user', () => {
      // Tenta recuperar do localStorage se existir
      if (process.client) {
        const savedUser = localStorage.getItem('authUser')
        return savedUser ? JSON.parse(savedUser) : null
      }
      return null
    })
  }
  
  export const useAuth = () => {
    const user = useAuthUser()
    
    const setUser = (email) => {
      user.value = { email }
      // Salva no localStorage
      if (process.client) {
        localStorage.setItem('authUser', JSON.stringify({ email }))
      }
    }
    
    const clearUser = () => {
      user.value = null
      // Remove do localStorage
      if (process.client) {
        localStorage.removeItem('authUser')
      }
    }
    
    return {
      user,
      setUser,
      clearUser
    }
  }