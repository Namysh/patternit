<template>
    <div
        class="absolute top-0 flex flex-col items-center justify-center gap-4 p-4 text-white text-opacity-75 transform -translate-x-full rounded-md shadow-md -left-4"
        style="background-color: #232323;"
    >
        <button @click="savePattern()" class="cursor-pointer">
            <Icon name="save"></Icon>
        </button>

        <input ref="input" class="fixed invisible opacity-0" id="import" type="file" />

        <label for="import">
            <Icon class="cursor-pointer" name="file-open"></Icon>
        </label>

        <button @click="emit('clear')" class="cursor-pointer">
            <Icon name="delete"></Icon>
        </button>
    </div>
</template>


<script setup>
import Icon from '@/components/Icon.vue'
import { ref, watch } from 'vue'
import useSerializer from '@/composables/useSerializer.js'
import useFileUpload from '@/composables/useFileUpload.js'
import useFileDownload from '@/composables/useFileDownload.js'

const props = defineProps({
    css: String,
    size: Number,
    zoom: Number,
    cells: Array
})

const emit = defineEmits(['loadPattern', 'clear'])

const input = ref(null)

const { serialize } = useSerializer()

const { files } = useFileUpload(input)
const { download } = useFileDownload()

watch(files, () => {
    if (files.length === 0) return

    const pattern = atob(files[0].result.split(',')[1])

    emit('loadPattern', pattern)
})

const savePattern = () => {
    const serialized = serialize(props.size, props.zoom, ...props.cells.map(cell => cell.getAttribute('fill')))
    download(encodeURIComponent(serialized))
}

</script>

<style>
</style>