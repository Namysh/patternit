<template>
  <Editor :pattern="pattern" />
  <!-- <Examples @selectPattern="handleSelectPattern" class="mt-16"></Examples> -->
</template>


<script setup>
import Editor from '@/components/Editor.vue'
// import Examples from '@/components/Examples.vue'
 
// import { ref } from 'vue'

// let pattern = ref()


// const handleSelectPattern = (data) => {
//   pattern.value = data
//   console.log(data)
// }


const searchParams = new URLSearchParams(window.location.search);
if(searchParams.get('ref') === 'undesign') {
  fetch('https://api.countapi.xyz/hit/b037a711-ef91-4d2f-a0d4-5e5f96917ddd')
}
</script>


<style>
#app {
  font-family: Roboto;
  width: clamp(250px, 70vw, 400px);
}

body {
  margin: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  background-color: #383838;
  user-select: none;
}
* {
  box-sizing: border-box;
}
</style>
