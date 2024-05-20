<script setup lang="ts">
import {ref} from "vue";
import ToBuyEntry from "@/components/ToBuyEntry.vue";

let d: any[] = []
const data = ref(d)

console.log(data.value)

getList().then(list => {
  data.value = list.items
})


function addElement() {
  add().then(itemUUID => {
    getList().then(list => {
      data.value = list.items
    })
  })
}

async function getList() {
  const requestOptions = {
    method: "GET",
  };

  let response = await fetch("/api/shop-list/list?roomId=74f977de-b243-44f9-bc65-7448b63a5814", requestOptions);

  if (response.ok) {
    return response.json()
  } else {
    response.text().then(text => {
      console.log(text)
    })
    return ""
  }
}

async function add() {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: "Milk",
      price: 10.234,
      checked: false,
      emoji: "🍌",
      tags: []
    })
  };

  let response = await fetch("/api/shop-list/add?roomId=74f977de-b243-44f9-bc65-7448b63a5814", requestOptions);

  if (response.ok) {
    return response
  } else {
    response.text().then(text => {
      console.log(text)
    })
    return ""
  }
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
    <button class="add-entry-button" @click="addElement">Create new</button>
  </div>
</template>

<style scoped>
.to-buy-screen {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.search-container {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: end;
  flex: 0 1 auto;
}

.entries-list {
  overflow-y: auto;
  margin-bottom: 10px;
  flex: 1 1 auto;
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
  flex: 0 1 40px;
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