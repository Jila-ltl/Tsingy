<template>
  <div class="member-page h-[89.5vh] overflow-y-auto bg-white">
    <div class="member-page__backdrop" />

    <div class="relative z-10 grid h-[89.5vh] lg:grid-cols-[320px_1fr]">
      <aside class="member-scroll-area max-h-screen overflow-y-auto border-r border-green-100 bg-white/75 p-6 backdrop-blur-xl">
        <div class="rounded-[28px] border border-green-100 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
            Repertoire
          </p>
          <h1 class="mt-3 text-4xl font-black uppercase tracking-tight text-black">
            Liste membres
          </h1>
          <p class="mt-4 text-sm leading-6 text-gray-600">
            Filtrez rapidement les profils de la communaute selon l annee d arrivee, la profession et l etablissement, avec le meme theme visuel que la page evenement.
          </p>

          <div class="mt-8 space-y-5">
            <div>
              <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Annee d'arrivee
              </label>
              <Select_
                id="member-year"
                v-model="selectedYear"
                class="member-filter-input"
                :options="yearOptions"
                placeholder="Toutes les annees"
              />
            </div>

            <div>
              <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Profession
              </label>
              <Select_
                id="member-profession"
                v-model="selectedProfession"
                class="member-filter-input"
                :options="professionOptions"
                placeholder="Tous les profils"
              />
            </div>

            <div>
              <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Etablissement ou metier
              </label>
              <Input_
                id="member-establishment"
                v-model="etablissement"
                class="member-filter-input"
                placeholder="Universite, filiere ou metier"
                type="text"
              />
            </div>

            <div class="flex gap-3 pt-2">
              <button class="member-primary-button flex-1" @click="applyFilters">
                Appliquer
              </button>
              <button class="member-secondary-button" @click="resetFilters">
                Reset
              </button>
            </div>
          </div>

          <div class="mt-8 grid gap-4">
            <div class="rounded-2xl border border-green-100 bg-green-50 px-5 py-4">
              <p class="text-xs uppercase tracking-[0.25em] text-green-700">Membres visibles</p>
              <p class="mt-2 text-3xl font-black text-black">{{ filteredMembers.length }}</p>
            </div>
            <div class="rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
              <p class="text-xs uppercase tracking-[0.25em] text-red-600">Travailleurs</p>
              <p class="mt-2 text-3xl font-black text-black">{{ workerCount }}</p>
            </div>
            <div class="rounded-2xl border border-gray-200 bg-white px-5 py-4">
              <p class="text-xs uppercase tracking-[0.25em] text-gray-500">Etudiants</p>
              <p class="mt-2 text-3xl font-black text-black">{{ studentCount }}</p>
            </div>
          </div>
        </div>
      </aside>

      <section class="member-scroll-area max-h-screen overflow-y-auto p-4 md:p-8">
        <div class="space-y-8">
          <section class="overflow-hidden rounded-[32px] border border-green-100 bg-white/78 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div class="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
                  Annuaire SG
                </p>
                <h2 class="mt-4 text-4xl font-black text-black md:text-5xl">
                  Liste Membre Tsingy Marrakech
                </h2>
                <p class="mt-4 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
                  Parcourez les profils, retrouvez les informations essentielles et ouvrez chaque fiche pour consulter les details complets du membre selectionne.
                </p>

                <div class="mt-8 flex flex-wrap gap-4">
                  <div class="rounded-2xl border border-green-100 bg-green-50 px-5 py-4">
                    <p class="text-xs uppercase tracking-[0.25em] text-green-700">Recherche</p>
                    <p class="mt-2 text-lg font-bold text-black">{{ searchQuery || 'Aucun mot-cle' }}</p>
                  </div>
                  <div class="rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
                    <p class="text-xs uppercase tracking-[0.25em] text-red-600">Profession</p>
                    <p class="mt-2 text-lg font-bold text-black">{{ activeProfessionLabel }}</p>
                  </div>
                  <div class="rounded-2xl border border-gray-200 bg-white px-5 py-4">
                    <p class="text-xs uppercase tracking-[0.25em] text-gray-500">Annee</p>
                    <p class="mt-2 text-lg font-bold text-black">{{ activeYearLabel }}</p>
                  </div>
                </div>
              </div>

              <div class="relative overflow-hidden rounded-[28px] border border-green-100 bg-gradient-to-br from-white via-green-50 to-red-50 p-5">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(239,68,68,0.16),_transparent_40%)]" />
                <div class="relative flex h-full flex-col justify-between gap-6">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                      Acces rapide
                    </p>
                    <p class="mt-3 text-sm leading-7 text-gray-600">
                      Utilisez la recherche en direct puis ouvrez une fiche pour voir la photo, le contact, l adresse, le passeport et les informations d etudes ou de travail.
                    </p>
                  </div>

                  <div class="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                    <div class="flex items-center gap-3 rounded-full border border-green-100 bg-white px-4 py-3">
                      <span class="mdi mdi-magnify text-xl text-green-700" />
                      <Input_
                        id="member-search"
                        v-model="searchQuery"
                        class="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
                        placeholder="Rechercher par nom, prenom, universite ou metier"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="rounded-[32px] border border-green-100 bg-white/72 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8">
            <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
                  Membres filtres
                </p>
                <h3 class="mt-2 text-2xl font-black text-black md:text-3xl">
                  Profils disponibles
                </h3>
              </div>
              <p class="text-sm text-gray-500">
                Cliquez sur une carte pour afficher la fiche detaillee.
              </p>
            </div>

            <div v-if="filteredMembers.length > 0" class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              <button
                v-for="member in filteredMembers"
                :key="member.email"
                class="member-card group overflow-hidden rounded-[24px] border border-white bg-white/85 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(22,163,74,0.15)]"
                @click="openMember(member)"
              >
                <div class="relative overflow-hidden">
                  <img
                    :alt="`${member.prenom} ${member.nom}`"
                    class="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
                    :src="member.photo"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-85" />
                  <div class="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-green-700 backdrop-blur">
                    {{ member.profession }}
                  </div>
                </div>
                <div class="space-y-3 px-5 py-5">
                  <div>
                    <p class="text-lg font-black text-black">{{ member.prenom }} {{ member.nom }}</p>
                    <p class="mt-1 text-sm text-gray-500">{{ member.domicile_a_marrakech }}</p>
                  </div>
                  <div class="grid gap-2 text-sm">
                    <div class="flex items-center justify-between gap-3">
                      <span class="text-gray-500">Arrivee</span>
                      <span class="font-semibold text-black">{{ member.date_arrivee_maroc }}</span>
                    </div>
                    <div class="flex items-center justify-between gap-3">
                      <span class="text-gray-500">Structure</span>
                      <span class="font-semibold text-red-600 line-clamp-1">{{ member.univ || member.metier || 'Non renseigne' }}</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div v-else class="rounded-[28px] border border-dashed border-green-200 bg-white/80 p-12 text-center">
              <p class="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
                Aucun resultat
              </p>
              <p class="mt-4 text-base text-gray-600">
                Aucun membre ne correspond aux filtres actuels. Essayez de reinitialiser la recherche ou les filtres.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>

    <div v-if="selectedMember" class="member-lightbox">
      <div class="absolute inset-0 cursor-pointer" @click="closeMember" />

      <div class="member-lightbox__panel">
        <div class="member-detail-card">
          <button class="member-lightbox__close" @click="closeMember">
            ✕
          </button>

          <div class="grid gap-8 lg:grid-cols-[300px_1fr]">
            <div class="space-y-4">
              <div class="overflow-hidden rounded-[28px] border border-white bg-white shadow-sm">
                <img
                  :alt="`${selectedMember.prenom} ${selectedMember.nom}`"
                  class="h-[360px] w-full object-cover"
                  :src="selectedMember.photo"
                >
              </div>
              <div class="rounded-2xl border border-red-100 bg-red-50 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.25em] text-red-600">Profession</p>
                <p class="mt-2 text-lg font-bold text-black">{{ selectedMember.profession }}</p>
              </div>
            </div>

            <div class="space-y-6">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
                  Fiche membre
                </p>
                <h3 class="mt-3 text-4xl font-black text-black">
                  {{ selectedMember.prenom }} {{ selectedMember.nom }}
                </h3>
                <p class="mt-3 text-base leading-7 text-gray-600">
                  Profil detaille du membre avec les informations academiques, professionnelles et de contact.
                </p>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="member-detail-box">
                  <p class="member-detail-label">Date de naissance</p>
                  <p class="member-detail-value">{{ selectedMember.date_de_naissance }}</p>
                </div>
                <div class="member-detail-box">
                  <p class="member-detail-label">Arrivee au Maroc</p>
                  <p class="member-detail-value">{{ selectedMember.date_arrivee_maroc }}</p>
                </div>
                <div class="member-detail-box">
                  <p class="member-detail-label">Universite / Etablissement</p>
                  <p class="member-detail-value">{{ selectedMember.univ || 'Non renseigne' }}</p>
                </div>
                <div class="member-detail-box">
                  <p class="member-detail-label">Filiere / Metier</p>
                  <p class="member-detail-value">{{ selectedMember.filiere || selectedMember.metier || 'Non renseigne' }}</p>
                </div>
                <div class="member-detail-box">
                  <p class="member-detail-label">Code AMCI</p>
                  <p class="member-detail-value">{{ selectedMember.code_amci || 'Non renseigne' }}</p>
                </div>
                <div class="member-detail-box">
                  <p class="member-detail-label">Passeport</p>
                  <p class="member-detail-value">{{ selectedMember.numero_passeport_malgache }}</p>
                </div>
                <div class="member-detail-box">
                  <p class="member-detail-label">Domicile a Marrakech</p>
                  <p class="member-detail-value">{{ selectedMember.domicile_a_marrakech }}</p>
                </div>
                <div class="member-detail-box">
                  <p class="member-detail-label">Contact</p>
                  <p class="member-detail-value">{{ selectedMember.contact }}</p>
                </div>
                <div class="member-detail-box sm:col-span-2">
                  <p class="member-detail-label">Email</p>
                  <p class="member-detail-value">{{ selectedMember.email }}</p>
                </div>
                <div class="member-detail-box sm:col-span-2">
                  <p class="member-detail-label">Facebook</p>
                  <p class="member-detail-value">{{ selectedMember.nom_facebook }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()

  function mapMember (member) {
    const profile = member.profile || {}

    return {
      code_amci: profile.matricule || '',
      contact: profile.phone || '',
      date_arrivee_maroc: profile.arrivalDate ? new Date(profile.arrivalDate).getFullYear() : '',
      date_de_naissance: profile.birthDate ? String(profile.birthDate).slice(0, 10) : '',
      domicile_a_marrakech: profile.domicileAtMarrakech || profile.address || '',
      email: member.email,
      filiere: profile.track || '',
      metier: profile.jobTitle || '',
      nom: profile.lastName || '',
      nom_facebook: profile.facebookName || '',
      numero_passeport_malgache: profile.passportNumber || '',
      photo: profile.imageUrl || '/img/member.png',
      prenom: profile.firstName || '',
      profession: profile.professionType === 'WORKER' ? 'travailleur' : 'etudiant',
      univ: profile.school || '',
    }
  }

  const usersList = computed(() => appStore.directory.map(member => mapMember(member)))

  const years = Array.from({ length: new Date().getFullYear() - 2007 + 1 }, (_, index) => String(2007 + index))
  const yearOptions = years.map(year => ({
    label: year,
    value: year,
  }))
  const professionOptions = [
    { label: 'Etudiant(e)', value: 'etudiant' },
    { label: 'Travailleur(euse)', value: 'travailleur' },
  ]

  const searchQuery = ref('')
  const selectedYear = ref('')
  const selectedProfession = ref('')
  const etablissement = ref('')
  const appliedFilters = ref({
    year: '',
    profession: '',
    text: '',
  })
  const selectedMember = ref(null)

  onMounted(() => {
    appStore.fetchDirectory().catch(error => {
      window.alert(error.message || 'Impossible de charger l annuaire.')
    })
  })

  const filteredMembers = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    const filters = appliedFilters.value

    return usersList.value.filter(member => {
      const matchesSearch = !query || [
        member.nom,
        member.prenom,
        member.univ,
        member.metier,
        member.filiere,
        member.email,
      ].some(value => (value || '').toLowerCase().includes(query))

      const matchesYear = !filters.year || String(member.date_arrivee_maroc) === filters.year
      const matchesProfession = !filters.profession || member.profession === filters.profession
      const filterText = filters.text.trim().toLowerCase()
      const matchesText = !filterText || [
        member.univ,
        member.metier,
        member.filiere,
        member.domicile_a_marrakech,
      ].some(value => (value || '').toLowerCase().includes(filterText))

      return matchesSearch && matchesYear && matchesProfession && matchesText
    })
  })

  const workerCount = computed(() => filteredMembers.value.filter(member => member.profession === 'travailleur').length)
  const studentCount = computed(() => filteredMembers.value.filter(member => member.profession === 'etudiant').length)
  const activeProfessionLabel = computed(() => {
    if (!appliedFilters.value.profession) {
      return 'Tous les profils'
    }

    return appliedFilters.value.profession === 'etudiant' ? 'Etudiant(e)' : 'Travailleur(euse)'
  })
  const activeYearLabel = computed(() => appliedFilters.value.year || 'Toutes les annees')

  function applyFilters () {
    appliedFilters.value = {
      year: selectedYear.value,
      profession: selectedProfession.value,
      text: etablissement.value,
    }
  }

  function resetFilters () {
    selectedYear.value = ''
    selectedProfession.value = ''
    etablissement.value = ''
    appliedFilters.value = {
      year: '',
      profession: '',
      text: '',
    }
    searchQuery.value = ''
  }

  function openMember (member) {
    selectedMember.value = member
  }

  function closeMember () {
    selectedMember.value = null
  }
