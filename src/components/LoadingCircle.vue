<script setup lang="ts">

</script>

<template>
  <div class="screen">
    <div class="lds-ring">
      <div/>
      <div/>
    </div>
  </div>
</template>

<style scoped>
.screen {
  background-color: #00000077;
  backdrop-filter: blur(2px);
  width: 100%;
  position: absolute;
  display: flex;
  justify-items: center;
}


.lds-ring {
  width: 64px;
  height: 64px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  border: 5px solid;
  border-radius: 50%;
  animation: lds-ring 1s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
  border-color: var(--text-primary) var(--text-primary) transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>