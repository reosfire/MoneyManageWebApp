<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const secretText = ref("nothing")

fetch("/api")
    .then(response => {
      response.text().then(text => {
        secretText.value = text
      })
    })

const logout = () => {
  console.log("asdf")
  fetch("api/logout")
      .then(response => {
        if (response.ok) {
          router.push("/auth")
        } else {
          response.text().then(() => console.log())
        }
      })
}
</script>

<template>
  <header class="header">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/auth">Auth</RouterLink>
    </nav>
  </header>
  <div>{{secretText}}</div>
  <button @click="logout">Logout</button>
</template>

<style scoped>

</style>