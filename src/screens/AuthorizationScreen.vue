<script setup lang="ts">
import { reactive, ref } from 'vue'

const str = ref("aaaaa")

const update = () => {
    str.value += "a"
}

</script>

<template>
    <input v-model="str"/>
    <div @click="update">{{ str }}</div>
</template>

<style scoped>
div {
    cursor: pointer;
    user-select: none;
}
</style>