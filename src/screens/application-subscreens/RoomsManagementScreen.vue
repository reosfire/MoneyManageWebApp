<script setup lang="ts">
import {ref} from "vue";

const secretText = ref("nothing")

fetch("/api")
    .then(response => {
      response.text().then(text => {
        secretText.value = text
      })
    })

function onCreateRoomClicked() {
  const requestOptions = {
    method: "POST",
  };
  sendRequest("/api/rooms/create?name=newRoom", requestOptions)
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
  <span>{{ secretText }}</span>
  <button @click="onCreateRoomClicked">Create new</button>
</template>

<style scoped>
span {
  overflow: auto;
  overflow-wrap: anywhere;
}
</style>