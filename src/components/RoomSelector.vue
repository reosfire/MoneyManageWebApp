<script setup lang="ts">

const props = defineProps(["rooms"])
const emit = defineEmits<{
  (e: 'roomSelected', roomData: any): void
}>()

function onRoomClicked(roomData: any) {
  emit("roomSelected", roomData)
}

</script>

<template>
  <div class="menu">
    <div class="room-selector-title">Rooms:</div>
    <button v-for="room in props.rooms"
            class="room-item"
            @click="onRoomClicked(room)"
    >
      {{ room.name }}
    </button>
  </div>
</template>

<style scoped>
.menu {
  z-index: 1;
  border-radius: 8px;
  border: solid 1px var(--accent-low);
  background-color: var(--background-secondary);
  padding: 10px;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.room-selector-title {
  user-select: none;
  padding-bottom: 10px;
  color: var(--text-primary);
  font-weight: bold;
}

.room-item {
  width: 200px;
  font-size: 0.9em;
  padding: 5px;
  margin-bottom: 10px;
  text-align: start;
}
.room-item:last-child {
  margin-bottom: 0;
}

.active-room {
  color: var(--accent-high);
}
</style>