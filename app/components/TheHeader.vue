<template>
  <header class="bg-secondary-900 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span class="text-white text-xl font-bold">Sistema Cadastro</span>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink 
            to="/" 
            class="text-white hover:text-primary-400 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
            :class="{ 'text-primary-400 bg-secondary-800': $route.path === '/' }"
          >
            Início
          </NuxtLink>
          <NuxtLink 
            to="/novocadastro" 
            class="text-white hover:text-primary-400 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
            :class="{ 'text-primary-400 bg-secondary-800': $route.path === '/novocadastro' }"
          >
            Novo Cadastro
          </NuxtLink>
          <NuxtLink 
            to="/login" 
            class="text-white hover:text-primary-400 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
            :class="{ 'text-primary-400 bg-secondary-800': $route.path === '/login' }"
          >
            Login
          </NuxtLink>
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu"
            type="button" 
            class="text-white hover:text-primary-400 inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200"
            aria-expanded="false"
          >
            <span class="sr-only">Abrir menu principal</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="isMobileMenuOpen" class="md:hidden border-t border-secondary-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink 
            to="/" 
            @click="closeMobileMenu"
            class="text-white hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            :class="{ 'text-primary-400 bg-secondary-800': $route.path === '/' }"
          >
            Início
          </NuxtLink>
          <NuxtLink 
            to="/novocadastro" 
            @click="closeMobileMenu"
            class="text-white hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            :class="{ 'text-primary-400 bg-secondary-800': $route.path === '/novocadastro' }"
          >
            Novo Cadastro
          </NuxtLink>
          <NuxtLink 
            to="/login" 
            @click="closeMobileMenu"
            class="text-white hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            :class="{ 'text-primary-400 bg-secondary-800': $route.path === '/login' }"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
