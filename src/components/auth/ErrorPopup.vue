<script setup lang="ts">
import {computed} from "vue";

const model = defineModel()

const shown = computed(() => {
  return model.value != null
})

function hide() {
  model.value = null
}
 </script>

<template>
  <div v-if="shown" class="screen">
    <div class="error-container">
      <span class="text">{{ model }}</span>
      <button class="ok-button" @click="hide">OK</button>
    </div>
  </div>
</template>

<style scoped>
.screen {
  background-color: #00000077;
  backdrop-filter: blur(2px);
  width: 100%;
  position: absolute;
  display: flex;
  justify-items: center;
}

.error-container {
  background-color: var(--background-secondary);
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-flow: column;
  border: solid 1px indianred;
  gap: 10px;
}

.ok-button {
  font-size: 1.1em;
}
</style>