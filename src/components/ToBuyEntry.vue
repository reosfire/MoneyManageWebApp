<script setup lang="ts">

import Tag from "@/components/Tag.vue";
import Checkbox from "@/components/Checkbox.vue";
import {ref} from "vue";

const props = defineProps(["data"])

const checked = ref(props.data.checked)

</script>

<template>
  <div class="to-buy-entry">
    <checkbox v-model="checked" class="check-box"/>
    <div class="emoji">{{ data.emoji }}</div>
    <div class="main-info-container">
      <div class="name-and-price">
        <span class="name">
          {{ data.name }}
        </span>
        <span class="price">
          {{ data.price }}руб
        </span>
      </div>
      <div class="tagsList">
        <tag class="tag" v-for="tag in data.tags" :color="tag.color" :label="tag.label"/>
      </div>
    </div>
    <button></button>
  </div>
</template>

<style scoped>
.to-buy-entry {
  border: solid 1px var(--accent-low);
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
}

.check-box {
  height: 20px;
  width: 20px;
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
}
.price {
  color: var(--text-secondary);
}

.tagsList {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

</style>