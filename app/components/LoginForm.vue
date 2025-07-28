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
          :disabled="loading"
          :loading="loading"
          @click="handleLogin"
        >
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </BaseButton>

        <!-- Mensagem de sucesso -->
        <div v-if="success" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-sm text-green-600 font-medium">{{ success }}</p>
            </div>
          </div>
        </div>

        <!-- Mensagem de erro -->
        <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-sm text-red-600 font-medium">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Aba Registro -->
      <div v-else-if="activeTab === 'register'" class="space-y-4">
        <h2 class="text-2xl font-bold text-secondary-900 text-center mb-6">
          Criar uma conta
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
          <label for="register-confirmPassword" class="block text-sm font-medium text-secondary-700 mb-2">
            Confirmar Senha
          </label>
          <BasePasswordInput
            id="register-confirmPassword"
            v-model="registerForm.confirmPassword"
            placeholder="Confirme sua senha"
          />
        </div>

        <BaseButton
          type="button"
          variant="primary"
          class="w-full mt-6"
          :disabled="loading"
          :loading="loading"
          @click="handleRegister"
        >
          {{ loading ? 'Criando conta...' : 'Criar conta' }}
        </BaseButton>

        <!-- Mensagem de sucesso para registro -->
        <div v-if="success" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-sm text-green-600 font-medium">{{ success }}</p>
            </div>
          </div>
        </div>

        <!-- Mensagem de erro para registro -->
        <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-sm text-red-600 font-medium">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import BasePasswordInput from './BasePasswordInput.vue'
import BaseButton from './BaseButton.vue'

interface LoginForm {
  email: string
  password: string
}

interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
}

const { login, register } = useAuth()
const router = useRouter()

const activeTab = ref<'login' | 'register'>('login')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const loginForm = reactive<LoginForm>({
  email: '',
  password: ''
})

const registerForm = reactive<RegisterForm>({
  email: '',
  password: '',
  confirmPassword: ''
})

const handleLogin = async () => {
  try {
    error.value = null
    success.value = null
    
    // Validação simples
    if (!loginForm.email || !loginForm.password) {
      error.value = 'Por favor, preencha todos os campos'
      return
    }

    loading.value = true
    
    await login(loginForm)
    success.value = 'Login realizado com sucesso!'
    // Redirecionar após 1.5 segundos
    setTimeout(() => {
      navigateTo('/')
    }, 1500)
    
  } catch (err: any) {
    error.value = err.message || 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  try {
    error.value = null
    success.value = null
    
    // Validação
    if (!registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      error.value = 'Por favor, preencha todos os campos'
      return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      error.value = 'As senhas não coincidem'
      return
    }

    if (registerForm.password.length < 6) {
      error.value = 'A senha deve ter pelo menos 6 caracteres'
      return
    }

    loading.value = true
    
    // Criar conta no Supabase
    await register({
      email: registerForm.email,
      password: registerForm.password
    })
    
    success.value = 'Conta criada com sucesso! Verifique seu e-mail para confirmar.'
    
    // Limpar formulário
    registerForm.email = ''
    registerForm.password = ''
    registerForm.confirmPassword = ''
    
    // Trocar para aba de login após alguns segundos
    setTimeout(() => {
      activeTab.value = 'login'
      success.value = null
    }, 3000)
    
  } catch (err: any) {
    error.value = err.message || 'Erro ao criar conta'
  } finally {
    loading.value = false
  }
}

// Limpar mensagens quando trocar de aba
watch(activeTab, () => {
  error.value = null
  success.value = null
})
</script>

<style scoped>
/* Estilos personalizados se necessário */
</style>
