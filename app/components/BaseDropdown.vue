<template>
    <div class="space-y-1">
        <label v-if="label" class="block text-sm font-medium text-text-dark">
            {{ label }}
            <span v-if="required" class="text-error-500">*</span>
        </label>

        <Listbox v-model="selectedValue">
            <div class="relative">
                <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-background-light py-2 pl-3 pr-10 text-left border border-border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                    <span class="block truncate" :class="{ 'text-text-muted': !selectedValue }">
                        {{ selectedValue || placeholder }}
                    </span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-text-muted" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background-light py-1 text-base shadow-lg ring-1 ring-border focus:outline-none sm:text-sm">
                        <ListboxOption v-slot="{ active, selected }" v-for="option in options" :key="option"
                            :value="option" as="template">
                            <li :class="[
                                active ? 'bg-primary-50 text-primary-900' : 'text-text-dark',
                                'relative cursor-default select-none py-2 pl-10 pr-4',
                            ]">
                                <span :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate',
                                ]">
                                    {{ option }}
                                </span>
                                <span v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

interface Props {
    modelValue: string
    options: string[]
    label?: string
    placeholder?: string
    required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Selecione uma opção',
    required: false
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const selectedValue = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value)
})
</script>