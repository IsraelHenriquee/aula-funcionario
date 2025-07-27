<template>
  <div class="min-h-screen flex flex-col bg-background">
    <TheHeader />
    
    <main class="flex-1">
      <slot />
    </main>
    
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
</script>
