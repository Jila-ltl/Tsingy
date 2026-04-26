<template>
  <div class="signup-page h-[calc(100dvh-76px)] bg-stone-950 text-stone-50">
    <section class="signup-hero relative isolate flex h-full items-start overflow-hidden px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:px-16 lg:py-8">
      <div class="signup-hero__mesh" />
      <div class="signup-hero__orb signup-hero__orb--left" />
      <div class="signup-hero__orb signup-hero__orb--right" />

      <div class=" flex fex-row w-full items-center justify-center h-full">

        <div class="signup-shell overflow-hidden rounded-[1.75rem] shadow-[0_30px_120px_rgba(0,0,0,0.35)]   sm:rounded-[2.1rem] ">
          <div class="grid gap-0 overflow-hidden rounded-[1.3rem]  md:grid-cols-[1.08fr_0.92fr] lg:rounded-[1.7rem]">
            <div class="signup-form-panel">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
                  Inscription
                </p>
                <h2 class="mt-3 font-serif text-[2rem] font-semibold leading-tight text-white">
                  Creez votre espace.
                </h2>
                <p class="mt-2 max-w-lg text-sm leading-6 text-stone-300 sm:text-base">
                  Completez les champs essentiels.
                </p>
              </div>

              <div class="step-header mt-4">
                <div class="step-copy">
                  <span class="step-badge">Etape {{ currentPage }} / {{ totalPages }}</span>
                </div>
                <div class="step-dots">
                  <button
                    v-for="page in totalPages"
                    :key="page"
                    class="step-dot"
                    :class="{ 'step-dot-active': page === currentPage }"
                    type="button"
                    @click="goToPage(page)"
                  />
                </div>
              </div>

              <div class="fields-grid mt-4">
                <div v-for="champ in champsAffiches" :key="champ.id" class="field-group">
                  <label class="field-label" :for="champ.id">
                    {{ champ.label }}
                  </label>

                  <Select_
                    v-if="champ.type === 'select'"
                    :id="champ.id"
                    v-model="formValues[champ.id]"
                    :options="champ.options || []"
                    :placeholder="champ.placeholder"
                  />

                  <Input_
                    v-else
                    :id="champ.id"
                    v-model="formValues[champ.id]"
                    :placeholder="champ.placeholder"
                    :type="champ.type"
                  />
                </div>
              </div>

              <div class="actions-row mt-4">
                <button
                  class="signup-button signup-button--ghost action-btn"
                  :disabled="currentPage === 1"
                  type="button"
                  @click="goToPreviousPage"
                >
                  Precedent
                </button>

                <button
                  v-if="currentPage < totalPages"
                  class="signup-button signup-button--primary action-btn"
                  type="button"
                  @click="goToNextPage"
                >
                  Suivant
                </button>

                <button
                  v-else
                  class="signup-button signup-button--primary action-btn"
                  :disabled="appStore.loading"
                  type="button"
                  @click="inscription_rout"
                >
                  {{ appStore.loading ? 'Inscription en cours...' : 'S inscrire' }}
                </button>
              </div>
            </div>

            <aside class="signup-aside-panel hidden md:flex">
              <div class="signup-badge-wrap">
                <div class="signup-badge">
                  <v-icon size="52">mdi-account-circle</v-icon>
                </div>
              </div>

              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
                  Parcours membre
                </p>
                <h3 class="mt-3 font-serif text-[1.75rem] font-semibold leading-tight text-white">
                  Inscription rapide.
                </h3>
                <p class="mt-2 text-sm leading-6 text-stone-300 sm:text-base">
                  Avancez etape par etape.
                </p>
              </div>

              <button
                class="signup-button signup-button--secondary w-full"
                type="button"
                @click="router.push('/auth/signin')"
              >
                Se connecter
              </button>
              <button
                class="signup-button signup-button--secondary w-full"
                type="button"
                @click="router.push('/')"
              >
                Retour a l accueil
              </button>
            </aside>
          </div>
        </div>
      </div>
    </section>

    <v-snackbar
      v-model="feedback.open"
      :color="feedback.type === 'success' ? 'green-darken-2' : 'red-darken-2'"
      location="top"
      min-width="320"
      timeout="3800"
      variant="flat"
    >
      <div class="flex flex-col gap-1">
        <span class="text-sm font-bold uppercase tracking-[0.16em]">{{ feedback.type === 'success' ? 'Succès' : 'Erreur' }}</span>
        <span class="text-sm leading-6">{{ feedback.message }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script setup>
  import {
    computed,
    reactive,
    ref,
  } from 'vue'
  import {
    useRouter,
  } from 'vue-router'
  import { useAppStore } from '@/stores/app'

  const router = useRouter()
  const appStore = useAppStore()
  const feedback = reactive({
    message: '',
    open: false,
    type: 'success',
  })
  const currentPage = ref(1)
  const champsParPage = 5

  const configurationChamps = [{
                                 id: 'nom',
                                 label: 'Nom',
                                 type: 'text',
                                 placeholder: 'Votre nom',
                               },
                               {
                                 id: 'prenom',
                                 label: 'Prenom',
                                 type: 'text',
                                 placeholder: 'Votre prenom',
                               },
                               {
                                 id: 'mot_de_passe',
                                 label: 'Mot de passe',
                                 type: 'password',
                                 placeholder: 'Mot de passe',
                               },
                               {
                                 id: 'matricule',
                                 label: 'Matricule AMCI',
                                 type: 'text',
                                 placeholder: 'Votre matricule AMCI',
                               },
                               {
                                 id: 'date_naissance',
                                 label: 'Date de naissance',
                                 type: 'date',
                                 placeholder: 'Votre date de naissance',
                               },
                               {
                                 id: 'profession',
                                 label: 'Profession',
                                 type: 'select',
                                 placeholder: 'Choisir votre profession',
                                 options: ['Etudiant', 'Travailleur'],
                               },
                               {
                                 id: 'passeport',
                                 label: 'Passeport',
                                 type: 'text',
                                 placeholder: 'Numero de passeport',
                               },
                               {
                                 id: 'carte_sejour',
                                 label: 'Carte sejour',
                                 type: 'text',
                                 placeholder: 'Numero carte sejour',
                               },
                               {
                                 id: 'arrivee_maroc',
                                 label: 'Arrivee Maroc',
                                 type: 'date',
                                 placeholder: 'Date arrivee au Maroc',
                               },
                               {
                                 id: 'domicile',
                                 label: 'Domicile',
                                 type: 'text',
                                 placeholder: 'Votre adresse',
                               },
                               {
                                 id: 'email',
                                 label: 'Email',
                                 type: 'email',
                                 placeholder: 'Votre email',
                               },
                               {
                                 id: 'contact',
                                 label: 'Contact',
                                 type: 'text',
                                 placeholder: 'Votre numero de telephone',
                               },
                               {
                                 id: 'universite',
                                 label: 'Universite',
                                 type: 'text',
                                 placeholder: 'Votre universite ou structure',
                               },
                               {
                                 id: 'filiere',
                                 label: 'Filiere',
                                 type: 'text',
                                 placeholder: 'Votre filiere ou domaine',
                               },
                               {
                                 id: 'nom_facebook',
                                 label: 'Facebook',
                                 type: 'text',
                                 placeholder: 'Votre profil Facebook',
                               },
  ]

  const formValues = ref(
    Object.fromEntries(configurationChamps.map(champ => [champ.id, ''])),
  )

  const totalPages = computed(() => Math.ceil(configurationChamps.length / champsParPage))

  function showFeedback (type, message) {
    feedback.type = type
    feedback.message = message
    feedback.open = true
  }

  function getFrenchFieldLabel (fieldName) {
    const labels = {
      address: 'adresse',
      arrivalDate: 'date d arrivee au Maroc',
      birthDate: 'date de naissance',
      domicileAtMarrakech: 'domicile',
      email: 'adresse email',
      facebookName: 'profil Facebook',
      firstName: 'prenom',
      lastName: 'nom',
      matricule: 'matricule AMCI',
      passportNumber: 'numero de passeport',
      password: 'mot de passe',
      phone: 'numero de telephone',
      professionType: 'profession',
      residenceCardNumber: 'carte de sejour',
      school: 'universite ou structure',
      track: 'filiere ou domaine',
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
      return 'Certaines informations sont invalides ou incomplètes. Vérifiez les champs du formulaire puis recommencez.'
    }

    return `Informations invalides : ${messages.join(' ')}`
  }

  function getFrenchSignupMessage (error) {
    const sourceMessage = error?.message || appStore.error || ''

    if (!sourceMessage) {
      return 'L’inscription a échoué. Vérifiez les informations saisies puis recommencez.'
    }

    if (sourceMessage.includes('Email already in use')) {
      return 'Cette adresse email est déjà utilisée. Essayez avec une autre adresse ou connectez-vous.'
    }

    if (sourceMessage.includes('Request failed') || sourceMessage.includes('Failed to fetch')) {
      return 'Impossible de joindre le serveur pour le moment. Vérifiez que le backend est démarré.'
    }

    if (sourceMessage.includes('Validation failed') || sourceMessage.includes('Certaines informations sont invalides')) {
      return formatValidationErrors(error)
    }

    return sourceMessage
  }

  const champsAffiches = computed(() => {
    const startIndex = (currentPage.value - 1) * champsParPage
    const endIndex = startIndex + champsParPage

    return configurationChamps.slice(startIndex, endIndex)
  })

  function goToPage (page) {
    currentPage.value = page
  }

  function goToPreviousPage () {
    if (currentPage.value > 1) {
      currentPage.value -= 1
    }
  }

  function goToNextPage () {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1
    }
  }

  async function inscription_rout () {
    if (!formValues.value.nom.trim() || !formValues.value.prenom.trim() || !formValues.value.email.trim() || !formValues.value.mot_de_passe.trim()) {
      showFeedback('error', 'Veuillez remplir au minimum le nom, le prénom, l’email et le mot de passe pour créer votre compte.')
      return
    }

    if (formValues.value.mot_de_passe.trim().length < 6) {
      showFeedback('error', 'Le mot de passe doit contenir au moins 6 caractères.')
      return
    }

    try {
      const professionType = formValues.value.profession === 'Travailleur' ? 'WORKER' : 'STUDENT'
      const user = await appStore.register({
        address: formValues.value.domicile,
        arrivalDate: formValues.value.arrivee_maroc,
        birthDate: formValues.value.date_naissance,
        domicileAtMarrakech: formValues.value.domicile,
        email: formValues.value.email,
        facebookName: formValues.value.nom_facebook,
        firstName: formValues.value.prenom,
        lastName: formValues.value.nom,
        matricule: formValues.value.matricule,
        passportNumber: formValues.value.passeport,
        password: formValues.value.mot_de_passe,
        phone: formValues.value.contact,
        professionType,
        residenceCardNumber: formValues.value.carte_sejour,
        school: formValues.value.universite,
        track: formValues.value.filiere,
      })

      showFeedback('success', 'Inscription réussie. Votre compte a bien été créé, redirection en cours...')
      window.setTimeout(() => {
        router.push(user.role === 'BUREAU' || user.role === 'ADMIN' ? '/bureau/accueil' : '/users/membre')
      }, 1000)
    } catch (error) {
      showFeedback('error', getFrenchSignupMessage(error))
      return
    }
  }
