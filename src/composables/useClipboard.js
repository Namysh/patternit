import { ref } from 'vue'

const useClipboard = (notificationDuration = 3000) => {
    const copied = ref(false)

    const copy = async text => {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                copied.value = true
                setTimeout(() => copied.value = false, notificationDuration)
            } catch (e) {
                console.error(e)
            }
        } else {
            let textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((resolve, reject) => {
                if (document.execCommand("copy")) {
                    copied.value = true
                    setTimeout(() => copied.value = false, notificationDuration)
                } else {
                    console.error('Error while copying')
                }
                textArea.remove();
            });
        }
    }

    return {
        copy,
        copied
    }
}

export default useClipboard