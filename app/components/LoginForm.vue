<template>
  <div class="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-secondary-200">
    <!-- Abas -->
    <div class="flex border-b border-secondary-200">
      <button
        @click="activeTab = 'login'"
        :class="[
          'flex-1 py-3 px-4 text-center font-medium transition-colors duration-200',
          activeTab === 'login' 
            ? 'text-primary-500 border-b-2 border-primary-500 bg-primary-50' 
            : 'text-secondary-600 hover:text-secondary-800'
        ]"
      >
        Entrar
      </button>
      <button
        @click="activeTab = 'register'"
        :class="[
          'flex-1 py-3 px-4 text-center font-medium transition-colors duration-200',
          activeTab === 'register' 
            ? 'text-primary-500 border-b-2 border-primary-500 bg-primary-50' 
            : 'text-secondary-600 hover:text-secondary-800'
        ]"
      >
        Criar Conta
      </button>
    </div>

    <!-- Conteúdo das Abas -->
    <div class="p-6">
      <!-- Aba Login -->
      <div v-if="activeTab === 'login'" class="space-y-4">
        <h2 class="text-2xl font-bold text-secondary-900 text-center mb-6">
          Entre na sua conta
        </h2>

        <div>
          <label for="login-email" class="block text-sm font-medium text-secondary-700 mb-2">
            E-mail
          </label>
          <BaseInput
            id="login-email"
            v-model="loginForm.email"
            type="email"
            placeholder="Digite seu e-mail"
          />
        </div>

        <div>
          <label for="login-password" class="block text-sm font-medium text-secondary-700 mb-2">
            Senha
          </label>
          <BasePasswordInput
            id="login-password"
            v-model="loginForm.password"
            placeholder="Digite sua senha"
          />
        </div>

        <BaseButton
          type="button"
          variant="primary"
          class="w-full mt-6"
        >
          Entrar
        </BaseButton>
      </div>

      <!-- Aba Criar Conta -->
      <div v-if="activeTab === 'register'" class="space-y-4">
        <h2 class="text-2xl font-bold text-secondary-900 text-center mb-6">
          Crie sua conta
        </h2>

        <div>
          <label for="register-email" class="block text-sm font-medium text-secondary-700 mb-2">
            E-mail
          </label>
          <BaseInput
            id="register-email"
            v-model="registerForm.email"
            type="email"
            placeholder="Digite seu e-mail"
          />
        </div>

        <div>
          <label for="register-password" class="block text-sm font-medium text-secondary-700 mb-2">
            Senha
          </label>
          <BasePasswordInput
            id="register-password"
            v-model="registerForm.password"
            placeholder="Digite sua senha"
          />
        </div>

        <div>
          <label for="register-confirm-password" class="block text-sm font-medium text-secondary-700 mb-2">
            Confirmar Senha
          </label>
          <BasePasswordInput
            id="register-confirm-password"
            v-model="registerForm.confirmPassword"
            placeholder="Confirme sua senha"
          />
        </div>

        <BaseButton
          type="button"
          variant="primary"
          class="w-full mt-6"
        >
          Criar Conta
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '~/components/BaseInput.vue'
import BasePasswordInput from '~/components/BasePasswordInput.vue'
import BaseButton from '~/components/BaseButton.vue'

type TabType = 'login' | 'register'

const activeTab = ref<TabType>('login')

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  email: '',
  password: '',
  confirmPassword: ''
})
</script>
