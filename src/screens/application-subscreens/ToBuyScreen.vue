<script setup lang="ts">
import {ref} from "vue";
import ToBuyEntry from "@/components/to-buy/ToBuyEntry.vue";
import ToByEntryEditor from "@/components/to-buy/ToByEntryEditor.vue";

let d: any[] = []
const data = ref(d)

getList().then(list => {
  data.value = list.items
})

const editorShown = ref(false)
const positiveAction = ref((name: string, price: Number, emoji: string) => {})
const editingData = ref({})

function addButtonClicked() {
  editingData.value = {
    name: "stub",
    price: 0,
    emoji: "",
  }
  editorShown.value = true
  positiveAction.value = (name: string, price: Number, emoji: string) => {
    addElement(name, price, emoji)
    hideEditor()
  }
}

function editButtonClicked(id: string) {
  editingData.value = data.value.find((it) => { return it.uuid == id })
  editorShown.value = true
  positiveAction.value = (name: string, price: Number, emoji: string) => {
    editElement(id, name, price, emoji)
    hideEditor()
  }
}

function hideEditor() {
  editorShown.value = false
}

function addElement(name: string, price: Number, emoji: string) {
  add(name, price, emoji).then(itemUUID => {
    getList().then(list => {
      data.value = list.items
    })
  })
}

function removeElement(id: string) {
  remove(id).then(() => {
    getList().then(list => {
      data.value = list.items
    })
  })
}

function editElement(id: string, name: string, price: Number, emoji: string) {
  edit(id, name, price, emoji).then(() => {
    getList().then(list => {
      data.value = list.items
    })
  })
}

async function getList() {
  const requestOptions = {
    method: "GET",
  };

  let response = await fetch("/api/shop-list/list?roomId=adf55441-fbac-43b1-8953-11cd13ad2f1c", requestOptions);

  if (response.ok) {
    return response.json()
  } else {
    response.text().then(text => {
      console.log(text)
    })
    return ""
  }
}

async function edit(id: string, name: string, price: Number, emoji: string) {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name,
      price: price,
      emoji: emoji,
      tags: []
    })
  };

  let response = await fetch("/api/shop-list/edit?roomId=adf55441-fbac-43b1-8953-11cd13ad2f1c&id=" + id, requestOptions);

  if (response.ok) {
    return response
  } else {
    response.text().then(text => {
      console.log(text)
    })
    return ""
  }
}

async function remove(id: string) {
  const requestOptions = {
    method: "DELETE",
  };

  let response = await fetch("/api/shop-list/remove?roomId=adf55441-fbac-43b1-8953-11cd13ad2f1c&id=" + id, requestOptions);

  if (response.ok) {
    return response
  } else {
    response.text().then(text => {
      console.log(text)
    })
    return ""
  }
}

async function add(name: string, price: Number, emoji: string) {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name,
      price: price,
      checked: false,
      emoji: emoji,
      tags: []
    })
  };

  let response = await fetch("/api/shop-list/add?roomId=adf55441-fbac-43b1-8953-11cd13ad2f1c", requestOptions);

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
  <div class="editor-container" v-if="editorShown">
    <to-by-entry-editor :data="editingData" @cancelClicked="hideEditor" @confirmClicked="positiveAction"/>
  </div>
  <div class="to-buy-screen">
    <div class="search-container">
      <input class="text-input" type="text" placeholder="Search">
    </div>
    <div class="entries-list">
      <ToBuyEntry v-for="entry in data" :data="entry"
                  class="entry"
                  @editClicked="editButtonClicked"
                  @deleteClicked="removeElement"
                  @checkStateChanged=""
      />
    </div>
    <button class="add-entry-button" @click="addButtonClicked">Create new</button>
  </div>
</template>

<style scoped>
.editor-container {
  position: absolute;
  margin: -10px;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
}

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
  font-size: 1.3em;
  flex: 0 1 40px;
}
</style>