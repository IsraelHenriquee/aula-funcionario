import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Verificar se as variáveis de ambiente estão disponíveis
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.public.supabaseKey as string
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Variáveis de ambiente do Supabase não encontradas')
    throw new Error('Configuração do Supabase não encontrada')
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  return {
    provide: {
      supabase
    }
  }
})
