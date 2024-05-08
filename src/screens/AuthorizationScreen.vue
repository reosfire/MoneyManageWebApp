<script setup lang="ts">
import {computed, type Ref, ref, watchEffect} from 'vue'
import LoadingCircle from "@/components/LoadingCircle.vue";
import ErrorPopup from "@/components/auth/ErrorPopup.vue";
import LoginForm from "@/components/auth/LoginForm.vue";
import {RouterView, useRouter} from "vue-router";

const router = useRouter()

const serverAuthError: Ref<null | string> = ref(null)
const loading = ref(false)

class State {
  static readonly register  = new State('Register', '/register');
  static readonly login = new State('Login', '/login');

  // private to disallow creating other instances of this type
  private constructor(public readonly title: string, public readonly route: any) {
  }

  equals(other: State): boolean {
    return this.title == other.title && this.route == other.route;
  }
}

const state = ref(State.login)
watchEffect(() => router.push(state.value.route))

const oppositeState = computed(() => {
  if (state.value.equals(State.register)) return State.login
  else if (state.value.equals(State.login)) return State.register
  else throw Error("unknown state")
})

function toggleState() {
  state.value = oppositeState.value
}

function catchError(message: string) {
  serverAuthError.value = message
}
</script>

<template>
  <LoadingCircle v-if="loading"/>
  <ErrorPopup v-model="serverAuthError"/>
  <div class="screen">
    <div class="registration-block">
      <div class="state-label-container">
        <h1 class="state-label" @click="toggleState">{{ state.title }}</h1>
      </div>

      <router-view v-model:loading="loading" @serverError="catchError"/>

      <div class="state-toggle-container">
        <a class="state-toggle" @click="toggleState">{{ oppositeState.title }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.registration-block {
  background-color: var(--background-secondary);
  border-radius: 20px;
  border: solid 1px var(--accent-low);
  padding: 20px;
  width: 50%;
  height: fit-content;
}


.state-label-container {
  display: flex;
  justify-content: center;
  border-bottom-color: var(--accent-low);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.state-label {
  font-size: 1.5em;
  user-select: none;
  cursor: pointer;
  color: var(--text-primary);
}

.state-toggle-container {
  display: flex;
  justify-content: end;
}

.state-toggle {
  text-decoration-line: underline;
  cursor: pointer;
  user-select: none;
}

.state-toggle:hover {
  color: var(--accent-high);
}

@media (min-width: 1024px) {
  .registration-block {
    width: 512px;
  }
}

@media (max-width: 256px) {
  .registration-block {
    width: 128px;
  }
}
</style>