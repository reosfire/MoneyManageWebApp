<script setup lang="ts">

const props = defineProps(["state"])
const emit = defineEmits<{
  (e: 'checkStateChanged', newValue: boolean): void
}>()

function toggle() {
  emit('checkStateChanged', !props.state)
}
</script>

<template>
  <div class="checkbox-background" :class="{ 'checked-background': props.state }" @click="toggle">
    <svg v-if="props.state" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="check">
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path
          d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"></path>
    </svg>
  </div>
</template>

<style scoped>
.checkbox-background {
  cursor: pointer;
  height: 24px;
  width: 24px;
  min-height: 24px;
  min-width: 24px;
  max-height: 24px;
  max-width: 24px;
  border-radius: 8px;
  background-color: var(--background-clickable);
}
.checked-background {
  border: solid 1px var(--accent-high);
}
#check {
  fill: var(--accent-high);
}
</style>