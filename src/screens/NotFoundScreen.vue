<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="not-found-container">
    <h1>404 Page not found</h1>
  </div>
</template>

<style scoped>
.not-found-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

h1 {
  display: block;
}

</style>