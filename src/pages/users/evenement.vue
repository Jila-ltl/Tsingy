<template>
  <div class="event-page h-[89.5vh] overflow-hidden  ">
    <div class="event-page__backdrop" />

    <div class="relative z-10 grid h-[90vh] lg:grid-cols-[320px_1fr]">
      <aside class="max-h-screen overflow-y-auto border-r border-green-100 bg-white/75 p-6 backdrop-blur-xl event-scroll-area">
        <div class="rounded-[28px] border border-green-100 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
            Evenements
          </p>
          <h1 class="mt-3 text-4xl font-black uppercase tracking-tight text-black">
            Galerie SG
          </h1>
          <p class="mt-4 text-sm leading-6 text-gray-600">
            Retrouvez les activites du groupe dans une interface plus claire, avec un apercu rapide, des couleurs coherentes et une galerie immersive.
          </p>

          <div class="mt-8 space-y-3">
            <button
              v-for="item in events"
              :key="item.id"
              class="event-nav-item w-full rounded-2xl border px-4 py-4 text-left transition duration-200"
              :class="item.isSelect ? 'border-green-500 bg-green-50 shadow-[0_12px_30px_rgba(22,163,74,0.12)]' : 'border-white bg-white/70 hover:border-green-200 hover:bg-white'"
              @click="changeStatus(item)"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-base font-bold" :class="item.isSelect ? 'text-black' : 'text-gray-700'">
                    {{ item.name }}
                  </p>
                  <p class="mt-1 text-sm" :class="item.isSelect ? 'text-green-700' : 'text-gray-500'">
                    {{ formatDate(item.date) }}
                  </p>
                </div>
                <span
                  class="mt-1 inline-flex h-3 w-3 rounded-full"
                  :class="item.isSelect ? 'bg-red-500 shadow-[0_0_0_6px_rgba(239,68,68,0.12)]' : 'bg-gray-300'"
                />
              </div>
              <p class="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                {{ item.description }}
              </p>
            </button>
          </div>
        </div>
      </aside>

      <section class="event-scroll-area max-h-screen overflow-y-auto p-4 md:p-8">
        <div v-if="selectedEvent" class="space-y-8">
          <section class="overflow-hidden rounded-[32px] border border-green-100 bg-white/78 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div class="grid gap-8 p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
                  Evenement actif
                </p>
                <h2 class="mt-4 text-4xl font-black text-black md:text-5xl">
                  {{ selectedEvent.name }}
                </h2>
                <p class="mt-4 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
                  {{ selectedEvent.description }}
                </p>

                <div class="mt-8 flex flex-wrap gap-4">
                  <div class="rounded-2xl border border-green-100 bg-green-50 px-5 py-4">
                    <p class="text-xs uppercase tracking-[0.25em] text-green-700">Date</p>
                    <p class="mt-2 text-lg font-bold text-black">{{ formatDate(selectedEvent.date) }}</p>
                  </div>
                  <div class="rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
                    <p class="text-xs uppercase tracking-[0.25em] text-red-500">Photos</p>
                    <p class="mt-2 text-lg font-bold text-black">{{ selectedEvent.imageData.length }} images</p>
                  </div>
                  <div class="rounded-2xl border border-gray-200 bg-white px-5 py-4">
                    <p class="text-xs uppercase tracking-[0.25em] text-gray-500">Etat</p>
                    <p class="mt-2 text-lg font-bold text-black">Archive visuelle</p>
                  </div>
                </div>
              </div>

              <div class="relative overflow-hidden rounded-[28px] border border-green-100 bg-gradient-to-br from-white via-green-50 to-red-50 p-5">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(239,68,68,0.16),_transparent_40%)]" />
                <div class="relative flex h-full flex-col justify-between gap-6">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                      Apercu
                    </p>
                    <p class="mt-3 text-sm leading-7 text-gray-600">
                      Selectionnez une image pour ouvrir le lecteur plein ecran avec navigation laterale. Le rendu suit le meme langage visuel que la page d'accueil.
                    </p>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div
                      v-for="preview in selectedEvent.imageData.slice(0, 2)"
                      :key="preview.name"
                      class="overflow-hidden rounded-2xl border border-white bg-white shadow-sm"
                    >
                      <img
                        :alt="preview.name"
                        :src="preview.url"
                        class="h-32 w-full object-cover"
                      >
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
                  Galerie complete
                </p>
                <h3 class="mt-2 text-2xl font-black text-black md:text-3xl">
                  Photos de {{ selectedEvent.name }}
                </h3>
              </div>
              <p class="text-sm text-gray-500">
                Cliquez sur une image pour l'afficher en grand format.
              </p>
            </div>

            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              <button
                v-for="(item, index) in selectedEvent.imageData"
                :key="item.name"
                class="event-image-card group overflow-hidden rounded-[24px] border border-white bg-white/85 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(22,163,74,0.15)]"
                @click="selecteItem(index, selectedEvent)"
              >
                <div class="relative overflow-hidden">
                  <img
                    :alt="item.name"
                    :src="item.url"
                    class="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-80" />
                  <div class="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-green-700 backdrop-blur">
                    Photo {{ index + 1 }}
                  </div>
                </div>
                <div class="flex items-center justify-between px-4 py-4">
                  <div>
                    <p class="text-sm font-bold text-black">{{ item.name }}</p>
                    <p class="mt-1 text-xs uppercase tracking-[0.25em] text-gray-500">Archive SG</p>
                  </div>
                  <span class="text-xl text-red-500">+</span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </section>
    </div>

    <div v-if="showDialog.show" class="event-lightbox">
      <div class="absolute inset-0 cursor-pointer" @click="closeDialog" />

      <div class="event-lightbox__panel">
        <button class="event-lightbox__nav left-4" @click="prevImage">
          <svg
            class="h-10 w-10"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.75 19.5L8.25 12l7.5-7.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div class="relative overflow-hidden rounded-[30px]     p-3    ">
          <img
            :alt="showDialog.image[showDialog.index]?.name || 'Evenement image'"
            :src="showDialog.image[showDialog.index]?.url"
            class="h-[78vh] w-[82vw] rounded-[24px] object-contain bg-black"
          >

          <div class="absolute bottom-6 left-6 rounded-full  px-4 py-2 text-sm font-semibold text-black">
            {{ showDialog.index + 1 }} / {{ showDialog.image.length }}
          </div>

          <button class="event-lightbox__close" @click="closeDialog">
            ✕
          </button>
        </div>

        <button class="event-lightbox__nav right-4" @click="nextImage">
          <svg
            class="h-10 w-10"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.25 4.5l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const events = ref([
  {
    name: 'Assemblee Generale',
    id: 1,
    date: '2024-06-01',
    isSelect: true,
    description: 'Reunion generale annuelle avec presentation des resultats, perspectives et prises de decision importantes pour la communaute.',
    imageData: Array.from({ length: 18 }, (_, index) => ({
      name: `assemblee-${index + 1}.jpg`,
      type: 'image/jpeg',
      url: `https://picsum.photos/id/${index + 21}/900/650`,
    })),
  },
  {
    name: 'Conference Tech',
    id: 2,
    date: '2024-07-15',
    isSelect: false,
    description: 'Conference consacree aux nouvelles technologies, a l innovation et a la place du numerique dans les projets du groupe.',
    imageData: Array.from({ length: 18 }, (_, index) => ({
      name: `tech-${index + 1}.jpg`,
      type: 'image/jpeg',
      url: `https://picsum.photos/id/${index + 60}/900/650`,
    })),
  },
  {
    name: 'Workshop Design',
    id: 3,
    date: '2024-08-10',
    isSelect: false,
    description: 'Atelier pratique autour du design UI et UX avec demonstrations, exercices collaboratifs et revue de prototypes.',
    imageData: Array.from({ length: 18 }, (_, index) => ({
      name: `design-${index + 1}.jpg`,
      type: 'image/jpeg',
      url: `https://picsum.photos/id/${index + 100}/900/650`,
    })),
  },
  {
    name: 'Seminaire Marketing',
    id: 4,
    date: '2024-09-05',
    isSelect: false,
    description: 'Seminaire centre sur la communication, les strategies marketing digitales et la croissance de l image du groupe.',
    imageData: Array.from({ length: 18 }, (_, index) => ({
      name: `marketing-${index + 1}.jpg`,
      type: 'image/jpeg',
      url: `https://picsum.photos/id/${index + 140}/900/650`,
    })),
  },
  {
    name: 'Hackathon Dev',
    id: 5,
    date: '2024-10-20',
    isSelect: false,
    description: 'Competition de developpement en equipe avec des idees innovantes, du prototypage rapide et une restitution finale en public.',
    imageData: Array.from({ length: 18 }, (_, index) => ({
      name: `hackathon-${index + 1}.jpg`,
      type: 'image/jpeg',
      url: `https://picsum.photos/id/${index + 180}/900/650`,
    })),
  },
])

