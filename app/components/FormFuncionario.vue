<template>
    <div class="bg-surface-light shadow-sm rounded-lg border border-border p-6">
        <h2 class="text-lg font-semibold text-text-dark mb-6">
            {{ isNovo ? 'Novo Funcionário' : 'Editar Funcionário' }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Nome -->
            <BaseInput v-model="form.nome" label="Nome" type="text" placeholder="Digite o nome completo" required />

            <!-- Cargo -->
            <BaseDropdown v-model="form.cargo" label="Cargo" :options="cargoOptions" placeholder="Selecione um cargo"
                required />

            <!-- Endereço -->
            <BaseInput v-model="form.endereco" label="Endereço" type="text"
                placeholder="Digite o endereço (opcional)" />

            <!-- Email -->
            <BaseInput v-model="form.email" label="Email" type="email" placeholder="Digite o email (opcional)" />

            <!-- Salário -->
            <BaseInput v-model="form.salario" label="Salário" type="number" step="0.01" placeholder="Digite o salário"
                required />

            <!-- Botão -->
            <div class="flex justify-end pt-4">
                <button type="submit" :disabled="funcionarioLoading"
                    class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                    <div v-if="funcionarioLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {{ funcionarioLoading ? 'Salvando...' : (isNovo ? 'Salvar' : 'Editar') }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import type { Funcionario } from '~/types/funcionario'

interface Props {
    isNovo?: boolean
    funcionario?: Funcionario | null
}

const props = withDefaults(defineProps<Props>(), {
    isNovo: true,
    funcionario: null
})

// Opções de cargo
const cargoOptions = [
    'Analista de Suporte Técnico',
    'Desenvolvedor Frontend',
    'Gerente Financeiro',
    'Assistente de Recursos Humanos',
    'Coordenador de Projetos',
    'Analista de Dados',
    'Consultor Comercial',
    'Designer Gráfico',
    'Engenheiro de Produção',
    'Diretor de Operações'
]

// Formulário reativo
const form = reactive({
    nome: '',
    cargo: '',
    endereco: '',
    email: '',
    salario: 0
})

// Preencher formulário quando funcionario prop mudar
watch(() => props.funcionario, (funcionario) => {
    if (funcionario) {
        form.nome = funcionario.nome
        form.cargo = funcionario.cargo
        form.endereco = funcionario.endereco || ''
        form.email = funcionario.email || ''
        form.salario = funcionario.salario
    }
}, { immediate: true })

// Composables
const { salvarFuncionario, editarFuncionario, loading: funcionarioLoading } = useFuncionario()
const toast = useToast()

// Função para resetar o formulário
const resetForm = () => {
    form.nome = ''
    form.cargo = ''
    form.endereco = ''
    form.email = ''
    form.salario = 0
}

// Função para lidar com o submit
const handleSubmit = async () => {
    // Validação básica
    if (!form.nome.trim() || !form.cargo.trim() || form.salario <= 0) {
        toast.warning('Preencha todos os campos obrigatórios')
        return
    }

    // Preparar dados
    const funcionarioData = {
        nome: form.nome.trim(),
        cargo: form.cargo,
        endereco: form.endereco.trim() || null,
        email: form.email.trim() || null,
        salario: Number(form.salario)
    }

    if (props.isNovo) {
        try {
            await salvarFuncionario(funcionarioData)
            toast.success('Funcionário salvo com sucesso!')
            resetForm()
        } catch (error) {
            toast.error('Erro ao salvar funcionário. Tente novamente.')
        }
    } else {
        try {
            if (!props.funcionario?.id) {
                toast.error('ID do funcionário não encontrado')
                return
            }

            await editarFuncionario(props.funcionario.id, funcionarioData)
            toast.success('Funcionário editado com sucesso!')
            
            // Navegar para a página index
            await navigateTo('/')
        } catch (error) {
            toast.error('Erro ao editar funcionário. Tente novamente.')
        }
    }
}
</script>