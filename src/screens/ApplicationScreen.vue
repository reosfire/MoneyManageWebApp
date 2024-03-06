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
  <header>
    <nav>
      <RouterLink class="router-link" to="/first">first</RouterLink>
      <RouterLink class="router-link" to="/second">second</RouterLink>
      <RouterLink class="router-link" to="/third">third</RouterLink>
    </nav>
  </header>
  <div class="content">
    <div>{{secretText}}</div>
    <button @click="logout">Logout</button>
    <router-view/>
  </div>
</template>

<style scoped>
header {
  width: 100%;
  background-color: var(--background-secondary);
  border-bottom: solid 2px var(--accent-high);
  padding: 10px;
}
nav {
  display: flex;
  justify-content: space-evenly;
}
.router-link {
  padding-left: 15px;
  padding-right: 15px;
  color: white;
  font-size: 2em;
  background-color: var(--background-clickable);
  border: solid 1px var(--accent-low);
  border-radius: 20px;
  text-decoration: none;
}
.router-link-active {
  color: var(--accent-high);
  border: solid 1px var(--accent-high);
}

.content {
  padding-top: 10px;
}
</style>