</script>

<style scoped>
.signup-page {
  overflow: hidden;
}

.signup-hero {
  background:
    linear-gradient(135deg, rgba(7, 10, 8, 0.72), rgba(15, 23, 42, 0.68)),
    url('/img/img_group.jpeg') center / cover no-repeat;
}

.signup-hero__mesh {
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

.signup-hero__orb {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
}

.signup-hero__orb--left {
  top: 8%;
  left: -7rem;
  width: 21rem;
  height: 21rem;
  background: radial-gradient(circle, rgba(52, 211, 153, 0.24) 0%, rgba(52, 211, 153, 0) 72%);
}

.signup-hero__orb--right {
  right: -9rem;
  bottom: 12%;
  width: 25rem;
  height: 25rem;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.18) 0%, rgba(251, 191, 36, 0) 72%);
}

.signup-kicker,
.signup-shell,
.signup-button,
.signup-badge,
.signup-aside-panel {
  position: relative;
  z-index: 1;
}

.signup-shell {
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03));
}

.signup-form-panel {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 0;
  background: rgba(3, 7, 18, 0.74);
  padding: 1rem 0.9rem;
}

.signup-aside-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  background:
    radial-gradient(circle at top, rgba(52, 211, 153, 0.16), transparent 36%),
    rgba(10, 15, 22, 0.94);
  padding: 1rem 0.9rem;
}

