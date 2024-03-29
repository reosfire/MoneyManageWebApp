<script setup lang="ts">
import {computed, type Ref, ref} from 'vue'
import {useRouter} from "vue-router";
import LoadingCircle from "@/components/LoadingCircle.vue";
import ErrorPopup from "@/components/ErrorPopup.vue";

const router = useRouter()

const loading = ref(false)

const serverAuthError: Ref<null | string> = ref(null)

enum State {
  register = "Register",
  login = "Login",
}

const state = ref(State.login)
const oppositeState = computed(() => {
  if (state.value == State.register) return State.login
  else if (state.value == State.login) return State.register
})

const login = ref("")
const password = ref("")

const loginError = computed(() => {
  if (login.value.length <= 3) return "Should be at least 3 characters long"
  if ((/[^a-zA-Z0-9_-]/.test(login.value))) return "Should match [a-zA-Z0-9_-]"
  return null
})
const passwordError = computed(() => {
  if (password.value.length <= 3) return "Should be at least 3 characters long"
  return null
})

const loginIncorrect = computed(() => {
  return loginError.value != null
})
const passwordIncorrect = computed(() => {
  return passwordError.value != null
})

const sendButtonInactive = computed(() => {
  return loginIncorrect.value || passwordIncorrect.value
})

function send() {
  if (sendButtonInactive.value) return

  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({login: login.value, password: password.value})
  };


  if (state.value == State.login) {
    performLogin(requestOptions)
  } else {
    performSend("/api/register", requestOptions)
        .then(success => {
          if (success) performLogin(requestOptions)
        })
  }
}

async function performSend(link: RequestInfo, requestOptions: any) {
  loading.value = true
  let response = await fetch(link, requestOptions);
  loading.value = false

  if (response.ok) {
    return true
  } else {
    response.text().then(text => {
      console.log(text)
      serverAuthError.value = text
    })
    return false
  }
}

function performLogin(requestOptions: any) {
  performSend("/api/login", requestOptions)
      .then(success => {
        if (success) router.push("/")
      })
}

function toggleState() {
  if (state.value == State.login) state.value = State.register
  else if (state.value == State.register) state.value = State.login
  else throw Error("unknown state")
}
</script>

<template>
  <LoadingCircle v-if="loading"/>
  <ErrorPopup v-model="serverAuthError"/>
  <div class="screen">
    <div class="registration-block">
      <div class="state-label-container">
        <h1 class="state-label" @click="toggleState">{{ state }}</h1>
      </div>

      <div class="input-block">
        <span class="input-label">Login: </span>
        <input class="input-field"
               :class="{ 'incorrect-input-field' : loginIncorrect }"
               v-model="login"/>
        <span class="error-label" v-if="loginIncorrect">{{ loginError }}</span>
      </div>

      <div class="input-block">
        <span class="input-label">Password: </span>
        <input type="password"
               class="input-field"
               :class="{ 'incorrect-input-field' : passwordIncorrect }"
               v-model="password"/>
        <span class="error-label" v-if="passwordIncorrect">{{ passwordError }}</span>
      </div>

      <button class="send-button" @click="send" :class="{ 'inactive-send-button' : sendButtonInactive }">Send</button>

      <div class="state-toggle-container">
        <a class="state-toggle" @click="toggleState">{{ oppositeState }}</a>
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


.input-block {
  margin-bottom: 10px;
}

.input-label {
  user-select: none;
  color: var(--text-secondary);
}

.input-field {
  outline: none;
  color: var(--text-primary);
  width: 100%;
  background-color: var(--background-secondary);
  border-radius: 5px;
  border: solid 2px var(--accent-high);
  font-size: 1.3em;
}

.incorrect-input-field {
  outline: none;
  border-color: indianred;
}

.error-label {
  color: indianred;
}


.send-button {
  background-color: var(--background-clickable);
  color: var(--text-primary);
  width: 100%;
  border-radius: 10px;
  height: 30px;
  cursor: pointer;
  border: solid 1px var(--accent-low);
  transition-duration: 200ms;
  outline: none;
}

.send-button:hover {
  border: solid 1px var(--accent-middle);
  background-color: var(--background-clickable-highlighted);
}

.send-button:active {
  border: solid 1px var(--accent-high);
  color: var(--accent-high);
}

.inactive-send-button {
  color: var(--text-secondary);
  text-decoration: line-through;
  cursor: initial;
}

.inactive-send-button:hover {
  border: solid 1px var(--accent-low);
  color: var(--text-secondary);
  background-color: var(--background-clickable);
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