<script setup lang="ts">

import Tag from "@/components/to-buy/Tag.vue";
import Checkbox from "@/components/reusable/Checkbox.vue";
import EditButton from "@/components/icons/EditButton.vue";
import DeleteButton from "@/components/icons/DeleteButton.vue";

const props = defineProps(["data"])
const emit = defineEmits<{
  (e: 'editClicked', id: string): void
  (e: 'deleteClicked', id: string): void
  (e: 'checkStateChanged', id: string, newValue: boolean): void
  (e: 'nameClicked', id: string): void
}>()

function onEditClicked() {
  emit('editClicked', props.data.uuid)
}

function onDeleteClicked() {
  emit('deleteClicked', props.data.uuid)
}

function onCheckStateChanged(newValue: boolean) {
  emit('checkStateChanged', props.data.uuid, newValue)
}

function onNameClicked() {
  emit('nameClicked', props.data.uuid)
}

</script>

<template>
  <div class="to-buy-entry">
    <div class="left-content">
      <checkbox class="check-box" :state="data.checked" @checkStateChanged="onCheckStateChanged"/>
      <div class="emoji">{{ data.emoji }}</div>
      <div class="main-info-container">
        <div class="name-and-price">
          <span class="name" @click="onNameClicked">{{ data.name }}</span>
        </div>
        <div class="tagsList">
          <tag class="tag" v-for="tag in data.tags" :color="tag.color" :label="tag.label"/>
        </div>
      </div>
    </div>
    <div class="right-content">
      <span class="price">{{ data.price }}руб</span>
      <edit-button @click="onEditClicked"/>
      <delete-button @click="onDeleteClicked"/>
    </div>
  </div>
</template>

<style scoped>
.to-buy-entry {
  border: solid 1px var(--accent-low);
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.right-content {
  display: flex;
  gap: 10px;
  align-items: center;
}

.emoji {
  font-size: 2em;
  user-select: none;
}

.main-info-container {
  display: flex;
  flex-flow: column;
  align-items: start;
}
.name-and-price {
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
}
.name {
  color: var(--text-primary);
  cursor:pointer;
}
.price {
  color: var(--text-secondary);
}

.tagsList {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.edit-button-container {
  display: flex;
  justify-content: end;
}

</style>