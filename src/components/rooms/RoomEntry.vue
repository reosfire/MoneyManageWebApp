<script setup lang="ts">

const props = defineProps(["data"])
const isOwner = localStorage.getItem("username") == props.data.owner

const emit = defineEmits<{
  (e: 'invitePressed', roomId: string): void
  (e: 'leavePressed', roomId: string): void
  (e: 'removeUserPressed', roomId: string, username: string): void
}>()

function onInviteButtonClicked() {
  emit("invitePressed", props.data.id)
}

function onLeaveButtonClicked() {
  emit("leavePressed", props.data.id)
}

function onRemoveUserClicked(username: string) {
  emit("removeUserPressed", props.data.id, username)
}

</script>

<template>
<div class="room-entry">
  <div class="title">{{props.data.name}}</div>
  <div class="room-infos">
    <div class="owner-container">
      <div class="label">Owner:</div>
      <div class="owner"> {{props.data.owner}} </div>
    </div>
    <div class="label">Users:</div>
    <div class="users-container">
      <div class="user-entry" v-for="user in props.data.users">
        <div>- {{user}}</div>
        <button v-if="isOwner && user != props.data.owner" @click="onRemoveUserClicked(user)">remove</button>
      </div>
    </div>
  </div>
  <div class="control-buttons">
    <button class="control-button" v-if="isOwner" @click="onInviteButtonClicked">Invite</button>
    <button class="control-button" v-if="isOwner" @click="onLeaveButtonClicked">Delete</button>
    <button class="control-button" v-if="!isOwner" @click="onLeaveButtonClicked">Leave</button>
  </div>
</div>
</template>

<style scoped>
.room-entry {
  padding: 8px;
  border: solid, 1px, var(--accent-low);
  border-radius: 8px;
}

.title {
  font-size: 1.1em;
}

.room-infos {
  padding-left: 2%;
}

.owner-container {
  display: flex;
  gap: 1%;
}

.users-container {
  padding-left: 2%;
  padding-bottom: 10px;
}

.user-entry {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.control-buttons {
  display: flex;
  gap: 2%;
}

.control-button {
  width: 100%;
  padding: 2px;
}
</style>