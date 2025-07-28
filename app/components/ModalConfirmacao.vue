<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-surface-light p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-text-dark">
                                {{ titulo }}
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-text-muted">
                                    {{ mensagem }}
                                </p>
                            </div>

                            <div class="mt-6 flex justify-end space-x-3">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-text-dark hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                                    @click="closeModal">
                                    Cancelar
                                </button>
                                <button type="button" :disabled="loading"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-error-600 px-4 py-2 text-sm font-medium text-white hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    @click="confirmar">
                                    <div v-if="loading"
                                        class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    {{ loading ? 'Deletando...' : 'Deletar' }}
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

interface Props {
    isOpen: boolean
    titulo?: string
    mensagem?: string
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    titulo: 'Confirmar ação',
    mensagem: 'Tem certeza que deseja continuar?',
    loading: false
})

const emit = defineEmits<{
    close: []
    confirm: []
}>()

const closeModal = () => {
    emit('close')
}

const confirmar = () => {
    emit('confirm')
}
</script>