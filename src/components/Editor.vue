<template>
    <div class="flex flex-col gap-4">
        <Topbar :css="`background-image: ${css}`" v-model:zoom="zoom" v-model:size="size" />

        <div class="relative">
            <Leftbar
                :size="size"
                :zoom="zoom"
                :cells="cells"
                @loadPattern="handleLoadPattern"
                @clear="clear"
            />

            <Canvas
                :cells="cells"
                :size="size"
                :zoom="zoom"
                :ratio="ratio"
                @start="handleStart"
                @stop="handleStop"
                @draw="handleDraw"
                @undraw="handleUndraw"
            />

            <Colorbar v-model:color="color" />
        </div>
    </div>
</template>


<script setup>
import { ref, watch, nextTick, reactive } from 'vue';

import Canvas from '@/components/Canvas.vue'
import Leftbar from '@/components/Leftbar.vue'
import Colorbar from '@/components/Colorbar.vue'
import Topbar from '@/components/Topbar.vue'


import useShortcut from '@/composables/useShortcut';
import useHistory, { History } from '@/composables/useHistory';
import useCanvasCssRenderer from '@/composables/useCanvasCssRenderer';
import useSerializer from '@/composables/useSerializer';

const CHANGE_CELL_COLOR = 'changeCellColor';
const CHANGE_SIZE = 'changeSize';

const props = defineProps({
    pattern: String
})

let color = ref('#000000');
let size = ref(8);
let zoom = ref(2);
let ratio = ref(50);
const cells = reactive([]);

const {
    previous,
    next,

    peekCurrent,
    peekPrevious,

    startRegistering,
    register,
    stopRegistering,

    reset: resetHistory

} = useHistory();

const { updateCell: updateCanvasCell, css, updateCss } = useCanvasCssRenderer(size, zoom, cells);

const { serialize, deserialize } = useSerializer();

useShortcut({
    'control+z': () => handleHistoryShortcut(History.UNDO),
    'control+y': () => handleHistoryShortcut(History.REDO)
})

const clear = () => {
    cells.forEach((cell, index) => {
        cell.setAttribute('fill', 'transparent')
        updateCanvasCell(index, 'transparent')
    });
    updateCss()
};

const handleHistoryShortcut = (type) => {
    const entries = type === History.UNDO ? previous() : next();

    entries.forEach(({ action, params }) => {
        if (action === CHANGE_CELL_COLOR) {
            cells[params.coords.x + params.coords.y * size.value].setAttribute('fill', params[type].color);
            updateCanvasCell(params.coords, params[type].color);
            updateCss()

        } else if (action === CHANGE_SIZE) {

            size.value = params[type].size;

            if (type === History.UNDO) {
                const { colors } = deserialize(['...colors'], params[type].colors)

                nextTick(() => {
                    cells.forEach((cell, index) => {
                        cell.setAttribute('fill', colors[index]);
                        updateCanvasCell(index, colors[index]);
                    })
                })
                updateCss()
            }
        }
    });
}

const handleStart = () => {
    startRegistering()
}

const handleStop = () => {
    stopRegistering()
}

const handleDraw = (coords) => {
    updateCell(coords, color.value);
}

const handleUndraw = (coords) => {
    updateCell(coords, 'transparent')
}

const updateCell = (coords, color) => {
    const cell = cells[coords.x + coords.y * size.value];
    const cellColor = cell.getAttribute('fill');

    if (cellColor === color) return;

    register({
        action: CHANGE_CELL_COLOR,
        params: {
            cell,
            coords,
            [History.UNDO]: {
                color: cellColor
            },
            [History.REDO]: {
                color: color
            },
        },
    });

    cell.setAttribute('fill', color);

    updateCanvasCell(coords, color);
    updateCss()

};

const handleLoadPattern = pattern => {
    const data = deserialize(['size', 'zoom', '...cells'], pattern)
    size.value = +data.size
    zoom.value = +data.zoom
    nextTick(() => {
        cells.forEach((cell, index) => {
            cell.setAttribute('fill', data.cells[index]);
            updateCanvasCell(index, data.cells[index]);
        })

        updateCss()
    })
    resetHistory()
}

watch(css, () => {
    document.body.style.backgroundImage = css.value
});

watch(size, (newSize, oldSize) => {
    let [currentEntry] = peekCurrent()

    if (currentEntry && currentEntry.params[History.UNDO].size == newSize && currentEntry.params[History.REDO].size == oldSize) {
        return;
    }

    let [previousEntry] = peekPrevious()

    if (previousEntry && previousEntry.params[History.UNDO].size == oldSize && previousEntry.params[History.REDO].size == newSize) {
        return;
    }

    register({
        action: CHANGE_SIZE,
        params: {
            [History.UNDO]: {
                size: oldSize,
                colors: serialize(...cells.map(cell => cell.getAttribute('fill')))
            },
            [History.REDO]: {
                size: newSize
            },
        },
    });

})

watch(() => props.pattern, (pattern) => {
    if (pattern) {
        handleLoadPattern(pattern);
    }
})


</script>


<style>
</style>
