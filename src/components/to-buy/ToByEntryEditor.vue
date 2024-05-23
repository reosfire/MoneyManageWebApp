<script setup lang="ts">

import {computed, ref} from "vue";
import {vOnClickOutside} from '@vueuse/components';

const props = defineProps(["data"])

const emit = defineEmits<{
  (e: 'cancelClicked'): void
  (e: 'confirmClicked', name: string, price: Number, emoji: string): void
}>()

const name = ref(props.data.name)
const price = ref(props.data.price.toString())
const emoji = ref(props.data.emoji)

const nameError = computed(() => {
  if (name.value.trim().length == 0) return "name must not be empty"
  return null
})
const priceError = computed(() => {
  const priceString = price.value.replace(',', '.')
  const parsed = parseFloat(priceString)
  if (isNaN(parsed)) return "price must be a correct number"
  if (parsed.toString() != priceString) return "price must be a correct number"
  if (parsed < 0) return "price must not be negative"
  return null
})
const emojiError = computed(() => {
  console.log(emoji.value.length)
  console.log(emoji.value)
  if (emoji.value.length != 1) return "emoji must be one char"
  return null
})

const nameInvalid = computed(() => {
  return nameError.value != null
})
const priceInvalid = computed(() => {
  return priceError.value != null
})
const emojiInvalid = computed(() => {
  return emojiError.value != null
})

const cantSend = computed(() => {
  return nameInvalid.value || priceInvalid.value || emojiInvalid.value
})

function onConfirmClicked() {
  if (cantSend.value) return

  emit("confirmClicked",
      name.value.trim(),
      parseFloat(price.value),
      emoji.value,
  )
}

function onCancelClicked() {
  emit("cancelClicked")
}

</script>

<template>
  <div class="parent-matcher">
    <div class="block"
         v-on-click-outside="onCancelClicked">
      <div class="input-block">
        <div class="input-field-container">
          <div class="input-field-label"
               :class="{ 'invalid-input-field-label' : nameInvalid }"
          >Name:</div>
          <input class="input-field"
                 :class="{ 'invalid-input-field' : nameInvalid }"
                 v-model="name" type="text">
        </div>
        <span class="error-label" v-if="nameInvalid">{{ nameError }}</span>
      </div>
      <div class="input-block">
        <div class="input-field-container">
          <div class="input-field-label"
               :class="{ 'invalid-input-field-label' : priceInvalid }"
          >Price:</div>
          <input class="input-field"
                 :class="{ 'invalid-input-field' : priceInvalid }"
                 v-model="price" type="text">
        </div>
        <span class="error-label" v-if="priceInvalid">{{ priceError }}</span>
      </div>
      <div class="input-block">
        <div class="input-field-container">
          <div class="input-field-label"
               :class="{ 'invalid-input-field-label' : emojiInvalid }"
          >Emoji:</div>
          <input class="input-field"
                 :class="{ 'invalid-input-field' : emojiInvalid }"
                 v-model="emoji" type="text">
        </div>
        <span class="error-label" v-if="emojiInvalid">{{ emojiError }}</span>
      </div>
      <div class="action-buttons-block">
        <button class="action-button"
                :class="{ 'inactive-confirm-button' : cantSend }"
                @click="onConfirmClicked">Confirm</button>
        <button class="action-button" @click="onCancelClicked">Cancel</button>
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

.block {
  background-color: var(--background-secondary);
  border-radius: 8px;
  border: solid 1px var(--accent-low);
  padding: 10px;
  width: 50%;
  height: fit-content;
}

.input-field-container {
  display: flex;
  gap: 3%;
}

.input-block {
  padding-bottom: 10px;
}

.input-field-label {
  user-select: none;
  color: var(--text-secondary);
}

.error-label {
  color: indianred;
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

.invalid-input-field-label {
  color: indianred;
}

.action-button {
  height: 26px;
  width: 100%;
}

.inactive-confirm-button {
  color: var(--text-secondary);
  text-decoration: line-through;
  cursor: initial;
}

.inactive-confirm-button:hover {
  border: solid 1px var(--accent-low);
  color: var(--text-secondary);
  background-color: var(--background-clickable);
}

.action-buttons-block {
  display: flex;
  justify-content: space-between;
  gap: 2%;
}
</style>