<script setup lang="ts">
const model = defineModel()

function toggle() {
  model.value = !model.value
}
</script>

<template>
  <div class="checkbox-background" @click="toggle">
    <svg v-if="model" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check">
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path
          d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path>
    </svg>
  </div>
</template>

<style scoped>
.checkbox-background {
  cursor: pointer;
  background-color: white;
}
</style>