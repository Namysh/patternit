<template>
    <div
        class="flex p-4 text-white text-opacity-75 rounded-md shadow-md gap-x-4"
        style="background-color: #232323;"
    >
        <div
            class="flex items-center justify-center px-2 py-1 space-x-2 rounded-md"
            style="background-color: #383838"
        >
            <Icon name="aspect-ratio" class="opacity-75"></Icon>
            <input
                class="bg-transparent"
                type="number"
                min="2"
                max="16"
                :value="size"
                @change="emit('update:size', +$event.target.value)"
            />
        </div>
        <div
            class="flex items-center justify-center px-2 py-1 space-x-2 rounded-md"
            style="background-color: #383838"
        >
            <Icon name="loupe" class="opacity-75"></Icon>
            <input
                class="bg-transparent"
                type="number"
                min="1"
                max="16"
                :value="zoom"
                @change="emit('update:zoom', +$event.target.value)"
            />
        </div>

        <div
            class="flex items-center justify-center px-2 py-1 ml-auto space-x-4 text-white text-opacity-75 bg-blue-200 rounded-md cursor-pointer"
            style="background-color: #383838"
            @click="copy(css)"
        >
            <span class="truncate">{{copied ? 'Copié !' : 'Copy CSS'}}</span>
        </div>

    </div>
</template>


<script setup>
import Icon from '@/components/Icon.vue'
import useClipboard from '@/composables/useClipboard'

const props = defineProps({
    css: String,
    size: Number,
    zoom: Number,
})

const emit = defineEmits(['update:size', 'update:zoom'])

const { copy, copied } = useClipboard(1000)

</script>