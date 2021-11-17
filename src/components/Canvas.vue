<template>
  <div class="space-y-4 shadow-md Editor">
    <svg
      @contextmenu.prevent
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
      width="100%"
      height="100%"
      :viewBox="`0 0 ${size * ratio} ${size * ratio}`"
      style="background-color: #383838"
    >
      <template v-for="(_, y) in size" :key="y">
        <template v-for="(_, x) in size" :key="x">
          <rect
            class="cell"
            @mousemove="handleMouseMove({x,y})"
            :x="x * ratio"
            :y="y * ratio"
            :width="ratio"
            :height="ratio"
            fill="transparent"
            :ref="
              el => {
                if (el) cells[x + y * size] = el;
              }
            "
          />
        </template>
      </template>

      <defs>
        <!-- Grid pattern -->
        <pattern id="grid" :width="ratio" :height="ratio" patternUnits="userSpaceOnUse">
          <path stroke="#2d2d2d" :d="`M 0 0 H ${ratio} V ${ratio}`" stroke-width="2" fill="none" />
        </pattern>
      </defs>

      <!-- Overlay with the grid attern -->
      <rect
        class="pointer-events-none"
        :width="size * ratio"
        :height="size * ratio"
        fill="url(#grid)"
      />

      <!-- Missing left and bottom border -->
      <path
        stroke="#2d2d2d"
        :d="`M 0 0 V ${size * ratio} H ${size * ratio}`"
        stroke-width="2"
        fill="none"
      />

      <!-- Center axes -->
      <path
        :d="
          `M ${(size * ratio) / 2 - 0.5} 0 V ${size * ratio} M 0 ${(size * ratio) /
          2 + 0.5} H ${size * ratio}`
        "
        stroke-width="1"
        :stroke-dasharray="size % 2 === 0 ? '0' : '7, 2'"
        stroke="#232323"
        fill="none"
      />
    </svg>
  </div>
</template>

<script setup>
import { onBeforeUpdate } from 'vue'

const emit = defineEmits(['start', 'stop', 'draw', 'undraw']);

const props = defineProps({
  cells: Array,
  size: Number,
  zoom: Number,
  ratio: Number,
})

let rightClick = false
let mouseDown = false
let hoveredCellCoords = undefined

const handleMouseMove = (coords) => {
  hoveredCellCoords = coords

  if (!mouseDown) return

  if (rightClick)
    emit('undraw', hoveredCellCoords)
  else
    emit('draw', hoveredCellCoords)
}

const handleMouseUp = () => {
  if (hoveredCellCoords !== undefined) {
    if (rightClick)
      emit('undraw', hoveredCellCoords)
    else
      emit('draw', hoveredCellCoords)
  }

  emit('stop')

  hoveredCellCoords = undefined
  rightClick = false
  mouseDown = false
}

const handleMouseDown = (event) => {
  mouseDown = true

  emit('start')

  if (event.button === 0) {
    if (hoveredCellCoords !== undefined)
      emit('draw', hoveredCellCoords)
  }
  else if (event.button === 2) {
    rightClick = true
    if (hoveredCellCoords !== undefined)
      emit('undraw', hoveredCellCoords)
  }
}

const handleMouseLeave = () => {
  emit('stop')

  hoveredCellCoords = undefined
  rightClick = false
  mouseDown = false
}

onBeforeUpdate(() => {
  props.cells.length = [];
})

</script>

<style>
</style>
