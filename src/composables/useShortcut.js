import { onMounted, onUnmounted } from 'vue'

const useShortcut = (keysToCallback) => {

    const pressedKeys = new Set()

    onMounted(() => {
        document.addEventListener('keyup', handleKeyUp)
        document.addEventListener('keydown', handleKeyDown)
    })

    onUnmounted(() => {
        document.removeEventListener('keyup', handleKeyUp)
        document.removeEventListener('keydown', handleKeyDown)
    })

    const handleKeyDown = event => {
        pressedKeys.add(event.key.toLowerCase())

        let keys = [...pressedKeys].join('+')

        if(keysToCallback[keys]) {
            keysToCallback[keys]()
        }
    }

    const handleKeyUp = event => {
        pressedKeys.delete(event.key.toLowerCase()) 
    }



}

export default useShortcut;