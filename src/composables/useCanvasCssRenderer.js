import { watch, ref, nextTick } from 'vue'

const useCanvasPreview = (size, zoom = 4, cells) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size.value * zoom.value;

  const css = ref('')

  const updateCss = () => {
    css.value = `url(${canvas.toDataURL()})`
  }

  watch(size, () => {
    canvas.width = canvas.height = size.value * zoom.value
  })

  watch(zoom, () => {
    canvas.width = canvas.height = size.value * zoom.value
    redraw()

  });

const indexToCoords = (index, size) => ({
  x: index % size,
  y: ~~(index / size),
})

  const redraw = () => {
    cells.forEach((cell, index) => {
      let color = cell.getAttribute('fill')
      updateCell(index, color);
    })
    updateCss()
  }

  watch(cells, () => {
    redraw()
  })

  const context = canvas.getContext('2d');

  const updateCell = (coords, color) => {
    if(typeof coords !== 'object') coords = indexToCoords(coords, size.value)

    removeCell(coords.x, coords.y)

    context.beginPath();
    context.fillStyle = color;
    context.rect(coords.x * zoom.value, coords.y * zoom.value, zoom.value, zoom.value);
    context.fill();
  }

  const removeCell = (x, y) => {
    context.clearRect(x * zoom.value, y * zoom.value, zoom.value, zoom.value);
  }

  const clear = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  return {
    updateCell,
    canvas,
    clear,

    css,
    updateCss
  }


}

export default useCanvasPreview;