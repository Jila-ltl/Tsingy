<template>
  <div
    id="bureau-page"
    ref="pageRef"
    class="max-h-[89vh] overflow-y-auto bg-[#06110d] text-white"
  >
    <section
      ref="heroRef"
      class="bureau-hero relative isolate overflow-hidden px-4 py-10 sm:px-6 md:px-10 lg:px-16"
    >
      <div class="bureau-hero__mesh" />
      <div class="bureau-hero__orb bureau-hero__orb--emerald" />
      <div class="bureau-hero__orb bureau-hero__orb--amber" />

      <div class="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 sm:min-h-[82vh] lg:min-h-[88vh] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div class="relative z-10 max-w-3xl">
          <p
            ref="heroKickerRef"
            class="bureau-kicker inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-emerald-100 backdrop-blur-sm"
          >
            Tableau de bord bureau
          </p>

          <h1
            ref="heroTitleRef"
            class="mt-6 max-w-4xl font-serif text-3xl font-semibold leading-[0.98] text-white min-[420px]:text-4xl sm:text-5xl md:text-7xl"
          >
            Mot de la présidence : restons unis, engagés et tournés vers l’avenir pour faire grandir notre association.
          </h1>

          <p
            ref="heroTextRef"
            class="mt-6 max-w-2xl text-sm leading-7 text-emerald-50/80 sm:text-base sm:leading-8 md:text-lg"
          >
            Gérez les annonces, validez les nouveaux profils, suivez les membres du bureau et parcourez les listes depuis un espace central pensé pour la coordination.
          </p>

          <div
            ref="heroActionsRef"
            class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <button
              class="bureau-button bureau-button--primary"
              type="button"
              @click="diriger('modifier')"
            >
              Modifier l’espace
            </button>
            <button
              class="bureau-button bureau-button--secondary"
              type="button"
              @click="diriger('liste')"
            >
              Parcourir les membres
            </button>
          </div>

          <div ref="heroStatsRef" class="mt-10 grid gap-4 min-[520px]:grid-cols-3">
            <article class="bureau-stat-card rounded-[1.4rem] p-5">
              <p class="bureau-stat-card__label">Annonces</p>
              <p class="mt-3 text-3xl font-semibold text-white">03</p>
              <p class="mt-2 text-sm text-emerald-50/70">En cours de diffusion</p>
            </article>
            <article class="bureau-stat-card rounded-[1.4rem] p-5">
              <p class="bureau-stat-card__label">Validations</p>
              <p class="mt-3 text-3xl font-semibold text-white">10</p>
              <p class="mt-2 text-sm text-emerald-50/70">Profils à examiner</p>
            </article>
            <article class="bureau-stat-card rounded-[1.4rem] p-5">
              <p class="bureau-stat-card__label">Coordination</p>
              <p class="mt-3 text-3xl font-semibold text-white">24/7</p>
              <p class="mt-2 text-sm text-emerald-50/70">Suivi de la communauté</p>
            </article>
          </div>
        </div>

        <div ref="heroVisualRef" class="relative z-10">
          <div class="bureau-portrait-shell rounded-[1.5rem] border border-white/12 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.35)] sm:rounded-[2rem] sm:p-4">
            <div class="bureau-portrait-frame relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.6rem]">
              <img
                alt="Portrait de l'administration du bureau"
                class="bureau-portrait h-[340px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                src="/img/photo.jpeg"
              >
              <div class="bureau-portrait__overlay" />

              <div class="bureau-floating-note bureau-floating-note--top rounded-2xl p-4">
                <p class="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-emerald-200">
                  Bureau actif
                </p>
                <p class="mt-2 text-lg font-semibold text-white">
                  Coordination, annonces et validation des membres.
                </p>
              </div>

              <div class="bureau-floating-note bureau-floating-note--bottom rounded-2xl p-4">
                <p class="text-sm text-white/80">
                  Un espace plus clair pour piloter les actions prioritaires du bureau.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      ref="actionsRef"
      class="bureau-section bureau-section--actions px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-16"
    >
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="bureau-section__eyebrow">Actions rapides</p>
            <h2 class="bureau-section__title max-w-3xl">
              Trois portes d’entrée pour gérer l’essentiel.
            </h2>
          </div>
          <p class="max-w-xl text-base leading-8 text-white/70">
            Ouvrez rapidement les modules du bureau et gardez une vue claire sur les tâches qui demandent une décision immédiate.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <button
            v-for="(item, index) in actionCards"
            :key="item.name"
            class="action-card text-left"
            type="button"
            @click="openPopup(item.name.toLowerCase())"
          >
            <div class="action-card__glow" :class="`action-card__glow--${index + 1}`" />
            <span class="action-card__icon" :class="item.image" />
            <p class="action-card__label">{{ item.tag }}</p>
            <h3 class="mt-4 text-2xl font-semibold text-white">
              {{ item.name }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-white/72 sm:text-base">
              {{ item.description }}
            </p>
            <span class="action-card__link mt-6 inline-flex items-center gap-2">
              Ouvrir
              <span class="mdi mdi-arrow-right" />
            </span>
          </button>
        </div>
      </div>
    </section>

    <div v-if="isOpen === 'annonce'" class="overlay bureau-overlay" @click.self="closePopup">
      <div class="bureau-modal bureau-modal--dark">
        <div class="bureau-modal__header">
          <div>
            <p class="bureau-modal__eyebrow">Annonce</p>
            <h2 class="bureau-modal__title">Publier une communication</h2>
          </div>
          <button class="bureau-modal__close" type="button" @click="closePopup">
            <span class="mdi mdi-window-close" />
          </button>
        </div>

        <div class="grid gap-5">
          <label class="bureau-field">
            <span class="bureau-field__label">Titre</span>
            <input
              v-model="announcementForm.title"
              class="bureau-field__input"
              placeholder="Titre de l'annonce"
              type="text"
            >
          </label>

          <label class="bureau-field">
            <span class="bureau-field__label">Message</span>
            <textarea
              v-model="announcementForm.message"
              class="bureau-field__textarea"
              placeholder="Rédigez votre message"
              rows="5"
            />
          </label>

          <label class="bureau-field">
            <span class="bureau-field__label">Expiration</span>
            <input
              v-model="announcementForm.expiration"
              class="bureau-field__input"
              type="date"
            >
          </label>
        </div>

        <div class="bureau-modal__actions">
          <button class="bureau-button bureau-button--secondary" type="button" @click="closePopup">
            Annuler
          </button>
          <button class="bureau-button bureau-button--primary" type="button" @click="closePopup">
            Envoyer
          </button>
        </div>
      </div>
    </div>

    <div v-if="isOpen === 'approbation'" class="overlay approbation-overlay" @click.self="closePopup">
      <div class="approbation-modal z-[100]">
        <div class="flex items-start justify-between gap-4 border-b border-green-100 px-6 py-5">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-green-700">
              Validation
            </p>
            <h2 class="mt-2 text-3xl font-bold text-black">
              Nouveaux membres
            </h2>
            <p class="mt-2 text-sm text-gray-500">
              Verifiez les informations de chaque profil avant approbation.
            </p>
          </div>

          <button class="approbation-close" type="button" @click="closePopup">
            <span class="mdi mdi-window-close" />
          </button>
        </div>

        <div class="approbation-scroll px-4 py-4 sm:px-6 sm:py-5">
          <div
            v-for="(item, index) in newMembers"
            :key="`${item.nom}-${index}`"
            class="approbation-item"
          >
            <div class="flex items-center gap-4">
              <img alt="Avatar" class="approbation-avatar" :src="item.photo">

              <div class="grid gap-2">
                <p class="text-lg font-bold text-black">
                  {{ item.prenom }} {{ item.nom }}
                </p>
                <p class="text-sm uppercase tracking-[0.25em] text-green-700">
                  {{ item.ecole }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ item.domicile }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button class="approbation-action approbation-action--approve" type="button">
                <span class="mdi mdi-checkbox-marked text-2xl" />
              </button>
              <button class="approbation-action approbation-action--reject" type="button">
                <span class="mdi mdi-close-box text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isOpen === 'gestion'" class="overlay bureau-overlay" @click.self="closePopup">
      <div class="bureau-modal bureau-modal--dark">
        <div class="bureau-modal__header">
          <div>
            <p class="bureau-modal__eyebrow">Gestion</p>
            <h2 class="bureau-modal__title">Planifier un événement</h2>
          </div>
          <button class="bureau-modal__close" type="button" @click="closePopup">
            <span class="mdi mdi-window-close" />
          </button>
        </div>

        <div class="grid gap-5">
          <label class="bureau-field">
            <span class="bureau-field__label">Titre</span>
            <input
              v-model="eventForm.title"
              class="bureau-field__input"
              placeholder="Titre de l'événement"
              type="text"
            >
          </label>

          <label class="bureau-field">
            <span class="bureau-field__label">Description</span>
            <textarea
              v-model="eventForm.description"
              class="bureau-field__textarea"
              placeholder="Décrivez l'événement"
              rows="5"
            />
          </label>
        </div>

        <div class="bureau-modal__actions">
          <button class="bureau-button bureau-button--secondary" type="button" @click="closePopup">
            Fermer
          </button>
          <button class="bureau-button bureau-button--primary" type="button" @click="closePopup">
            Enregistrer
          </button>
        </div>
      </div>
    </div>

    <section
      id="pres_bureau"
      ref="bureauMembersRef"
      class="bureau-section bg-stone-100 px-4 py-16 text-stone-900 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16"
    >
      <div class="mx-auto max-w-7xl">
        <div class="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="bureau-section__eyebrow bureau-section__eyebrow--light">Bureau</p>
            <h2 class="bureau-section__title bureau-section__title--dark">
              Les membres du bureau
            </h2>
          </div>
          <p class="max-w-xl text-base leading-8 text-stone-600">
            Une équipe engagée pour faire avancer l’association, coordonner les actions et maintenir un lien durable entre les membres.
          </p>
        </div>

        <div class="interactive-card overflow-hidden rounded-[1.5rem] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:rounded-[2rem] sm:p-6 md:p-8">
          <MyCarousel />
        </div>
      </div>
    </section>

    <section
      ref="membersTableRef"
      class="bureau-section px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-16"
    >
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="bureau-section__eyebrow">Annuaire membres</p>
            <h2 class="bureau-section__title">
              Parcourir et consulter les profils en un clic.
            </h2>
          </div>
          <p class="max-w-xl text-base leading-8 text-white/70">
            Le tableau ci-dessous permet une recherche rapide et un accès direct aux fiches membres via la modale de détail.
          </p>
        </div>

        <v-card class="member-table-card overflow-hidden" flat title=" ">
          <template #text>
            <v-text-field
              v-model="search"
              base-color="green"
              class="member-search-field"
              color="green"
              hide-details
              label="Search"
              prepend-inner-icon="mdi-magnify"
              single-line
              variant="outlined"
            />
          </template>

          <v-data-table
            class="member-data-table"
            :headers="headers"
            :items="newMembers"
            :row-props="getMemberRowProps"
            :search="search"
            @click:row="openMemberModal"
          />
        </v-card>
      </div>
    </section>

    <MyModal
      v-model="isMemberModalOpen"
      :member="selectedMember"
    />

    <foot />
  </div>
</template>

<script setup>
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import {
    onMounted,
    onUnmounted,
    ref,
  } from 'vue'
  import {
    useRouter,
  } from 'vue-router'
  import MyCarousel from '../../components/Carousel.vue'

  gsap.registerPlugin(ScrollTrigger)

  const router = useRouter()

  const pageRef = ref(null)
  const heroRef = ref(null)
  const heroKickerRef = ref(null)
  const heroTitleRef = ref(null)
  const heroTextRef = ref(null)
  const heroActionsRef = ref(null)
  const heroStatsRef = ref(null)
  const heroVisualRef = ref(null)
  const actionsRef = ref(null)
  const bureauMembersRef = ref(null)
  const membersTableRef = ref(null)

  const search = ref('')
  const isMemberModalOpen = ref(false)
  const selectedMember = ref(null)
  const isOpen = ref(null)

  const announcementForm = ref({
    expiration: '',
    message: '',
    title: '',
  })

  const eventForm = ref({
    description: '',
    title: '',
  })

  const headers = [{
                     align: 'start',
                     key: 'name',
                     sortable: false,
                   },
                   {
                     key: 'nom',
                     title: 'Nom',
                   },
                   {
                     key: 'prenom',
                     title: 'Prenom',
                   },
                   {
                     key: 'domicile',
                     title: 'Domicile',
                   },
                   {
                     key: 'ecole',
                     title: 'Ecole',
                   }]

  const actionCards = [{
                         description: 'Créer une annonce, fixer une date d’expiration et diffuser rapidement une information importante à la communauté.',
                         image: 'mdi mdi-bullhorn',
                         name: 'Annonce',
                         tag: 'Communication',
                       },
                       {
                         description: 'Vérifier les profils, contrôler les informations et approuver les nouvelles inscriptions en quelques gestes.',
                         image: 'mdi mdi-check-decagram',
                         name: 'Approbation',
                         tag: 'Validation',
                       },
                       {
                         description: 'Préparer un événement, organiser son contenu et garder un espace plus clair pour la coordination interne.',
                         image: 'mdi mdi-calendar-month',
                         name: 'Gestion',
                         tag: 'Organisation',
                       }]

  const newMembers = ref([{
                            domicile: 'Paris',
                            ecole: 'Lycée Henri IV',
                            nom: 'Dupont',
                            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
                            prenom: 'Jean',
                          },
                          {
                            domicile: 'Lyon',
                            ecole: 'INSA Lyon',
                            nom: 'Martin',
                            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
                            prenom: 'Alice',
                          },
                          {
                            domicile: 'Lille',
                            ecole: 'EDHEC Business School',
                            nom: 'Lefebvre',
                            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
                            prenom: 'Thomas',
                          },
                          {
                            domicile: 'Bordeaux',
                            ecole: 'Sciences Po',
                            nom: 'Dubois',
                            photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
                            prenom: 'Sophie',
                          },
                          {
                            domicile: 'Nantes',
                            ecole: 'Centrale Nantes',
                            nom: 'Moreau',
                            photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop',
                            prenom: 'Lucas',
                          },
                          {
                            domicile: 'Marseille',
                            ecole: 'Kedge Business School',
                            nom: 'Lambert',
                            photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop',
                            prenom: 'Emma',
                          },
                          {
                            domicile: 'Toulouse',
                            ecole: 'ENAC',
                            nom: 'Rousseau',
                            photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
                            prenom: 'Hugo',
                          },
                          {
                            domicile: 'Strasbourg',
                            ecole: 'Université de Strasbourg',
                            nom: 'Girard',
                            photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
                            prenom: 'Chloé',
                          },
                          {
                            domicile: 'Rennes',
                            ecole: 'Rennes School of Business',
                            nom: 'Mercier',
                            photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop',
                            prenom: 'Antoine',
                          },
                          {
                            domicile: 'Montpellier',
                            ecole: 'Montpellier Business School',
                            nom: 'Petit',
                            photo: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=150&h=150&fit=crop',
                            prenom: 'Léa',
                          }])

  let animationContext

  function closePopup () {
    isOpen.value = null
  }

  function diriger (message) {
    if (message === 'liste') {
      router.push('liste_membre')
      return
    }

    router.push('../users/evenement')
  }

  function getMemberRowProps () {
    return {
      class: 'cursor-pointer',
    }
  }

  function openMemberModal (_, context) {
    selectedMember.value = context?.item?.raw ?? context?.item ?? null
    isMemberModalOpen.value = !!selectedMember.value
  }

  function openPopup (message) {
    isOpen.value = message
  }

  onMounted(() => {
    animationContext = gsap.context(() => {
      const scroller = pageRef.value
      const revealSections = gsap.utils.toArray('.bureau-section')
      const actionCardsElements = gsap.utils.toArray('.action-card')
      const statCards = gsap.utils.toArray('.bureau-stat-card')

      gsap.set(
        [
          heroKickerRef.value,
          heroTitleRef.value,
          heroTextRef.value,
          heroActionsRef.value,
          heroStatsRef.value,
          heroVisualRef.value,
        ],
        { autoAlpha: 0 },
      )

      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      heroTimeline
        .fromTo(heroKickerRef.value, { y: 24 }, { autoAlpha: 1, duration: 0.55, y: 0 })
        .fromTo(heroTitleRef.value, { y: 44 }, { autoAlpha: 1, duration: 0.9, y: 0 }, '-=0.15')
        .fromTo(heroTextRef.value, { y: 28 }, { autoAlpha: 1, duration: 0.75, y: 0 }, '-=0.45')
        .fromTo(heroActionsRef.value, { y: 22 }, { autoAlpha: 1, duration: 0.65, y: 0 }, '-=0.4')
        .fromTo(heroStatsRef.value, { y: 26 }, { autoAlpha: 1, duration: 0.7, y: 0 }, '-=0.35')
        .fromTo(
          heroVisualRef.value,
          { autoAlpha: 0, rotate: -3, scale: 0.95, y: 30 },
          { autoAlpha: 1, duration: 1.05, rotate: 0, scale: 1, y: 0 },
          '-=0.9',
        )

      gsap.fromTo(
        actionCardsElements,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          y: 0,
          scrollTrigger: {
            scroller,
            start: 'top 76%',
            trigger: actionsRef.value,
          },
        },
      )

      gsap.fromTo(
        statCards,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.1,
          y: 0,
        },
      )

      for (const section of revealSections) {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 70, scale: 0.98 },
          {
            autoAlpha: 1,
            duration: 0.95,
            ease: 'power3.out',
            scale: 1,
            scrollTrigger: {
              scroller,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
              trigger: section,
            },
            y: 0,
          },
        )
      }

      gsap.to('.bureau-hero__orb--emerald', {
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        x: 24,
        y: -18,
        yoyo: true,
      })

      gsap.to('.bureau-hero__orb--amber', {
        duration: 8.5,
        ease: 'sine.inOut',
        repeat: -1,
        x: -28,
        y: 22,
        yoyo: true,
      })

      gsap.to('.bureau-floating-note--top', {
        duration: 4.8,
        ease: 'sine.inOut',
        repeat: -1,
        y: -10,
        yoyo: true,
      })

      gsap.to('.bureau-floating-note--bottom', {
        duration: 5.6,
        ease: 'sine.inOut',
        repeat: -1,
        y: 8,
        yoyo: true,
      })

      gsap.to('.bureau-portrait', {
        ease: 'none',
        scrollTrigger: {
          end: 'bottom top',
          scroller,
          scrub: true,
          start: 'top top',
          trigger: heroRef.value,
        },
        scale: 1.08,
        y: 18,
      })
    }, pageRef.value)
  })

  onUnmounted(() => {
    animationContext?.revert()
  })
