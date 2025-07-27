<template>
  <footer class="bg-secondary-900 border-t border-secondary-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Seção Sobre -->
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-6 h-6 bg-primary-500 rounded flex items-center justify-center">
                <span class="text-white font-bold text-sm">S</span>
              </div>
              <span class="text-white text-lg font-semibold">Sistema Cadastro</span>
            </div>
            <p class="text-secondary-300 text-sm leading-relaxed">
              Sistema moderno e eficiente para gerenciamento de cadastros e dados.
            </p>
          </div>

          <!-- Links Rápidos -->
          <div>
            <h3 class="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Links Rápidos
            </h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink 
                  to="/" 
                  class="text-secondary-300 hover:text-primary-400 text-sm transition-colors duration-200"
                >
                  Início
                </NuxtLink>
              </li>
              <li>
                <NuxtLink 
                  to="/novocadastro" 
                  class="text-secondary-300 hover:text-primary-400 text-sm transition-colors duration-200"
                >
                  Novo Cadastro
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Informações de Contato -->
          <div>
            <h3 class="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contato
            </h3>
            <div class="space-y-2">
              <p class="text-secondary-300 text-sm">
                <span class="inline-block w-4 text-primary-400">📧</span>
                contato@sistemacadastro.com
              </p>
              <p class="text-secondary-300 text-sm">
                <span class="inline-block w-4 text-primary-400">📱</span>
                (11) 9999-9999
              </p>
              <p class="text-secondary-300 text-sm">
                <span class="inline-block w-4 text-primary-400">🏢</span>
                São Paulo, SP - Brasil
              </p>
            </div>
          </div>
        </div>

        <!-- Linha divisória e copyright -->
        <div class="border-t border-secondary-700 mt-8 pt-6">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-secondary-400 text-sm">
              © {{ currentYear }} Sistema Cadastro. Todos os direitos reservados.
            </p>
            <div class="flex space-x-4 mt-4 md:mt-0">
              <a href="#" class="text-secondary-400 hover:text-primary-400 text-sm transition-colors duration-200">
                Política de Privacidade
              </a>
              <a href="#" class="text-secondary-400 hover:text-primary-400 text-sm transition-colors duration-200">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
