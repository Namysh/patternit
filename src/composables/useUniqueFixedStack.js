import { reactive } from 'vue'

const useUniqueFixedStack = (limit, values) => {
    const stack = reactive(values)

    const push = (color) => {
        if (stack.includes(color)) return

        if (stack.length >= limit) {
            stack.shift()
        }

        stack.push(color)
    }

    return {
        push,
        stack
    }
}

export default useUniqueFixedStack;