<script setup lang="ts">
import {ref} from "vue";
import ProfileButton from "@/components/icons/ProfileButton.vue";
import Menu from "@/components/Menu.vue";
import {vOnClickOutside} from '@vueuse/components';
import {type OnClickOutsideOptions, useElementBounding} from "@vueuse/core";
import RoomSelectButton from "@/components/icons/RoomSelectButton.vue";

const headerRef = ref(null)
const {height} = useElementBounding(headerRef)

const profileMenuShowing = ref(false)

function toggleMenu() {
  profileMenuShowing.value = !profileMenuShowing.value
}

const ignoreMenuToggle = ref()

const hideMenu: [(evt: any) => void, OnClickOutsideOptions] = [
  () => {
    if (profileMenuShowing.value == true) {
      profileMenuShowing.value = false
    }
  },
  {ignore: [ignoreMenuToggle]},
]

</script>

<template>
  <header ref="headerRef">
    <nav>
      <RouterLink class="router-link" to="/to-buy">to buy</RouterLink>
      <RouterLink class="router-link" to="/divisor">divisor</RouterLink>
      <RouterLink class="router-link" to="/rooms">rooms</RouterLink>
    </nav>
    <RoomSelectButton/>
    <profile-button class="profile-icon" @click="toggleMenu" ref="ignoreMenuToggle"/>
  </header>
  <suspense>
    <Menu class="menu" v-if="profileMenuShowing" v-on-click-outside="hideMenu" :style="{
      'top': height + 'px'
    }"/>
  </suspense>
  <div class="content-holder" :style="{
    'margin-top': height + 'px'
  }">
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;

  background-color: var(--background-secondary);
  border-bottom: solid 2px var(--accent-high);
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

nav {
  display: flex;
  justify-content: space-evenly;
  flex: 90;
  padding: 0 10% 0 10%;
}

.router-link {
  color: var(--text-primary);
  font-size: 1.5em;
  text-decoration: none;
  user-select: none;
  padding: 1px 15px 3px 15px;
  border-radius: 10px;
}

.router-link:hover {
  background-color: var(--background-clickable-highlighted);
}

.router-link:active {
  border: solid 1px var(--accent-middle);
  padding: 0 14px 2px 14px;
}

.router-link-active {
  border-bottom: solid 3px var(--accent-high);
  padding: 1px 15px 0 15px;
  border-radius: 0;
}

.router-link-active:hover {
  background-color: var(--background-secondary);
}

.router-link-active:active {
  color: var(--text-primary);
  border: none;
  padding: 1px 15px 0 15px;
  border-bottom: solid 3px var(--accent-high);
}

.menu {
  position: fixed;
  top: 60px;
  right: 10px;
}

@media (min-width: 1024px) {
  .menu {
    top: 68px;
  }
}

.content-holder {
  max-width: 100%;
  padding: 10px 10% 0 10%;
}

.content {
  background-color: var(--background-secondary);
  padding: 10px;
  border-radius: 10px;
}
</style>