.step-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.step-copy {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.step-badge {
  width: fit-content;
  padding: 0.45rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.step-description {
  display: none;
}

.step-dots {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-dot {
  width: 0.75rem;
  height: 0.75rem;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.step-dot-active {
  background: linear-gradient(135deg, #fde68a 0%, #34d399 100%);
  transform: scale(1.15);
}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem 0.9rem;
  align-content: start;
  min-width: 0;
}

.actions-row {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}

.action-btn {
  flex: 1 1 0;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;
}

.field-label {
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.signup-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0.72rem 1.05rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease, border-color 220ms ease;
}

.signup-button:hover {
  transform: translateY(-2px);
}

.signup-button:disabled {
  cursor: wait;
  opacity: 0.8;
  transform: none;
}

.signup-button--primary {
  background: linear-gradient(135deg, #ffffff 0%, #34d399 100%);
  box-shadow: 0 18px 40px rgba(52, 211, 153, 0.22);
  color: #052e2b;
}

.signup-button--secondary,
.signup-button--ghost {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.signup-badge-wrap {
  display: flex;
  justify-content: flex-start;
}

.signup-badge {
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

.signup-form-panel :deep(.custom-input),
.signup-form-panel :deep(.custom-select) {
  min-height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.signup-form-panel :deep(.custom-input::placeholder) {
  color: rgba(231, 229, 228, 0.68);
}

.signup-form-panel :deep(.custom-select) {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e7e5e4'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
}

.signup-form-panel :deep(.custom-select option) {
  background-color: #0f172a;
  color: white;
}

.signup-form-panel :deep(.custom-input:focus),
.signup-form-panel :deep(.custom-select:focus) {
  border-color: rgba(52, 211, 153, 0.9);
  box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.14);
  background: rgba(255, 255, 255, 0.12);
}

@media (min-width: 640px) {
  .signup-form-panel,
  .signup-aside-panel {
    padding: 1.1rem 1rem;
  }
}

@media (min-width: 768px) {
  .signup-form-panel,
  .signup-aside-panel {
    min-height: 100%;
  }
}

@media (min-width: 1024px) {
  .signup-form-panel,
  .signup-aside-panel {
    padding: 1.15rem 1rem;
  }
}

@media (max-width: 767px) {
  .step-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .fields-grid {
    grid-template-columns: 1fr;
  }

  .actions-row {
    flex-direction: column-reverse;
  }
}

@media (max-height: 820px) {
  .signup-form-panel,
  .signup-aside-panel {
    gap: 0.7rem;
    padding: 0.95rem 0.85rem;
  }

  .signup-badge {
    width: 4rem;
    height: 4rem;
  }
}

@media (max-height: 760px) and (min-width: 1024px) {
  .signup-hero {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .signup-form-panel,
  .signup-aside-panel {
    padding: 0.85rem 0.8rem;
  }

  .signup-form-panel :deep(.custom-input),
  .signup-form-panel :deep(.custom-select) {
    min-height: 40px;
  }
}
.signup-button--primary {
  background: linear-gradient(135deg, #ffffff 0%, #34d399 100%);
  box-shadow: 0 18px 40px rgba(52, 211, 153, 0.22);
  color: #052e2b;
}
</style>
