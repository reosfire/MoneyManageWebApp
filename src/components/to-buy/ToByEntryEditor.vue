<script setup lang="ts">

import {computed, ref, watch} from "vue";
import {vOnClickOutside} from '@vueuse/components';
import EmojiPicker, {type EmojiExt} from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const props = defineProps(["data"])

const emit = defineEmits<{
  (e: 'cancelClicked'): void
  (e: 'confirmClicked', name: string, price: Number, emoji: string, hiddenText: string): void
}>()

const name = ref(props.data.name)
const price = ref(props.data.price.toString())
const emoji = ref(props.data.emoji)
const emojiPickerShown = ref(false)
const hiddenText = ref(props.data.hiddenText)

function toggleEmojiPicker() {
  emojiPickerShown.value = !emojiPickerShown.value
}

function showEmojiPicker() {
  emojiPickerShown.value = true
}

function onEmojiSelect(selectResult: EmojiExt) {
  emojiPickerShown.value = false
  emoji.value = selectResult.i
}

watch(name, () => {
  sendRequest("/api/emojis/get?query=" + name.value).then(response =>
      response?.text().then( resultEmoji => {
        if (resultEmoji != "❓" || emoji.value == null || emoji.value.trim().length == 0) {
          emoji.value = resultEmoji
        }
      })
  )
})

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
const hiddenTextError = computed(() => {
  if (hiddenText.value.trim().length == 0) return "hidden text must not be empty"
  return null
})

const nameInvalid = computed(() => {
  return nameError.value != null
})
const priceInvalid = computed(() => {
  return priceError.value != null
})
const hiddenTextInvalid = computed(() => {
  return hiddenTextError.value != null
})

const cantSend = computed(() => {
  return nameInvalid.value || priceInvalid.value || hiddenTextInvalid.value
})

function onConfirmClicked() {
  if (cantSend.value) return

  emit("confirmClicked",
      name.value.trim(),
      parseFloat(price.value.replace(',', '.')),
      emoji.value,
      hiddenText.value
  )
}

function onCancelClicked() {
  emit("cancelClicked")
}

async function sendRequest(url: string) {
  let response = await fetch(url);

  if (response.ok) {
    return response
  } else {
    response.text().then(text => {
      console.log(text)
    })
    return null
  }
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
               :class="{ 'invalid-input-field-label' : hiddenTextInvalid }"
          >Hidden text:</div>
          <input class="input-field"
                 :class="{ 'invalid-input-field' : hiddenTextInvalid }"
                 v-model="hiddenText" type="text">
        </div>
        <span class="error-label" v-if="hiddenTextInvalid">{{ hiddenTextError }}</span>
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
          <div class="input-field-label">Emoji:</div>
          <div @click="toggleEmojiPicker" class="emoji-preview">{{emoji}}</div>
        </div>
      </div>
      <EmojiPicker class="emoji-picker" v-if="emojiPickerShown" :native="true" @select="onEmojiSelect" />
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
  align-items: center;
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

.emoji-picker {
  position: absolute;
  max-height:50%;
}
.emoji-preview {
  font-size: 1.5em;
  cursor: pointer;
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