
import { onMounted, onBeforeUnmount, reactive } from "vue";

const useFileUpload = (input) => {
    const files = reactive([])

    onMounted(() => {
        input.value.addEventListener('change', handleChange)

    })

    onBeforeUnmount(() => {
        input.value.removeEventListener('change', handleChange)
    })


    const loadFile = async file => {
        const reader = new FileReader()

        reader.onload = (event) => {
            files.push({
                file: file,
                result: event.target.result
            })
            input.value.value = null
        }
        reader.readAsDataURL(file)
    }

    const handleChange = () => {
        files.length = 0;
        [...input.value.files].forEach(file => loadFile(file))
        input.value.value = null
    }

    return {
        files
    }
}

export default useFileUpload;