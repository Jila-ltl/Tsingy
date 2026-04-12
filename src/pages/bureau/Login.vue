<template>
  <main class=" bg-white w-full h-full overflow-hidden">
<div class="login-container ">
  <div class="login-card">
      <div class="login-header">
          <div class="logo-tsingy"></div>
          <h2>Connexion Bureau</h2>
          <p>Tsingy Marrakech</p>

          <div v-if="loginError" class="login-error">
            {{ loginError }}
          </div>
      </div>

      <form class="login-form" id="loginForm" @submit.prevent="handleSubmit">
          <div class="form-group" :class="{ error: posteError }">
              <div class="select-wrapper">
                  <select id="poste" name="poste" v-model="selectedPoste">
                      <option value="" disabled></option>
                      <option v-for="poste in postes" :key="poste.title" :value="poste.title">
                        {{ poste.title }}
                      </option>
                  </select>
                  <label for="poste">Poste</label>
              </div>
              <span class="error-message" v-if="posteError">{{ posteError }}</span>
            </div>

          <div class="form-group">
              <div class="input-wrapper password-wrapper" :class="{ error: passwordError }">
                  <input :type="showPassword ? 'text' : 'password'" v-model="password" autocomplete="current-password"/>
                  <label for="password">Mot de passe</label>
                  <div class="input-line"></div>
                  <button type="button" @click="togglePassword" class="password-toggle" id="passwordToggle" aria-label="Toggle password visibility">
                    <div class="toggle-ripple"></div>
                    <span class="toggle-icon" :class="{ 'show-password': showPassword }"></span>
                  </button>
              </div>
              <span class="error-message" v-if="passwordError">{{ passwordError }}</span>
          </div>

          <div class="form-options">
              <a href="#" class="forgot-password">Mot de passe oublié?</a>
          </div>

          <button type="submit" class="login-btn effect-btn" :class="{ loading: isLoading }" @click="createRipple">
              <span class="btn-text">Se connecter</span>
              <div class="btn-loader">
                  <svg class="loader-circle" viewBox="0 0 50 50">
                      <circle class="loader-path" cx="25" cy="25" r="12" fill="none" stroke="currentColor" stroke-width="3"/>
                  </svg>
              </div>
          </button>
      </form>

      <div class="signup-link">
          <p>Nouveau poste ? <a href="#" class="create-account">Créer un compte</a></p>
      </div>

  </div>
</div>
 </main>
</template>

<script setup>
import "@/css/login.css"

import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const postes = ref([])
const selectedPoste = ref("")
const password = ref("")
const showPassword = ref(false)

const posteError = ref("")
const passwordError = ref("")
const loginError = ref("")
const isLoading = ref(false)
const success = ref(false)

onMounted(async () => {
  const response = await fetch("../data/postes.json")
  const data = await response.json()
  postes.value = data.admin
})

function togglePassword() {
  showPassword.value = !showPassword.value
}

function validatePoste() {
  if (!selectedPoste.value) {
    posteError.value = "Veuillez choisir un poste"
    return false
  }
  posteError.value = ""
  return true
}

function validatePassword() {
  if (!password.value) {
    passwordError.value = "Mot de passe requis"
    return false
  }
  if (password.value.length < 4) {
    passwordError.value = "Mot de passe trop court"
    return false
  }
  passwordError.value = ""
  return true
}

async function handleSubmit() {
  loginError.value = ""
  const isPosteValid = validatePoste()
  const isPasswordValid = validatePassword()

  if (!isPosteValid || !isPasswordValid) return

  isLoading.value = true

  try {
    const user = postes.value.find(
      p => p.title === selectedPoste.value && p.password === password.value
    )

    await new Promise(resolve => setTimeout(resolve, 800))

    if (user) {
      success.value = true
      router.push("accueil")
    } else {
      loginError.value = "Informations entrées incorrectes"
    }
  } catch {
    loginError.value = "Erreur lors de la connexion"
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@keyframes materialPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
</style>

