<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import RoomEntry from "@/components/rooms/RoomEntry.vue";
import ToByEntryEditor from "@/components/to-buy/ToByEntryEditor.vue";
import InviteCodePopup from "@/components/rooms/InviteCodePopup.vue";
import TextInputPopup from "@/components/reusable/TextInputPopup.vue";

const router = useRouter()

const data = ref<any[]>([])
getRooms().then(roomsData => {
  data.value = roomsData
})

const inviteCodePopupShown = ref(false)
const inviteCode = ref("")
async function onInvitePressed(roomId: string) {
  const requestOptions = {
    method: "POST",
  };
  const response = await sendRequest("/api/rooms/invite?roomId=" + roomId, requestOptions)

  inviteCodePopupShown.value = true
  inviteCode.value = await response?.text() ?? ""
}
function hideInviteCodePopup() {
  inviteCodePopupShown.value = false
  inviteCode.value = ""
}

const createRoomPopupShown = ref(false)
function roomNameError(text: string) {
  if (text.length < 4) return "Room name must be at least 4 characters long"
  return null
}
function onCreateRoomPressed() {
  createRoomPopupShown.value = true
}
function onCreateRoomCanceled() {
  createRoomPopupShown.value = false
}
async function onCreateRoomConfirmed(name: string) {
  const requestOptions = {
    method: "POST",
  };
  await sendRequest("/api/rooms/create?name=" + name, requestOptions)
  router.go(0)
}

async function onLeavePressed(roomId: string) {
  const requestOptions = {
    method: "POST",
  };
  await sendRequest("/api/rooms/leave?roomId=" + roomId, requestOptions)
  router.go(0)
}

const enterCodePopupShown = ref(false)
function inviteCodeError(text: string) {
  if (text.length != 8) return "Invite code is exactly 8 characters long"
  return null
}
function onEnterCodePressed() {
  enterCodePopupShown.value = true
}
function onEnterCodeCancelled() {
  enterCodePopupShown.value = false
}
async function onEnterCodeConfirmed(code: string) {
  const requestOptions = {
    method: "POST",
  };
  await sendRequest("/api/rooms/use-invite-code?code=" + code, requestOptions)
  router.go(0)
}

async function onRemoveUserPressed(roomId: string, user: string) {
  const requestOptions = {
    method: "POST",
  };
  await sendRequest("/api/rooms/remove-user?roomId=" + roomId + "&user=" + user, requestOptions)
  router.go(0)
}



async function getRooms() {
  const requestOptions = {
    method: "GET",
  };
  const response = await sendRequest("/api/rooms/list", requestOptions)
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
  <div class="popup-container" v-if="inviteCodePopupShown">
    <InviteCodePopup :title="'Invite code: ' + inviteCode"
                     @confirmPressed="hideInviteCodePopup"
    />
  </div>
  <div class="popup-container" v-if="createRoomPopupShown">
    <TextInputPopup title="Room name:"
                    :text-validator="roomNameError"
                    @cancelPressed="onCreateRoomCanceled"
                    @confirmPressed="onCreateRoomConfirmed"
    />
  </div>
  <div class="popup-container" v-if="enterCodePopupShown">
    <TextInputPopup title="Invite code:"
                    :text-validator="inviteCodeError"
                    @cancelPressed="onEnterCodeCancelled"
                    @confirmPressed="onEnterCodeConfirmed"
    />
  </div>
  <div class="rooms-screen">
    <div class="rooms-list">
      <RoomEntry v-for="entry in data" :data="entry"
                 class="room-entry"
                 @invitePressed="onInvitePressed"
                 @leavePressed="onLeavePressed"
                 @removeUserPressed="onRemoveUserPressed"
      />
    </div>

    <div class="global-buttons-container">
      <button class="global-action-button" @click="onCreateRoomPressed">Create new</button>
      <button class="global-action-button" @click="onEnterCodePressed">Enter code</button>
    </div>
  </div>
</template>

<style scoped>
.popup-container {
  position: absolute;
  margin: -10px;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
}

.rooms-screen {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.rooms-list {
  overflow-y: auto;
  margin-bottom: 10px;
  flex: 1 1 auto;
}
.room-entry {
  margin-bottom: 10px;
}
.room-entry:last-child {
  margin-bottom: 0;
}

.global-buttons-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 2%;
}
.global-action-button {
  font-size: 1.3em;
  flex: 0 1 auto;
  width: 50%;
}
</style>