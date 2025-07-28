<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '~/components/LoginForm.vue'

definePageMeta({
  layout: false,
  auth: false // Explicitamente definir que esta página não precisa de auth
})
</script>
