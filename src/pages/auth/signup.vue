<template>
  <div id="bg_img" class="flex h-[100vh] w-full items-center justify-center">
    <div class="signup-shell sm:w-[80vw]">
      <div class="form-container">
        <div class="mb-8 text-center sm:text-left">
          <span class="title-text">Inscription</span>
        </div>

        <div class="step-header">
          <div class="step-copy ">
            <span class="step-badge bg-red-500">Etape {{ currentPage }} / {{ totalPages }}</span>
            <p class="step-description">
              Remplissez les informations demandees, page par page.
            </p>
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

        <div class="fields-grid">
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

        <div class="actions-row">
          <v-btn
            class="action-btn"
            :disabled="currentPage === 1"
            height="48"
            variant="outlined"
            @click="goToPreviousPage"
          >
            Precedent
          </v-btn>

          <v-btn
            v-if="currentPage < totalPages"
            class="action-btn next-btn"
            height="48"
            variant="tonal"
            @click="goToNextPage"
          >
            Suivant
          </v-btn>

          <v-btn
            v-else
            class="action-btn submit-btn"
            height="48"
            :loading="appStore.loading"
            variant="tonal"
            @click="inscription_rout"
          >
            S'inscrire
          </v-btn>
        </div>

        <p v-if="appStore.error" class="signup-error">
          {{ appStore.error }}
        </p>
      </div>

      <div class="aside-panel">
        <v-icon class="mb-6" size="100">
          mdi-account-circle
        </v-icon>
        <p class="welcome-text">
          Nous sommes ravis de vous accueillir
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    computed,
    ref,
  } from 'vue'
  import {
    useRouter,
  } from 'vue-router'
  import { useAppStore } from '@/stores/app'

  const router = useRouter()
  const appStore = useAppStore()
  const currentPage = ref(1)
  const champsParPage = 6

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

      await router.push(user.role === 'BUREAU' || user.role === 'ADMIN' ? '/bureau/accueil' : '/users/membre')
    } catch {
      return
    }
  }
</script>

<style scoped>
#bg_img {
  background-image: url('/img/img1.png');
    background-size: cover;
    background-position: center;
}

.signup-shell {
    width: min(1100px, 92vw);
  height: min(720px, 82vh);
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    padding: 2.5rem;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    background-image: linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  overflow: hidden;
}

.form-container {
    flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.title-text {
    color: white;
    font-size: 1.9rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.step-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.signup-error {
  margin-top: 1rem;
  border: 1px solid rgba(248, 113, 113, 0.35);
  border-radius: 14px;
  background: rgba(127, 29, 29, 0.45);
  color: white;
  padding: 0.85rem 1rem;
}

.step-copy {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.step-badge {
    width: fit-content;
    padding: 0.35rem 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 999px;
    background: rgba(242, 32, 32, 0.526);
    color: white;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.step-description {
    margin: 0;
    color: rgba(255, 255, 255, 0.75);
}

.step-dots {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.step-dot {
    width: 0.85rem;
    height: 0.85rem;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.28);
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease;
}

.step-dot-active {
    background: #c5a059;
    transform: scale(1.15);
}

.fields-grid {
  flex: 1 1 auto;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 1.25rem;
  align-content: start;
  overflow-y: auto;
  padding-right: 0.4rem;
}

.actions-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1.75rem;
}

.action-btn {
    flex: 1 1 0;
}

.next-btn {
  background: white;
  color: black;
}

.submit-btn {
  background: #22c55e;
  color: white;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
}

.field-label {
    color: white;
    font-weight: 600;
}

.aside-panel {
    flex: 1 1 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
  min-height: 0;
}

.welcome-text {
    max-width: 18rem;
    font-size: 1.8rem;
    line-height: 1.3;
}

@media (max-width: 960px) {
    .signup-shell {
        flex-direction: column-reverse;
        padding: 1.5rem;
    height: min(780px, 88vh);
    overflow-y: auto;
    }

    .step-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .fields-grid {
      flex: initial;
        grid-template-columns: 1fr;
      overflow: visible;
      padding-right: 0;
    }

    .actions-row {
        flex-direction: column-reverse;
    }

    .welcome-text {
        max-width: none;
        font-size: 1.35rem;
    }
}
</style>
