<template>
  <div
    ref="toolBox"
    class="absolute flex items-center justify-center gap-4 p-2 text-white text-opacity-75 rounded-md shadow-md -bottom-8 -right-4 ToolBox"
    style="background-color: #232323;"
  >
    <button ref="colorPicker" class="cursor-pointer item">
      <Icon name="palette"></Icon>
    </button>

    <span :style="`background-color: ${color}`" class="w-4 h-4 rounded-md"></span>

    <span>|</span>

    <ul class="flex flex-row-reverse justify-end flex-grow gap-4">
      <li
        v-for="(color, index) in colors"
        class="inline-block w-4 h-4 rounded-md cursor-pointer"
        :key="index"
        @click="changeColor(color)"
        :style="`background-color: ${color}`"
      ></li>
    </ul>

    <button @click="rotate" class="ml-auto cursor-pointer item">
      <Icon :name="rotated ? 'rotate-left' : 'rotate-right'"></Icon>
    </button>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
import '@simonwep/pickr/dist/themes/nano.min.css';
import Pickr from '@simonwep/pickr';
import { ref, onMounted } from 'vue';
import useUniqueFixedStack from '@/composables/useUniqueFixedStack'

const props = defineProps({
  color: String
})

const emit = defineEmits(['undo', 'redo', 'clear', 'update:color'])

const { push: addColor, stack: colors } = useUniqueFixedStack(7, ['#ffffff','#000000','#ffd94c', '#1bb37d', '#f93d54', '#216cc7'])

const colorPicker = ref(null);
const toolBox = ref(null);
let pickFg ;

const changeColor = (color) => {
  if (color != props.color) {
    addColor(props.color)
    pickFg.setColor(color)
    emit('update:color', color)
  }
}

onMounted(() => {
  pickFg = Pickr.create({
    el: colorPicker.value,
    theme: 'nano',
    useAsButton: true,
    components: {
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
      input: true,
    },
  },
  });

  let tempColor;

  pickFg.on('change', color => {
    emit('update:color', color.toHEXA() + '')
  });

  pickFg.on('show', () => tempColor = props.color)

  pickFg.on('hide', () => {
    if (tempColor != props.color) {
      addColor(tempColor)
    }
  })
});

let rotated = ref(false)
const rotate = () => {
  rotated.value = !rotated.value
  toolBox.value.classList.toggle('ToolBox--rotated');
}

</script>

<style>
.ToolBox {
  width: calc(100% - (2 * 0.3rem));
  transition: transform 0.5s ease-in;
  transform-origin: 100% 50%;
}
.ToolBox .item {
  transition: transform 0.5s ease-out;
}

.ToolBox--rotated {
  transition: transform 0.5s ease-out;
  transform: rotate(90deg);
  transform-origin: 100% 50%;
}
.ToolBox--rotated .item {
  transform: rotate(-90deg);
  transition: transform 0.5s ease-out;
}

</style>
