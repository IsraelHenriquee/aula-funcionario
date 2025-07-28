import type { Funcionario } from '~/types/funcionario'

export const useFuncionario = () => {
    // Estado reativo para armazenar os funcionários
    const funcionarios = ref<Funcionario[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Verificar se o Supabase está disponível (apenas no cliente)
    const getSupabase = () => {
        if (!import.meta.client) {
            throw new Error('useFuncionario deve ser usado apenas no cliente')
        }

        const nuxtApp = useNuxtApp()

        // Aguardar o plugin estar disponível
        if (!nuxtApp.$supabase) {
            throw new Error('Supabase não está disponível. Aguarde o carregamento do plugin.')
        }
        return nuxtApp.$supabase
    }

    // Função para buscar todos os funcionários
    const buscarFuncionarios = async () => {
        try {
            loading.value = true
            error.value = null

            const supabase = getSupabase()
            const { data, error: supabaseError } = await supabase
                .from('funcionarios')
                .select('*')
                .order('nome', { ascending: true })

            if (supabaseError) {
                throw supabaseError
            }

            funcionarios.value = data || []
        } catch (err: any) {
            error.value = err.message || 'Erro ao buscar funcionários'
            console.error('Erro ao buscar funcionários:', err)
        } finally {
            loading.value = false
        }
    }

    return {
        funcionarios: readonly(funcionarios),
        loading: readonly(loading),
        error: readonly(error),
        buscarFuncionarios
    }
}