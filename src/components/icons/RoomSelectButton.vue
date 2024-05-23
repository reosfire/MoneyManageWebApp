<template>
  <div class="rooms-dropdown">
    <div class="label">room 1</div>
    <svg xmlns="http://www.w3.org/2000/svg" id="arrow" x="0" y="0" version="1.1" viewBox="5 4 19 18"
         xml:space="preserve">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
            stroke-width="2" d="m20.5 11.5-6 6-6-6"></path>
    </svg>
  </div>
</template>

<style scoped>
.rooms-dropdown {
  margin-right: 2%;
  padding: 1px 10px 1px 10px;
  border: solid 1px var(--accent-low);
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  stroke: var(--icon-primary);
}

.rooms-dropdown:hover {
  background-color: var(--background-clickable-highlighted);
}

.label {
  padding-right: 5px;
}

svg {
  width: 1em;
  height: 1em;
}
</style>