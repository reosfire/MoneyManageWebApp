<script setup lang="ts">
import {vOnClickOutside} from '@vueuse/components';
import {computed, ref} from "vue";

const props = defineProps(["title", "textValidator"])
const emit = defineEmits<{
  (e: 'cancelPressed'): void
  (e: 'confirmPressed', text: string): void
}>()

const currentText = ref("")

const currentTextError = computed(() => {
  return props.textValidator(currentText.value.trim())
})

const currentTextIncorrect = computed(() => {
  return currentTextError.value != null
})

function onCancelButtonPressed() {
  emit("cancelPressed")
}

function onConfirmButtonPressed() {
  emit("confirmPressed", currentText.value.trim())
}

</script>

<template>
  <div class="parent-matcher">
    <div class="block"
         v-on-click-outside="onCancelButtonPressed">
      <div class="title">{{ props.title }}</div>
      <div class="input-block">
        <input class="input-field"
               :class="{ 'invalid-input-field' : currentTextIncorrect }"
               v-model="currentText"/>
        <span class="error-label" v-if="currentTextIncorrect">{{ currentTextError }}</span>
      </div>
      <div class="action-buttons-block">
        <button class="action-button" @click="onCancelButtonPressed">Cancel</button>
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

.input-block {
  padding-bottom: 10px;
}

.input-field {
  width: 100%;
  font-size: 1em;
  outline: none;
  border: solid 1px var(--accent-middle);
  border-radius: 6px;
  background-color: var(--background-secondary);
  color: var(--text-primary);
  padding: 2px 2px 2px 5px;
  transition: width 200ms;
}

.input-field:focus {
  width: 100%;
  border: solid 1px var(--accent-high);
}

.invalid-input-field {
  outline: none;
  border-color: indianred;
}

.error-label {
  color: indianred;
}
</style>