<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="mr-2">
      <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, type ButtonHTMLAttributes } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: ButtonHTMLAttributes['type']
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-semibold',
    'rounded-lg',
    'transition-all',
    'duration-300',
    'focus:outline-none',
    'focus:ring-4',
    'focus:ring-opacity-50',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:transform-none'
  ]

  // Tamanhos
  const sizeClasses = {
    sm: ['px-3', 'py-2', 'text-sm'],
    md: ['px-4', 'py-2.5', 'text-base'],
    lg: ['px-6', 'py-3', 'text-lg']
  }

  // Variantes
  const variantClasses = {
    primary: [
      'bg-gradient-primary',
      'text-white',
      'shadow-orange',
      'hover:from-primary-600',
      'hover:to-primary-800',
      'hover:shadow-orange-lg',
      'hover:scale-105',
      'focus:ring-primary'
    ],
    secondary: [
      'bg-secondary-100',
      'text-secondary-800',
      'border',
      'border-border-light',
      'hover:bg-secondary-200',
      'hover:border-border-dark',
      'focus:ring-secondary'
    ],
    outline: [
      'bg-transparent',
      'text-primary-600',
      'border-2',
      'border-primary-500',
      'hover:bg-primary-50',
      'hover:text-primary-700',
      'focus:ring-primary'
    ],
    ghost: [
      'bg-transparent',
      'text-text-dark',
      'hover:bg-surface-DEFAULT',
      'focus:ring-secondary'
    ],
    danger: [
      'bg-error-500',
      'text-white',
      'hover:bg-error-600',
      'focus:ring-error-500'
    ]
  }

  const widthClasses = props.fullWidth ? ['w-full'] : []

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...widthClasses
  ]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
