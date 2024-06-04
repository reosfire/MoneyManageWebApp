<script setup lang="ts">
import {ref} from "vue";
import ProfileButton from "@/components/icons/ProfileButton.vue";
import Menu from "@/components/Menu.vue";
import {vOnClickOutside} from '@vueuse/components';
import {type OnClickOutsideOptions, useElementBounding} from "@vueuse/core";
import RoomSelectButton from "@/components/icons/RoomSelectButton.vue";
import RoomSelector from "@/components/RoomSelector.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const headerRef = ref(null)
const {height} = useElementBounding(headerRef)

const profileMenuVisible = ref(false)
const roomSelectorVisible = ref(false)

function toggleMenu() {
  profileMenuVisible.value = !profileMenuVisible.value
}

function toggleRoomSelector() {
  roomSelectorVisible.value = !roomSelectorVisible.value
}

const ignoreMenuToggle = ref()
const ignoreRoomSelectToggle = ref()

const hideMenu: [(evt: any) => void, OnClickOutsideOptions] = [
  () => {
    if (profileMenuVisible.value == true) {
      profileMenuVisible.value = false
    }
  },
  {ignore: [ignoreMenuToggle]},
]

const hideRoomSelector: [(evt: any) => void, OnClickOutsideOptions] = [
  () => {
    if (roomSelectorVisible.value == true) {
      roomSelectorVisible.value = false
    }
  },
  {ignore: [ignoreRoomSelectToggle]},
]

function onRoomSelected(roomData: any) {
  const currentRoom = localStorage.getItem("selected-room-id")
  roomSelectorVisible.value = false
  if (roomData.id == currentRoom) return

  localStorage.setItem("selected-room-id", roomData.id)
  localStorage.setItem("selected-room-name", roomData.name)
  router.go(0)
}

const rooms = ref<any[]>([])
const selectedRoom = ref("")

sendGetRoomsRequest().then(roomsResponse => {
  rooms.value = roomsResponse

  const currentRoom = localStorage.getItem("selected-room-id")
  if (currentRoom == null) {
    localStorage.setItem("selected-room-id", roomsResponse[0].id)
    localStorage.setItem("selected-room-name", roomsResponse[0].name)
    selectedRoom.value = roomsResponse[0].name
  } else {
    let contains = false;
    for (let i = 0; i < roomsResponse.length; i++) {
      if (roomsResponse[i].id == currentRoom) {
        contains = true
        break
      }
    }
    if (!contains) {
      localStorage.setItem("selected-room-id", roomsResponse[0].id)
      localStorage.setItem("selected-room-name", roomsResponse[0].name)
      selectedRoom.value = roomsResponse[0].name
    } else {
      selectedRoom.value = localStorage.getItem("selected-room-name")!!
    }
  }
})

async function sendGetRoomsRequest() {
  const requestOptions = {
    method: "GET",
  };

  const response = await sendRequest("/api/rooms/brief-list", requestOptions)
  return response?.json()
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
  <div class="screen">
    <header ref="headerRef">
      <nav>
        <RouterLink class="router-link" to="/to-buy">to buy</RouterLink>
        <RouterLink class="router-link" to="/divisor">divisor</RouterLink>
        <RouterLink class="router-link" to="/rooms">rooms</RouterLink>
      </nav>
      <RoomSelectButton :selectedRoom="selectedRoom" @click="toggleRoomSelector" ref="ignoreRoomSelectToggle"/>
      <ProfileButton class="profile-icon" @click="toggleMenu" ref="ignoreMenuToggle"/>
    </header>
    <Menu class="menu"
          v-if="profileMenuVisible"
          v-on-click-outside="hideMenu"
          :style="{'top': height + 'px'}"
    />
    <RoomSelector class="room-selector"
                  v-if="roomSelectorVisible"
                  v-on-click-outside="hideRoomSelector"
                  :style="{'top': height + 'px'}"
                  :rooms="rooms"
                  @roomSelected="onRoomSelected"
    />
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
  border-radius: 8px;
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
  width: 100%;
  position: relative;
  background-color: var(--background-secondary);
  padding: 10px;
  border-radius: 8px;
}
</style>