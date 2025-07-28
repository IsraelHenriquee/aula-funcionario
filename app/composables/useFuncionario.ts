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

    // Função para salvar novo funcionário
    const salvarFuncionario = async (funcionario: Omit<Funcionario, 'id' | 'created_at'>) => {
        try {
            loading.value = true
            error.value = null

            const supabase = getSupabase()
            const { data, error: supabaseError } = await supabase
                .from('funcionarios')
                .insert([funcionario])
                .select()

            if (supabaseError) {
                throw supabaseError
            }

            // Atualizar a lista local se existir
            if (data && data.length > 0) {
                funcionarios.value = [...funcionarios.value, ...data]
            }

            return data
        } catch (err: any) {
            error.value = err.message || 'Erro ao salvar funcionário'
            console.error('Erro ao salvar funcionário:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // Função para buscar funcionário por ID
    const buscarFuncionarioPorId = async (id: number): Promise<Funcionario | null> => {
        try {
            // Primeiro tenta encontrar nos dados já carregados
            const funcionarioExistente = funcionarios.value.find(f => f.id === id)
            if (funcionarioExistente) {
                return funcionarioExistente
            }

            // Se não encontrar, faz busca no Supabase
            loading.value = true
            error.value = null

            const supabase = getSupabase()
            const { data, error: supabaseError } = await supabase
                .from('funcionarios')
                .select('*')
                .eq('id', id)
                .single()

            if (supabaseError) {
                throw supabaseError
            }

            return data
        } catch (err: any) {
            error.value = err.message || 'Erro ao buscar funcionário'
            console.error('Erro ao buscar funcionário:', err)
            return null
        } finally {
            loading.value = false
        }
    }

    // Função para editar funcionário
    const editarFuncionario = async (id: number, funcionario: Omit<Funcionario, 'id' | 'created_at'>) => {
        try {
            loading.value = true
            error.value = null

            const supabase = getSupabase()
            const { data, error: supabaseError } = await supabase
                .from('funcionarios')
                .update(funcionario)
                .eq('id', id)
                .select()

            if (supabaseError) {
                throw supabaseError
            }

            // Atualizar a lista local se existir
            if (data && data.length > 0) {
                const funcionarioAtualizado = data[0]
                const index = funcionarios.value.findIndex(f => f.id === id)
                if (index !== -1) {
                    funcionarios.value[index] = funcionarioAtualizado
                }
            }

            return data
        } catch (err: any) {
            error.value = err.message || 'Erro ao editar funcionário'
            console.error('Erro ao editar funcionário:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // Função para deletar funcionário
    const deletarFuncionario = async (id: number) => {
        try {
            loading.value = true
            error.value = null

            const supabase = getSupabase()
            const { error: supabaseError } = await supabase
                .from('funcionarios')
                .delete()
                .eq('id', id)

            if (supabaseError) {
                throw supabaseError
            }

            // Remover da lista local
            funcionarios.value = funcionarios.value.filter(f => f.id !== id)

            return true
        } catch (err: any) {
            error.value = err.message || 'Erro ao deletar funcionário'
            console.error('Erro ao deletar funcionário:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        funcionarios: readonly(funcionarios),
        loading: readonly(loading),
        error: readonly(error),
        buscarFuncionarios,
        salvarFuncionario,
        buscarFuncionarioPorId,
        editarFuncionario,
        deletarFuncionario
    }
}