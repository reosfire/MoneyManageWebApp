<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const userData = await fetch("api/")
const json = await userData.json()
const username = json.login

const logout = () => {
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
  <div class="menu">
    <div class="username-label">{{username}}</div>
    <div class="menu-item" @click="logout">Logout</div>
    <div class="menu-item">Settings</div>
  </div>
</template>

<style scoped>
.menu {
  border-radius: 8px;
  border: solid 1px var(--accent-low);
  background-color: var(--background-secondary);
  padding: 10px;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.username-label {
  user-select: none;
  padding-bottom: 10px;
  color: var(--text-primary);
  font-weight: bold;
}
.menu-item {
  width: 200px;
  font-size: 1.2em;
  background-color: var(--background-clickable);
  color: var(--text-primary);
  padding: 5px;
  margin-bottom: 10px;

  border-radius: 8px;
  border: solid 1px var(--accent-low);
  cursor: pointer;
  user-select: none;
}
.menu-item:hover {
  border: solid 1px var(--accent-middle);
  background-color: var(--background-clickable-highlighted);
}
.menu-item:last-child {
  margin-bottom: 0;
}
</style>