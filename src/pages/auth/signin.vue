<template>
  <div class="signin-page  h-[calc(100dvh-76px)] overflow-y-auto bg-stone-950 text-stone-50">
    <section class="signin-hero relative isolate flex   items-center   px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:px-16 lg:py-8">
      <div class="signin-hero__mesh" />
      <div class="signin-hero__orb signin-hero__orb--left" />
      <div class="signin-hero__orb signin-hero__orb--right" />

      <div class="relative  z-10 mx-auto grid w-full max-w-6xl items-center gap-5 md:grid-cols-[0.8fr_1.2fr] md:gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
        <div class="max-w-xl hidden md:block">
          <p class="signin-kicker mb-4 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100 backdrop-blur-sm">
            Espace membre
          </p>

          <h1 class="font-serif text-4xl font-semibold leading-[0.92] text-white sm:text-5xl md:text-6xl lg:text-[3.9rem] xl:text-[4.4rem]">
            Connectez-vous simplement.
          </h1>

          <p class="mt-4 max-w-xl text-sm leading-7 text-stone-200 sm:text-base sm:leading-8 md:text-lg">
            Accedez a votre espace membre pour retrouver vos informations et les actualites de Tsingy Marrakech.
          </p>

          <div class="mt-5 flex flex-col gap-3">
            <button
              class="signin-button signin-button--ghost w-full md:w-auto"
              type="button"
              @click="router.push('/')"
            >
              Retour a l accueil
            </button>
            <button
              class="signin-button signin-button--secondary w-full md:w-auto"
              type="button"
              @click="inscription_rout"
            >
              Creer un compte
            </button>
          </div>
        </div>

        <div class="signin-shell overflow-hidden rounded-[1.75rem]  ">
          <div class="grid gap-0 overflow-hidden rounded-[1.3rem]   md:grid-cols-[1.05fr_0.95fr] lg:rounded-[1.7rem]">
            <form class="signin-form-panel" @submit.prevent="load">
              <p class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
                Connexion
              </p>
              <h2 class="mt-3 font-serif text-[2rem] font-semibold leading-tight text-white">
                Heureux de vous revoir.
              </h2>
              <p class="mt-3 max-w-lg text-sm leading-7 text-stone-300 sm:text-base">
                Saisissez vos identifiants pour continuer.
              </p>

              <div class="signin-fields mt-6">
                <div v-for="(item, i) in user_form" :key="i" class="field-group">
                  <label class="field-label" :for="item.id">
                    {{ item.title }}
                  </label>
                  <Input_
                    :id="item.id"
                    v-model="item.field"
                    :placeholder="item.title"
                    :type="item.type"
                  />
                </div>
              </div>

              <button
                class="signin-button signin-button--primary mt-6 w-full"
                :disabled="appStore.loading"
                type="submit"
              >
                {{ appStore.loading ? 'Connexion en cours...' : 'Se connecter' }}
              </button>
            </form>

            <aside class="signin-aside-panel">
              <div class="signin-badge-wrap">
                <div class="signin-badge">
                  <v-icon size="52">mdi-account-circle</v-icon>
                </div>
              </div>

              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
                  Nouveau membre
                </p>
                <h3 class="mt-3 font-serif text-[1.75rem] font-semibold leading-tight text-white">
                  Pas encore membre ?
                </h3>
                <p class="mt-3 text-sm leading-7 text-stone-300 sm:text-base">
                  Inscrivez-vous pour acceder a votre espace personnel.
                </p>
              </div>

              <button
                class="signin-button signin-button--secondary w-full"
                type="button"
                @click="inscription_rout"
              >
                S inscrire
              </button>
            </aside>
          </div>
        </div>
      </div>
    </section>
  </div>

  <v-snackbar
    v-model="feedback.open"
    :color="feedback.type === 'success' ? 'green-darken-2' : 'red-darken-2'"
    location="top"
    min-width="320"
    timeout="3200"
    variant="flat"
  >
    <div class="flex flex-col gap-1">
      <span class="text-sm font-bold uppercase tracking-[0.16em]">{{ feedback.type === 'success' ? 'Succès' : 'Erreur' }}</span>
      <span class="text-sm leading-6">{{ feedback.message }}</span>
    </div>
  </v-snackbar>
</template>

