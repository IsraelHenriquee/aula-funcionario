<template>
  <div class="space-y-2">
    <label
      v-if="label"
      :for="inputId"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="text-error-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="inputClasses"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      
      <!-- Ícone de loading -->
      <div
        v-if="loading"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <svg class="animate-spin h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>

    <!-- Mensagem de erro -->
    <p
      v-if="error"
      class="text-sm text-error-500 flex items-center"
    >
      <svg class="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
      </svg>
      {{ error }}
    </p>

    <!-- Texto de ajuda -->
    <p
      v-if="helpText && !error"
      class="text-sm text-text-muted"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type InputHTMLAttributes } from 'vue'

interface Props {
  modelValue?: string | number
  label?: string
  type?: InputHTMLAttributes['type']
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  loading?: boolean
  error?: string
  helpText?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  loading: false,
  size: 'md',
  variant: 'default'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
}>()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const labelClasses = computed(() => [
  'block',
  'text-sm',
  'font-medium',
  'text-text-dark',
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
    'focus:ring-4',
    'focus:ring-opacity-50',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:bg-surface-DEFAULT'
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
      'border-error-500',
      'text-error-700',
      'focus:border-error-500',
      'focus:ring-error-500'
    ]
  } else if (isFocused.value) {
    stateClasses = [
      'border-primary-500',
      'focus:border-primary-500',
      'focus:ring-primary'
    ]
  } else {
    stateClasses = [
      'border-border-light',
      'hover:border-border-DEFAULT',
      'focus:border-primary-500',
      'focus:ring-primary'
    ]
  }

  // Variantes
  const variantClasses = {
    default: ['bg-surface-light'],
    filled: ['bg-surface-DEFAULT']
  }

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...stateClasses,
    ...variantClasses[props.variant]
  ]
})

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

// Observa mudanças no erro para resetar o foco
watch(() => props.error, (newError) => {
  if (newError) {
    isFocused.value = false
  }
})
</script>
