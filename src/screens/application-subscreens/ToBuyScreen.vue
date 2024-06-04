<script setup lang="ts">
import {ref, watch} from "vue";
import ToBuyEntry from "@/components/to-buy/ToBuyEntry.vue";
import ToByEntryEditor from "@/components/to-buy/ToByEntryEditor.vue";
import ConfirmationMenu from "@/components/reusable/ConfirmationMenu.vue";

const d: any[] = []
const data = ref(d)

const searchQuery = ref("")

watch(searchQuery, () => {
  sendGetListRequest().then(list => {
    data.value = list.items
  })
})

const roomId = localStorage.getItem("selected-room-id")

sendGetListRequest().then(list => {
  data.value = list.items
})

const editorShown = ref(false)
const positiveAction = ref((name: string, price: Number, emoji: string) => {})
const editingData = ref({})

const removeConfirmationShown = ref(false)
const itemToRemove = ref()

function hideRemoveConfirmation() {
  removeConfirmationShown.value = false
}

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

function removeButtonClicked(id: string) {
  const found = data.value.find(entry => entry.uuid == id)
  if (found == null) return

  itemToRemove.value = found
  removeConfirmationShown.value = true
}

function removeConfirmed() {
  removeElement(itemToRemove.value.uuid)
  removeConfirmationShown.value = false
}

function editButtonClicked(id: string) {
  editingData.value = data.value.find((it) => { return it.uuid == id })
  editorShown.value = true
  positiveAction.value = (name: string, price: Number, emoji: string) => {
    editElement(id, name, price, emoji)
    hideEditor()
  }
}

function checkStateChanged(id: string, newValue: boolean) {
  updateChecked(id, newValue)
}

function hideEditor() {
  editorShown.value = false
}

async function addElement(name: string, price: Number, emoji: string) {
  await sendAddRequest(name, price, emoji)
  data.value = (await sendGetListRequest()).items
}

async function removeElement(id: string) {
  await sendRemoveRequest(id)
  data.value = (await sendGetListRequest()).items
}

async function editElement(id: string, name: string, price: Number, emoji: string) {
  await sendEditRequest(id, name, price, emoji)
  data.value = (await sendGetListRequest()).items
}

async function updateChecked(id: string, checked: boolean) {
  await sendCheckedStateEditRequest(id, checked)
  data.value = (await sendGetListRequest()).items
}

async function sendGetListRequest() {
  const requestOptions = {
    method: "GET",
  };

  const response = await sendRequest("/api/shop-list/list?roomId=" + roomId + "&query=" + searchQuery.value, requestOptions)
  return response?.json()
}

async function sendCheckedStateEditRequest(id: string, checked: boolean) {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      checked: checked
    })
  };

  return await sendRequest("/api/shop-list/edit?roomId=" + roomId + "&id=" + id, requestOptions);
}
async function sendEditRequest(id: string, name: string, price: Number, emoji: string) {
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

  return await sendRequest("/api/shop-list/edit?roomId=" + roomId + "&id=" + id, requestOptions)
}
async function sendRemoveRequest(id: string) {
  const requestOptions = {
    method: "DELETE",
  };

  return await sendRequest("/api/shop-list/remove?roomId=" + roomId + "&id=" + id, requestOptions)
}
async function sendAddRequest(name: string, price: Number, emoji: string) {
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

  return await sendRequest("/api/shop-list/add?roomId=" + roomId, requestOptions)
}
async function sendRequest(url: string, options: any) {
  let response = await fetch(url, options);

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
  <div class="popup-container" v-if="editorShown">
    <to-by-entry-editor :data="editingData"
                        @cancelClicked="hideEditor"
                        @confirmClicked="positiveAction"
    />
  </div>
  <div class="popup-container" v-if="removeConfirmationShown">
    <confirmation-menu :title="'Delete item: ' + itemToRemove.name"
                       @cancelPressed="hideRemoveConfirmation"
                       @confirmPressed="removeConfirmed"
    />
  </div>
  <div class="to-buy-screen">
    <div class="search-container">
      <input class="text-input" type="text" placeholder="Search" v-model="searchQuery">
    </div>
    <div class="entries-list">
      <ToBuyEntry v-for="entry in data" :data="entry"
                  class="entry"
                  @editClicked="editButtonClicked"
                  @deleteClicked="removeButtonClicked"
                  @checkStateChanged="checkStateChanged"
      />
    </div>
    <button class="add-entry-button" @click="addButtonClicked">Create new</button>
  </div>
</template>

<style scoped>
.popup-container {
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