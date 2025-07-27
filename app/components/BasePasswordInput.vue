<template>
  <div class="space-y-2">
    <label
      v-if="label"
      :for="inputId"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="inputId"
        v-model="inputValue"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="inputClasses"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      
      <!-- Botão para mostrar/ocultar senha -->
      <button
        type="button"
        @click="togglePasswordVisibility"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary-400 hover:text-secondary-600 transition-colors duration-200"
        :disabled="disabled"
      >
        <svg
          v-if="showPassword"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M18.364 5.636l-1.414 1.414M9.878 9.878l4.242 4.242m0 0L18.364 5.636m0 0l2.121-2.121L5.636 18.364l14.142-14.142z"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>
    </div>

    <!-- Mensagem de erro -->
    <p
      v-if="error"
      class="text-sm text-red-500 flex items-center"
    >
      <svg class="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
      </svg>
      {{ error }}
    </p>

    <!-- Texto de ajuda -->
    <p
      v-if="helpText && !error"
      class="text-sm text-secondary-500"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string
  helpText?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  readonly: false,
  required: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
}>()

const inputId = ref(`password-input-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)
const showPassword = ref(false)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const labelClasses = computed(() => [
  'block',
  'text-sm',
  'font-medium',
  'text-secondary-700',
  props.disabled ? 'opacity-50' : ''
])

const inputClasses = computed(() => {
  const baseClasses = [
    'block',
    'w-full',
    'rounded-lg',
    'border',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-primary-500',
    'focus:border-primary-500',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:bg-secondary-50',
    'pr-10' // Espaço para o botão do olho
  ]

  // Tamanhos
  const sizeClasses = {
    sm: ['px-3', 'py-2', 'text-sm'],
    md: ['px-4', 'py-2.5', 'text-base'],
    lg: ['px-4', 'py-3', 'text-lg']
  }

  // Estados de cor
  let stateClasses: string[] = []
  
  if (props.error) {
    stateClasses = [
      'border-red-500',
      'text-red-700',
      'focus:border-red-500',
      'focus:ring-red-500'
    ]
  } else {
    stateClasses = [
      'border-secondary-300',
      'hover:border-secondary-400',
      'focus:border-primary-500',
      'focus:ring-primary-500'
    ]
  }

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...stateClasses,
    'bg-white'
  ]
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleInput = (event: Event) => {
  emit('input', event)
}
</script>
