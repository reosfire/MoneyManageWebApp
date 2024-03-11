<script setup lang="ts">

import {ref} from "vue";

const props = defineProps(["color", "label"])

const labelProp = ref(props.color)

</script>

<template>
<div class="tag">
  <span class="label">{{ label }}</span>
</div>
</template>

<style scoped>
.tag {
  --circle-color: v-bind(labelProp);
  display: flex;
  align-items: center;
  background-color: var(--circle-color);
  border-radius: 1em;
  padding: 0 8px;
}

.label {
  border-radius: 50%;
}
</style>