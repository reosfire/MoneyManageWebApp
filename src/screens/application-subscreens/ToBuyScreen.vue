<script setup lang="ts">
import {ref} from "vue";
import ToBuyEntry from "@/components/ToBuyEntry.vue";


const data: any[] = []
for (let i = 0; i < 20; i++) {
  const tags: any[] = []

  for (let j = 0; j < i; j++) {
    tags.push({
      color: "var(--accent-high)",
      label: "aa"
    })
  }

  data.push({
    name: "Some entry " + i,
    price: Math.floor(Math.random() * 100),
    checked: i % 2 == 0,
    emoji: "🍌",
    tags: tags,
  })
}

</script>

<template>
  <div class="to-buy-screen">
    <div class="search-container">
      <input class="text-input" type="text" placeholder="Search">
    </div>
    <div class="entries-list">
      <ToBuyEntry v-for="entry in data" class="entry" :data="entry"/>
    </div>
    <button class="add-entry-button">Create new</button>
  </div>
</template>

<style scoped>
.to-buy-screen {
  display: flex;
  flex-flow: column;
}

.search-container {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: end;
}

.entries-list {
  height: 60vh;
  overflow-y: auto;
  padding-right: 10px;
  margin-bottom: 10px;
}

.text-input {
  width: 30%;
  font-size: 1.2em;
  outline: none;
  border: solid 1px var(--accent-middle);
  border-radius: 6px;
  background-color: var(--background-secondary);
  color: var(--text-primary);
  padding: 2px 2px 2px 5px;
  transition: width 200ms;
}
.text-input:focus {
  width: 100%;
  border: solid 1px var(--accent-high);
}

.entry {
  margin-bottom: 10px;
}
.entry:last-child {
  margin-bottom: 0;
}

.add-entry-button {
  background-color: var(--background-clickable);
  cursor: pointer;
  font-size: 1.3em;
  color: var(--text-primary);
  border-radius: 8px;
  border: solid 1px var(--accent-low);
}
.add-entry-button:hover {
  background-color: var(--background-clickable-highlighted);
  border: solid 1px var(--accent-middle);
}
.add-entry-button:active {
  outline: none;
  border: solid 1px var(--accent-high);
}
</style>