</script>

<style scoped>
.member-page {
  position: relative;
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.18), transparent 28%),
    radial-gradient(circle at bottom right, rgba(239, 68, 68, 0.14), transparent 22%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.97), rgba(240, 253, 244, 0.92));
}

.member-page__backdrop {
  position: absolute;
  inset: 0;
  background-image: url('/img/tsingy.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.08;
  mix-blend-mode: multiply;
}

.member-scroll-area {
  scrollbar-gutter: stable;
}

.member-filter-input {
  width: 100%;
  border: 1px solid #d1fae5;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  color: #111827;
  padding: 0.9rem 1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.member-filter-input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
}

.member-primary-button,
.member-secondary-button {
  border-radius: 16px;
  font-weight: 700;
  padding: 0.9rem 1.1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.member-primary-button {
  background: linear-gradient(135deg, #22c55e, #166534);
  color: white;
  box-shadow: 0 12px 28px rgba(22, 163, 74, 0.22);
}

.member-primary-button:hover {
  transform: translateY(-1px);
}

.member-secondary-button {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e5e7eb;
  color: #111827;
}

.member-card {
  backdrop-filter: blur(12px);
}

.member-lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.member-lightbox__panel {
  position: relative;
  width: min(1100px, calc(100vw - 2rem));
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}

.member-detail-card {
  position: relative;
  border: 1px solid rgba(220, 252, 231, 0.85);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.96);
  padding: 2rem;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.22);
}

.member-lightbox__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.92);
  color: #111827;
  font-size: 1.25rem;
  font-weight: 700;
}

.member-detail-box {
  border: 1px solid #dcfce7;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(240, 253, 244, 0.75));
  padding: 1rem 1.1rem;
}

.member-detail-label {
  color: #15803d;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.member-detail-value {
  margin-top: 0.6rem;
  color: #111827;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .member-lightbox__panel {
    width: calc(100vw - 1rem);
    max-height: calc(100vh - 1rem);
  }

  .member-detail-card {
    padding: 1.25rem;
  }
}
</style>
