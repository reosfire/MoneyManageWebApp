<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()

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

const loginIncorrect = computed(() => {
  return login.value.length < 3
})
const passwordIncorrect = computed(() => {
  return password.value.length < 3
})

const sendButtonInactive = computed(() => {
  return loginIncorrect.value || passwordIncorrect.value
})

const send = () => {
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

const performSend = (link: RequestInfo, requestOptions: any) => {
  return fetch(link, requestOptions)
      .then(response => {
        if (response.ok) {
          return true
        }
        else {
          response.text().then(text => {
            console.log(text)
          })
          return false
        }
      })
}

const performLogin = (requestOptions: any) => {
  performSend("/api/login", requestOptions)
      .then(success => {
        if (success) router.push("/")
      })
}

const toggleState = () => {
  if (state.value == State.login) state.value = State.register
  else if (state.value == State.register) state.value = State.login
  else throw Error("unknown state")
}

</script>

<template>
  <div class="screen">
    <div class="registration-block">
      <div class="state-label-container">
        <h1 class="state-label" @click="toggleState">{{ state }}</h1>
      </div>

      <div class="input-block">
        <span class="input-label">Login: </span>
        <input class="input-field" :class="{ 'incorrect-input-field' : loginIncorrect }" v-model="login"/>
      </div>

      <div class="input-block">
        <span class="input-label">Password: </span>
        <input type="password"
               class="input-field password-field"
               :class="{ 'incorrect-input-field' : passwordIncorrect }"
               v-model="password"/>
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
  background-color: var(--color-background-mute);
  border-radius: 20px;
  padding: 20px;
  width: 50%;
  height: fit-content;
}

.state-label-container {
  display: flex;
  justify-content: center;
  border-bottom-color: var(--block-text-color);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.state-label {
  font-size: 1.5em;
  user-select: none;
  cursor: pointer;
}

.input-block {
  margin-bottom: 10px;
}

.input-label {
  user-select: none;
}

.input-field {
  width: 100%;
  border-radius: 5px;
  border-color: var(--color-border);
  font-size: 1.3em;
}

.password-field {
  padding-right: 30px;
}

.incorrect-input-field {
  outline-color: orangered;
  border-color: indianred;
}

.incorrect-input-field:focus {
  outline-color: indianred;
}

.send-button {
  width: 100%;
  border-radius: 10px;
  height: 30px;
  cursor: pointer;
  border-style: none;
  transition-duration: 200ms;
}

.send-button:hover {
  background-color: dimgrey;
}

.inactive-send-button {
  background-color: dimgrey;
}

.inactive-send-button:active {
  outline: none;
  border-style: none;
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
  color: whitesmoke;
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