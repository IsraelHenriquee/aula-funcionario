<template>
    <div class="w-full">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span class="ml-2 text-text-muted">Carregando funcionários...</span>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-error-50 border border-error-200 rounded-lg p-4 mb-4">
            <div class="flex">
                <div class="text-error-400">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-error-800">Erro ao carregar funcionários</h3>
                    <p class="mt-1 text-sm text-error-700">{{ error }}</p>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div v-else class="bg-surface-light shadow-sm rounded-lg border border-border overflow-hidden">
            <div class="px-6 py-4 border-b border-border">
                <h2 class="text-lg font-semibold text-text-dark">Lista de Funcionários</h2>
                <p class="text-sm text-text-muted mt-1">{{ funcionarios.length }} funcionário(s) encontrado(s)</p>
            </div>

            <div v-if="funcionarios.length === 0" class="px-6 py-8 text-center">
                <div class="text-text-muted">
                    <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h3 class="mt-2 text-sm font-medium text-text-dark">Nenhum funcionário encontrado</h3>
                <p class="mt-1 text-sm text-text-muted">Não há funcionários cadastrados no sistema.</p>
            </div>

            <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-border">
                    <thead class="bg-surface">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                Nome
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                Cargo
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                Email
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-surface-light divide-y divide-border">
                        <tr v-for="funcionario in funcionarios" :key="funcionario.id" class="hover:bg-surface">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-text-dark">{{ funcionario.nome }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-text-dark">{{ funcionario.cargo }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-text-dark">{{ funcionario.email || '-' }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex space-x-2">
                                    <button @click="editarFuncionario(funcionario.id)"
                                        class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                                        <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Editar
                                    </button>
                                    <button @click="confirmarDelecao(funcionario)"
                                        class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-error-600 bg-error-50 hover:bg-error-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-500 transition-colors">
                                        <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Deletar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal de Confirmação -->
        <ModalConfirmacao :is-open="modalAberto" :loading="deletandoFuncionario" titulo="Deletar Funcionário"
            :mensagem="`Tem certeza que deseja deletar o funcionário '${funcionarioParaDeletar?.nome}'? Esta ação não pode ser desfeita.`"
            @close="fecharModal" @confirm="deletarFuncionarioConfirmado" />
    </div>
</template>

<script setup lang="ts">
// Usar o composable diretamente no componente
const { funcionarios, loading, error, buscarFuncionarios, deletarFuncionario } = useFuncionario()
const toast = useToast()

// Buscar funcionários ao montar o componente
onMounted(async () => {
    await buscarFuncionarios()
})

// Função para navegar para edição
const editarFuncionario = (id: number) => {
    navigateTo(`/funcionario/${id}`)
}

// Estado do modal de confirmação
const modalAberto = ref(false)
const funcionarioParaDeletar = ref<{ id: number; nome: string } | null>(null)
const deletandoFuncionario = ref(false)

// Função para abrir modal de confirmação
const confirmarDelecao = (funcionario: any) => {
    funcionarioParaDeletar.value = { id: funcionario.id, nome: funcionario.nome }
    modalAberto.value = true
}

// Função para fechar modal
const fecharModal = () => {
    modalAberto.value = false
    funcionarioParaDeletar.value = null
}

// Função para deletar funcionário
const deletarFuncionarioConfirmado = async () => {
    if (!funcionarioParaDeletar.value) return

    try {
        deletandoFuncionario.value = true
        await deletarFuncionario(funcionarioParaDeletar.value.id)
        toast.success('Funcionário deletado com sucesso!')
        fecharModal()
    } catch (error) {
        toast.error('Erro ao deletar funcionário. Tente novamente.')
    } finally {
        deletandoFuncionario.value = false
    }
}
</script>