const selectedEvent = ref(events.value.find(event => event.isSelect) ?? events.value[0])
const showDialog = ref({ show: false, index: 0, image: [] })

function selecteItem(index, item) {
  showDialog.value.show = true
  showDialog.value.index = index
  showDialog.value.image = item.imageData
}

function changeStatus(item) {
  for (const eventItem of events.value) {
    eventItem.isSelect = false
  }

  item.isSelect = true
  selectedEvent.value = item
}

function nextImage() {
  if (showDialog.value.index < showDialog.value.image.length - 1) {
    showDialog.value.index += 1
    return
  }

  showDialog.value.index = 0
}

function prevImage() {
  if (showDialog.value.index > 0) {
    showDialog.value.index -= 1
    return
  }

  showDialog.value.index = showDialog.value.image.length - 1
}

function closeDialog() {
  showDialog.value.show = false
}

function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}
</script>

<style scoped>
.event-page {
  position: relative;
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.18), transparent 28%),
    radial-gradient(circle at bottom right, rgba(239, 68, 68, 0.14), transparent 22%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.97), rgba(240, 253, 244, 0.92));
}

.event-page__backdrop {
  position: absolute;
  inset: 0;
  background-image: url('/img/maki.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.08;
  mix-blend-mode: multiply;
}

.event-nav-item {
  backdrop-filter: blur(10px);
}

.event-image-card {
  backdrop-filter: blur(12px);
}

.event-scroll-area {
  scrollbar-gutter: stable;
}

.event-lightbox {
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

.event-lightbox__panel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 2rem;
}

.event-lightbox__nav {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.event-lightbox__nav:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.04);
}

.event-lightbox__close {
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

@media (max-width: 1024px) {
  .event-lightbox__nav {
    width: 48px;
    height: 48px;
  }

  .event-lightbox__panel {
    padding: 0 1rem;
  }
}
</style>
