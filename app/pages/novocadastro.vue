<template>
  <div>
    <FormFuncionario :is-novo="true" />
  </div>
</template>

<script setup lang="ts">
import FormFuncionario from '~/components/FormFuncionario.vue'

definePageMeta({
  layout: 'default'
})
</script>
