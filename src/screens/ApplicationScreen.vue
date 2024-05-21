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
  <div class="screen">
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
      <Menu class="menu"
            v-if="profileMenuShowing"
            v-on-click-outside="hideMenu"
            :style="{'top': height + 'px'}"/>
    </suspense>
    <div class="content-holder">
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen {
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

header {
  width: 100%;
  background-color: var(--background-secondary);
  border-bottom: solid 2px var(--accent-high);
  padding: 8px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 0 1 auto;
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
  padding: 0 10px 3px 10px;
  border-radius: 10px;
}

.router-link:hover {
  background-color: var(--background-clickable-highlighted);
}

.router-link-active {
  border-bottom: solid 3px var(--accent-high);
  padding: 0 10px 2px 10px;
  border-radius: 0;
}

.router-link-active:hover {
  background-color: var(--background-secondary);
}

.router-link-active:active {
  color: var(--text-primary);
  border: none;
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
  width: 100%;
  padding: 10px 10% 10px 10%;
  flex: 1 1 auto;
  height: 50%; /* this is a hack that works with flexs. idk what will happen further with my project because of it */
}
@media (min-width: 1024px) {
  .content-holder {
    padding: 10px 20% 10px 20%;
  }
}

.content {
  height: 100%;
  background-color: var(--background-secondary);
  padding: 10px;
  border-radius: 10px;
}
</style>