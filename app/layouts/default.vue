<template>
  <div class="min-h-screen flex flex-col bg-background">
    <TheHeader />

    <main class="flex-1">
      <div class="container mx-auto px-4 py-6">
        <slot />
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
</script>
