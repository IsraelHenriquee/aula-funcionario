export default defineNuxtRouteMiddleware(async (to, from) => {
  // Só executar no cliente
  if (!import.meta.client) return
  
  try {
    // Aguardar o Nuxt App estar totalmente carregado
    const nuxtApp = useNuxtApp()
    
    // Verificar se o Supabase está disponível, se não, aguardar um pouco
    let attempts = 0
    while (!nuxtApp.$supabase && attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }
    
    // Se ainda não tiver o Supabase após as tentativas, pular a verificação
    if (!nuxtApp.$supabase) {
      console.warn('Supabase não carregado, pulando verificação de auth')
      return
    }
    
    const { user, checkUser } = useAuth()
    
    // Verificar usuário atual
    await checkUser()
    
    // Rota pública (apenas login)
    if (to.path === '/login') {
      // Se já estiver logado e tentar acessar login, redirecionar para home
      if (user.value) {
        return navigateTo('/')
      }
      return
    }

    // Para todas as outras rotas, verificar se está logado
    if (!user.value) {
      return navigateTo('/login')
    }
    
  } catch (error) {
    console.error('Erro no middleware de auth:', error)
    // Em caso de erro, só redirecionar se não estiver no login
    if (to.path !== '/login') {
      return navigateTo('/login')
    }
  }
})
