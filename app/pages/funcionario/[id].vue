<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      <span class="ml-2 text-text-muted">Carregando funcionário...</span>
    </div>

    <div v-else-if="error" class="bg-error-50 border border-error-200 rounded-lg p-4 mb-4">
      <div class="flex">
        <div class="text-error-400">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-error-800">Erro ao carregar funcionário</h3>
          <p class="mt-1 text-sm text-error-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="!funcionario" class="text-center py-8">
      <div class="text-text-muted">
        <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 class="mt-2 text-sm font-medium text-text-dark">Funcionário não encontrado</h3>
      <p class="mt-1 text-sm text-text-muted">O funcionário solicitado não existe ou foi removido.</p>
    </div>

    <FormFuncionario v-else :is-novo="false" :funcionario="funcionario" />
  </div>
</template>

<script setup lang="ts">
import FormFuncionario from '~/components/FormFuncionario.vue'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const { buscarFuncionarioPorId, loading, error } = useFuncionario()

// Buscar funcionário por ID
const funcionario = ref(null)

onMounted(async () => {
  const id = parseInt(route.params.id as string)
  if (id) {
    funcionario.value = await buscarFuncionarioPorId(id)
  }
})
</script>