<script setup lang="ts">
import {ref} from "vue";

const secretText = ref("nothing")

fetch("/api")
    .then(response => {
      response.text().then(text => {
        secretText.value = text
      })
    })
</script>

<template>
  <span>{{ secretText }}</span>
</template>

<style scoped>
span {
  overflow: auto;
  overflow-wrap: anywhere;
}
</style>