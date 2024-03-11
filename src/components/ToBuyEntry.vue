<script setup lang="ts">

import {useAttrs} from "vue";
import Tag from "@/components/Tag.vue";

defineProps(["data"])


</script>

<template>
  <div class="to-buy-entry">
    <input type="checkbox" v-model="data.checked">
    <div class="emoji">{{ data.emoji }}</div>
    <div class="main-info-container">
      <div class="name-and-price">
        <span class="name">
          {{ data.name }}
        </span>
        <span class="price">
          100руб
        </span>
      </div>
      <div class="tagsList">
        <tag v-for="tag in data.tags" :color="tag.color" :label="tag.label"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.to-buy-entry {
  border: solid 1px var(--accent-low);
  border-radius: 8px;
  padding: 5px 10px 5px 10px;
  display: flex;
  align-items: center;
}

.emoji {
  font-size: 2em;
}

.main-info-container {
  display: flex;
  flex-flow: column;
  align-items: start;
}
.name-and-price {

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
}

</style>