</script>

<style scoped>
  .bureau-page {
    min-width: 0;
    scroll-behavior: smooth;
  }

  .bureau-hero {
    background:
      linear-gradient(135deg, rgba(3, 10, 8, 0.8), rgba(15, 23, 42, 0.7)),
      url('/img/maki.jpg') center / cover no-repeat;
  }

  .bureau-hero__mesh {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
    background-size: 38px 38px;
    mask-image: radial-gradient(circle at center, black 42%, transparent 84%);
    opacity: 0.45;
    pointer-events: none;
  }

  .bureau-hero__orb {
    position: absolute;
    border-radius: 9999px;
    pointer-events: none;
  }

  .bureau-hero__orb--emerald {
    top: 8%;
    left: -7rem;
    width: 20rem;
    height: 20rem;
    background: radial-gradient(circle, rgba(52, 211, 153, 0.28) 0%, rgba(52, 211, 153, 0) 72%);
  }

  .bureau-hero__orb--amber {
    right: -8rem;
    bottom: 10%;
    width: 24rem;
    height: 24rem;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, rgba(251, 191, 36, 0) 72%);
  }

  .bureau-kicker,
  .bureau-stat-card,
  .bureau-floating-note,
  .bureau-button,
  .action-card,
  .bureau-modal,
  .member-table-card {
    position: relative;
    z-index: 1;
  }

  .bureau-button {
    width: 100%;
    border-radius: 9999px;
    padding: 0.95rem 1.45rem;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
  }

  .bureau-button:hover {
    transform: translateY(-2px);
  }

  .bureau-button--primary {
    background: linear-gradient(135deg, #fde68a 0%, #34d399 100%);
    box-shadow: 0 18px 40px rgba(52, 211, 153, 0.22);
    color: #052e2b;
  }

  .bureau-button--secondary {
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.06);
    color: white;
  }

  .bureau-stat-card {
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
    backdrop-filter: blur(16px);
  }

  .bureau-stat-card__label {
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .bureau-portrait-shell {
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03));
    backdrop-filter: blur(20px);
  }

  .bureau-portrait__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(4, 12, 10, 0.02), rgba(4, 12, 10, 0.58));
  }

  .bureau-floating-note {
    position: absolute;
    max-width: 18rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(5, 12, 18, 0.58);
    backdrop-filter: blur(14px);
    box-shadow: 0 22px 40px rgba(0, 0, 0, 0.18);
  }

  .bureau-floating-note--top {
    top: 1rem;
    left: 1rem;
  }

  .bureau-floating-note--bottom {
    right: 1rem;
    bottom: 1rem;
  }

  .bureau-section {
    position: relative;
  }

  .bureau-section--actions {
    background:
      radial-gradient(circle at top left, rgba(52, 211, 153, 0.08), transparent 26%),
      radial-gradient(circle at bottom right, rgba(251, 191, 36, 0.08), transparent 24%),
      linear-gradient(180deg, #071612 0%, #081712 100%);
  }

  .bureau-section__eyebrow {
    color: #86efac;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
  }

  .bureau-section__eyebrow--light {
    color: #047857;
  }

  .bureau-section__title {
    margin-top: 1rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 3vw, 3.4rem);
    font-weight: 600;
    line-height: 1.05;
    color: white;
  }

  .bureau-section__title--dark {
    color: #111827;
  }

  .action-card {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.75rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
    padding: 1.75rem;
    backdrop-filter: blur(14px);
    transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
  }

  .action-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 50px rgba(0, 0, 0, 0.18);
    border-color: rgba(255, 255, 255, 0.16);
  }

  .action-card__glow {
    position: absolute;
    right: -3rem;
    top: -3rem;
    width: 12rem;
    height: 12rem;
    border-radius: 9999px;
    pointer-events: none;
  }

  .action-card__glow--1 {
    background: radial-gradient(circle, rgba(52, 211, 153, 0.24) 0%, rgba(52, 211, 153, 0) 72%);
  }

  .action-card__glow--2 {
    background: radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0) 72%);
  }

  .action-card__glow--3 {
    background: radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, rgba(251, 191, 36, 0) 72%);
  }

  .action-card__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: 1.25rem;
    background: rgba(255, 255, 255, 0.08);
    color: white;
    font-size: 2rem;
  }

  .action-card__label {
    margin-top: 1.25rem;
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .action-card__link {
    color: #d1fae5;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .bureau-overlay {
    background: rgba(1, 8, 7, 0.74);
    backdrop-filter: blur(10px);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .bureau-modal {
    width: min(720px, calc(100vw - 2rem));
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 2rem;
    padding: 1.5rem;
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.32);
  }

  .bureau-modal--dark {
    background: linear-gradient(180deg, rgba(9, 16, 27, 0.96), rgba(5, 12, 20, 0.96));
    color: white;
  }

  .bureau-modal__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .bureau-modal__eyebrow {
    color: #86efac;
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }

  .bureau-modal__title {
    margin-top: 0.75rem;
    font-size: clamp(1.7rem, 2.5vw, 2.4rem);
    font-weight: 600;
    line-height: 1.08;
  }

  .bureau-modal__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.08);
    color: white;
  }

  .bureau-modal__actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .bureau-field {
    display: grid;
    gap: 0.65rem;
  }

  .bureau-field__label {
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .bureau-field__input,
  .bureau-field__textarea {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.2rem;
    background: rgba(255, 255, 255, 0.06);
    color: white;
    padding: 0.95rem 1rem;
    outline: none;
    transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
  }

  .bureau-field__textarea {
    min-height: 8rem;
    resize: vertical;
  }

  .bureau-field__input:focus,
  .bureau-field__textarea:focus {
    border-color: rgba(52, 211, 153, 0.55);
    box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.12);
    transform: translateY(-1px);
  }

  .approbation-overlay {
    background-color: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(10px);
  }

  .approbation-modal {
    width: min(860px, calc(100vw - 2rem));
    max-height: min(720px, calc(100vh - 2rem));
    overflow: hidden;
    border: 1px solid #dcfce7;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.22);
  }

  .approbation-scroll {
    max-height: calc(720px - 120px);
    overflow-y: auto;
    scrollbar-gutter: stable;
  }

  .approbation-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #dcfce7;
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(240, 253, 244, 0.8));
  }

  .approbation-item + .approbation-item {
    margin-top: 1rem;
  }

  .approbation-avatar {
    width: 88px;
    height: 88px;
    border-radius: 24px;
    object-fit: cover;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
  }

  .approbation-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  .approbation-action:hover {
    transform: translateY(-1px);
  }

  .approbation-action--approve {
    background: rgba(34, 197, 94, 0.12);
    color: #15803d;
    box-shadow: 0 10px 24px rgba(34, 197, 94, 0.12);
  }

  .approbation-action--reject {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
    box-shadow: 0 10px 24px rgba(239, 68, 68, 0.1);
  }

  .approbation-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.92);
    color: #111827;
    font-size: 1.25rem;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);
  }

  :deep(.member-table-card) {
    background: #ffffff;
    border: 1px solid #dcfce7;
    border-radius: 20px;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
    width: 100%;
  }

  :deep(.member-table-card .v-card-text) {
    padding: 24px 24px 8px;
  }

  :deep(.member-search-field .v-field) {
    background: #ffffff;
    color: #111827;
  }

  :deep(.member-search-field .v-label) {
    color: #6b7280;
  }

  :deep(.member-search-field input) {
    color: #111827;
  }

  :deep(.member-search-field .v-icon) {
    color: #15803d;
  }

  :deep(.member-data-table) {
    background: rgba(255, 255, 255, 0.72) !important;
    color: #111827;
  }

  :deep(.member-data-table .v-table),
  :deep(.member-data-table .v-table__wrapper),
  :deep(.member-data-table .v-table__wrapper > table),
  :deep(.member-data-table thead),
  :deep(.member-data-table tbody),
  :deep(.member-data-table tr),
  :deep(.member-data-table th),
  :deep(.member-data-table td) {
    background: transparent !important;
  }

  :deep(.member-data-table .v-table) {
    background-color: rgba(255, 255, 255, 0.72) !important;
    border-radius: 16px;
    overflow: hidden;
  }

  :deep(.member-data-table .v-table__wrapper) {
    overflow-x: auto;
    scrollbar-gutter: stable;
  }

  :deep(.member-data-table .v-data-table-header__content) {
    color: #02d14e;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.03em;
  }

  :deep(.member-data-table tbody tr) {
    transition: background-color 0.2s ease;
  }

  :deep(.member-data-table tbody tr:hover) {
    background: rgba(22, 163, 74, 0.08);
  }

  :deep(.member-data-table tbody td) {
    color: #374151;
  }

  :deep(.member-data-table tbody td:first-child),
  :deep(.member-data-table tbody td:nth-child(2)) {
    color: #111827;
    font-weight: 600;
  }

  @media (min-width: 640px) {
    .bureau-button {
      width: auto;
      min-width: 220px;
    }

    .bureau-modal__actions {
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  @media (max-width: 1024px) {
    .bureau-hero {
      padding-top: 2rem;
    }

    .bureau-floating-note {
      max-width: 14rem;
    }
  }

  @media (max-width: 768px) {
    .bureau-hero {
      padding-bottom: 4rem;
    }

    .bureau-hero__orb--emerald,
    .bureau-hero__orb--amber {
      width: 13rem;
      height: 13rem;
    }

    .bureau-floating-note {
      max-width: 11rem;
      padding: 0.9rem;
    }

    .bureau-section__title {
      font-size: clamp(1.75rem, 8vw, 2.4rem);
    }

    .action-card {
      padding: 1.35rem;
    }

    .action-card__icon {
      width: 3.4rem;
      height: 3.4rem;
      font-size: 1.7rem;
    }

    .bureau-modal {
      border-radius: 1.5rem;
      padding: 1rem;
    }

    .bureau-modal__header {
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .bureau-modal__close {
      width: 2.5rem;
      height: 2.5rem;
      flex: 0 0 auto;
    }

    .bureau-floating-note--bottom {
      right: 0.75rem;
      bottom: 0.75rem;
    }

    .bureau-floating-note--top {
      top: 0.75rem;
      left: 0.75rem;
    }

    .approbation-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .approbation-avatar {
      width: 72px;
      height: 72px;
      border-radius: 18px;
    }

    :deep(.member-table-card .v-card-text) {
      padding: 16px 16px 8px;
    }
  }

  @media (max-width: 520px) {
    .bureau-hero__orb--emerald,
    .bureau-hero__orb--amber {
      width: 10rem;
      height: 10rem;
    }

    .bureau-floating-note {
      position: static;
      max-width: none;
      margin-top: 0.75rem;
    }

    .bureau-portrait-frame {
      display: flex;
      flex-direction: column;
    }

    .bureau-modal__title {
      font-size: 1.45rem;
    }

    .bureau-field__input,
    .bureau-field__textarea {
      padding: 0.85rem 0.9rem;
    }
  }
</style>