<script setup>

  import {
    reactive,
    ref,
  } from 'vue'

  import { useRouter } from 'vue-router'
  import { useAppStore } from '@/stores/app'

  const router = useRouter()
  const appStore = useAppStore()
  const feedback = reactive({
    message: '',
    open: false,
    type: 'success',
  })
  const user_form = ref(
    [{
       id: 'signin-email',
       field: '',
       title: 'Adresse email',
       type: 'email',
       icon: 'mdi-email',

     },
     {
       id: 'signin-password',
       field: '',
       title: 'Mot de passe',
       type: 'password',
       icon: 'mdi-lock',

     },
    ],
  )

  function getFrenchFieldLabel (fieldName) {
    const labels = {
      email: 'adresse email',
      password: 'mot de passe',
    }

    return labels[fieldName] || fieldName
  }

  function translateValidationMessage (fieldName, rawMessage) {
    const label = getFrenchFieldLabel(fieldName)

    if (!rawMessage) {
      return `Le champ ${label} est invalide.`
    }

    if (rawMessage.includes('Invalid email')) {
      return 'L adresse email n est pas valide.'
    }

    if (rawMessage.includes('at least 6 character')) {
      return 'Le mot de passe doit contenir au moins 6 caracteres.'
    }

    if (rawMessage.includes('at least 1 character')) {
      return `Le champ ${label} est obligatoire.`
    }

    return `Le champ ${label} est invalide.`
  }

  function formatValidationErrors (error) {
    const fieldErrors = error?.payload?.fields?.fieldErrors || {}
    const messages = Object.entries(fieldErrors)
      .flatMap(([fieldName, fieldMessages]) => (fieldMessages || []).map(message => translateValidationMessage(fieldName, message)))
      .filter(Boolean)

    if (messages.length === 0) {
      return 'Certaines informations sont invalides. Vérifiez le format de votre email et réessayez.'
    }

    return `Informations invalides : ${messages.join(' ')}`
  }

  function getFrenchAuthMessage (error) {
    const sourceMessage = error?.message || appStore.error || ''

    if (!sourceMessage) {
      return 'La connexion a échoué. Vérifiez vos informations puis recommencez.'
    }

    if (sourceMessage.includes('Invalid email or password')) {
      return 'Email ou mot de passe incorrect. Vérifiez vos identifiants puis réessayez.'
    }

    if (sourceMessage.includes('Request failed') || sourceMessage.includes('Failed to fetch')) {
      return 'Impossible de joindre le serveur pour le moment. Vérifiez que le backend est démarré.'
    }

    if (sourceMessage.includes('Authentication required')) {
      return 'Votre session n’est pas reconnue. Veuillez vous reconnecter.'
    }

    if (sourceMessage.includes('Validation failed') || sourceMessage.includes('Certaines informations sont invalides')) {
      return formatValidationErrors(error)
    }

    return sourceMessage
  }

  function showFeedback (type, message) {
    feedback.type = type
    feedback.message = message
    feedback.open = true
  }

  async function load () {
    const email = user_form.value[0].field.trim()
    const password = user_form.value[1].field.trim()

    if (!email || !password) {
      showFeedback('error', 'Veuillez renseigner votre email et votre mot de passe avant de continuer.')
      return
    }

    try {
      const user = await appStore.login({
        email,
        password,
      })

      showFeedback('success', 'Connexion réussie. Redirection vers votre espace en cours...')
      window.setTimeout(() => {
        router.push(user.role === 'BUREAU' || user.role === 'ADMIN' ? '/bureau/accueil' : '/users/membre')
      }, 900)
    } catch (error) {
      showFeedback('error', getFrenchAuthMessage(error))
      return
    }
  }
  function inscription_rout () {
    router.push('/auth/signup')
  }
</script>

<style scoped>
.signin-hero {
  background:
    linear-gradient(135deg, rgba(7, 10, 8, 0.72), rgba(15, 23, 42, 0.68)),
    url('/img/img_group.jpeg') center / cover no-repeat;
}

.signin-page {
  overflow: hidden;
}

.signin-hero__mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 82%);
  opacity: 0.5;
  pointer-events: none;
}

.signin-hero__orb {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
}

.signin-hero__orb--left {
  top: 8%;
  left: -7rem;
  width: 21rem;
  height: 21rem;
  background: radial-gradient(circle, rgba(52, 211, 153, 0.24) 0%, rgba(52, 211, 153, 0) 72%);
}

.signin-hero__orb--right {
  right: -9rem;
  bottom: 12%;
  width: 25rem;
  height: 25rem;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.18) 0%, rgba(251, 191, 36, 0) 72%);
}

.signin-kicker,
.signin-shell,
.signin-button,
.signin-badge,
.signin-aside-panel {
  position: relative;
  z-index: 1;
}

.signin-shell {
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03));
}

.signin-form-panel {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  background: rgba(3, 7, 18, 0.74);
  padding: 1.15rem 1rem;
}

.signin-aside-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.9rem;
  background:
    radial-gradient(circle at top, rgba(52, 211, 153, 0.16), transparent 36%),
    rgba(10, 15, 22, 0.94);
  padding: 1.15rem 1rem;
}

.signin-fields {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.field-label {
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.signin-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0.8rem 1.2rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease, border-color 220ms ease;
}

.signin-button:hover {
  transform: translateY(-2px);
}

.signin-button:disabled {
  cursor: wait;
  opacity: 0.8;
  transform: none;
}

.signin-button--primary {
  background: linear-gradient(135deg, #ffffff 0%, #34d399 100%);
  box-shadow: 0 18px 40px rgba(52, 211, 153, 0.22);
  color: #052e2b;
}

.signin-button--secondary {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.signin-button--ghost {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.signin-badge-wrap {
  display: flex;
  justify-content: flex-start;
}

.signin-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.35rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03));
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.signin-form-panel :deep(.custom-input) {
  min-height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.signin-form-panel :deep(.custom-input::placeholder) {
  color: rgba(231, 229, 228, 0.68);
}

.signin-form-panel :deep(.custom-input:focus) {
  border-color: rgba(52, 211, 153, 0.9);
  box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.14);
  background: rgba(255, 255, 255, 0.12);
}

@media (min-width: 640px) {
  .signin-form-panel,
  .signin-aside-panel {
    padding: 1.3rem 1.15rem;
  }
}

@media (min-width: 768px) {
  .signin-form-panel,
  .signin-aside-panel {
    min-height: 100%;
  }
}

@media (min-width: 1024px) {
  .signin-form-panel,
  .signin-aside-panel {
    padding: 1.45rem 1.25rem;
  }
}

@media (max-height: 820px) {
  .signin-hero {
    align-items: center;
  }

  .signin-kicker {
    margin-bottom: 0.75rem;
  }

  .signin-form-panel,
  .signin-aside-panel {
    gap: 0.85rem;
    padding: 1.2rem 1rem;
  }

  .signin-badge {
    width: 4rem;
    height: 4rem;
  }
}

@media (max-height: 760px) and (min-width: 1024px) {
  .signin-hero {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .signin-form-panel,
  .signin-aside-panel {
    padding: 1rem 0.9rem;
  }

  .signin-form-panel :deep(.custom-input) {
    min-height: 44px;
  }
}

</style>
