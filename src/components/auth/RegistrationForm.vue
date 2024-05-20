<script setup lang="ts">
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {WebSocket} from "vite";

const emit = defineEmits<{
  (e: 'serverError', errorMessage: string): void
}>()

const loading = defineModel("loading")

const tgToken = ref("")
const tgLink = computed(() => {
  return "https://t.me/SpendingDivisorBot?start=" + tgToken.value
})

getTelegramToken().then(token => tgToken.value = token)


const router = useRouter()

const login = ref("")
const password = ref("")

const loginError = computed(() => {
  if (login.value.length < 3) return "Should be at least 3 characters long"
  if ((/[^a-zA-Z0-9_-]/.test(login.value))) return "Should match [a-zA-Z0-9_-]"
  return null
})
const passwordError = computed(() => {
  if (password.value.length < 6) return "Should be at least 6 characters long"
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

  const registerOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      login: login.value,
      password: password.value,
      telegramToken: tgToken.value,
    })
  };

  const loginOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      login: login.value,
      password: password.value,
    })
  };

  performRequest("/api/register", registerOptions)
      .then(success => {
        if (success) performLogin(loginOptions)
      })
}

function performLogin(requestOptions: any) {
  performRequest("/api/login", requestOptions)
      .then(success => {
        if (success) router.push("/")
      })
}

async function performRequest(link: RequestInfo, requestOptions: any) {
  loading.value = true
  let response = await fetch(link, requestOptions);
  loading.value = false

  if (response.ok) {
    return true
  } else {
    response.text().then(text => {
      console.log(text)

      emit("serverError", text)
    })
    return false
  }
}

async function getTelegramToken(): Promise<string> {
  const requestOptions = {
    method: "POST",
  };

  loading.value = true
  let response = await fetch("/api/tokenForTg", requestOptions);
  loading.value = false

  if (response.ok) {
    return response.text()
  } else {
    response.text().then(text => {
      console.log(text)

      emit("serverError", text)
    })
    return ""
  }
}
</script>

<template>
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

  <div>
    <a :href="tgLink" target="_blank">Telegram</a>
  </div>

  <button class="send-button" @click="send" :class="{ 'inactive-send-button' : sendButtonInactive }">Send</button>
</template>

<style scoped>
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
</style>