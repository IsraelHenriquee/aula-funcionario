<template>
  <div class="w-full">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span class="ml-2 text-gray-600">Carregando funcionários...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div class="flex">
        <div class="text-red-400">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Erro ao carregar funcionários</h3>
          <p class="mt-1 text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div v-else class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Lista de Funcionários</h2>
        <p class="text-sm text-gray-600 mt-1">{{ funcionarios.length }} funcionário(s) encontrado(s)</p>
      </div>
      
      <div v-if="funcionarios.length === 0" class="px-6 py-8 text-center">
        <div class="text-gray-400">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum funcionário encontrado</h3>
        <p class="mt-1 text-sm text-gray-500">Não há funcionários cadastrados no sistema.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cargo
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="funcionario in funcionarios" :key="funcionario.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ funcionario.nome }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ funcionario.cargo }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ funcionario.email || '-' }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Usar o composable diretamente no componente
const { funcionarios, loading, error, buscarFuncionarios } = useFuncionario()

// Buscar funcionários ao montar o componente
onMounted(async () => {
  await buscarFuncionarios()
})
</script>