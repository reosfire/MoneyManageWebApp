<script setup lang="ts">
import {vOnClickOutside} from '@vueuse/components';

const props = defineProps(["title"])
const emit = defineEmits<{
  (e: 'confirmPressed'): void
}>()

function onConfirmButtonPressed() {
  emit("confirmPressed")
}

</script>

<template>
  <div class="parent-matcher">
    <div class="block"
         v-on-click-outside="onConfirmButtonPressed">
      <div class="title">{{ props.title }}</div>
      <div class="action-buttons-block">
        <button class="action-button" @click="onConfirmButtonPressed">Confirm</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.parent-matcher {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title {
  font-size: 1.1em;
  text-align: center;
  margin-bottom: 10px;
}

.block {
  background-color: var(--background-secondary);
  border-radius: 8px;
  border: solid 1px var(--accent-low);
  padding: 10px;
  width: 50%;
  height: fit-content;
}

.action-button {
  height: 26px;
  width: 100%;
}

.action-buttons-block {
  display: flex;
  justify-content: space-between;
  gap: 2%;
}
</style>