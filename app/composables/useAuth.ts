import type { User } from '@supabase/supabase-js'
import type { LoginCredentials } from '~/types/auth'

interface AuthState {
  user: Ref<User | null>
  loading: Ref<boolean>
  error: Ref<string | null>
}

export const useAuth = (): AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  checkUser: () => Promise<void>
  register: (credentials: LoginCredentials) => Promise<void>
} => {
  const nuxtApp = useNuxtApp()
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Verificar se o Supabase está disponível (apenas no cliente)
  const getSupabase = () => {
    if (!import.meta.client) {
      throw new Error('useAuth deve ser usado apenas no cliente')
    }
    
    const nuxtApp = useNuxtApp()
    
    // Aguardar o plugin estar disponível
    if (!nuxtApp.$supabase) {
      throw new Error('Supabase não está disponível. Aguarde o carregamento do plugin.')
    }
    return nuxtApp.$supabase
  }

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const supabase = getSupabase()
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      })

      if (loginError) {
        // Propagar o erro com mais detalhes
        const errorToThrow = new Error(loginError.message)
        ;(errorToThrow as any).code = loginError.code
        ;(errorToThrow as any).details = loginError
        throw errorToThrow
      }

      if (data.user) {
        user.value = data.user
        // Redirecionar para página inicial após login bem-sucedido
        await navigateTo('/')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao fazer login'
      // Re-propagar o erro para o componente
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const supabase = getSupabase()
      const { error: logoutError } = await supabase.auth.signOut()

      if (logoutError) {
        throw new Error(logoutError.message)
      }

      user.value = null
      // Redirecionar para página de login após logout
      await navigateTo('/login')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao fazer logout'
      console.error('Erro no logout:', err)
    } finally {
      loading.value = false
    }
  }

  const checkUser = async (): Promise<void> => {
    try {
      const supabase = getSupabase()
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      user.value = currentUser
    } catch (err) {
      console.error('Erro ao verificar usuário:', err)
      user.value = null
    }
  }

  const register = async (credentials: LoginCredentials): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const supabase = getSupabase()
      const { data, error: registerError } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password
      })

      if (registerError) {
        // Propagar o erro com mais detalhes
        const errorToThrow = new Error(registerError.message)
        ;(errorToThrow as any).code = registerError.code
        ;(errorToThrow as any).details = registerError
        throw errorToThrow
      }

      if (data.user) {
        user.value = data.user
        // Se o usuário foi criado e confirmado automaticamente, redirecionar
        if (data.user.email_confirmed_at) {
          await navigateTo('/')
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar conta'
      // Re-propagar o erro para o componente
      throw err
    } finally {
      loading.value = false
    }
  }

  // Escutar mudanças no estado de autenticação (apenas no cliente)
  if (import.meta.client) {
    const supabase = getSupabase()
    
    // Verificar usuário atual ao inicializar
    checkUser()
    
    supabase.auth.onAuthStateChange((event: any, session: any) => {
      user.value = session?.user || null
      
      if (event === 'SIGNED_OUT') {
        user.value = null
      }
    })
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    checkUser,
    register
  }
}
