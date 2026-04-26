<template>
  <div class="event-page h-[89.5vh] overflow-hidden">
    <div class="event-page__backdrop" />

    <div class="relative z-10 grid h-[90vh] lg:grid-cols-[340px_1fr]">
      <aside class="event-scroll-area max-h-screen overflow-y-auto border-r border-green-100 bg-white/78 p-6 backdrop-blur-xl">
        <div class="rounded-[28px] border border-green-100 bg-white/92 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
                Evenements
              </p>
              <h1 class="mt-3 text-4xl font-black uppercase tracking-tight text-black">
                Galerie SG
              </h1>
            </div>

            <button
              v-if="isAdmin"
              class="event-admin-button event-admin-button--primary"
              type="button"
              @click="startCreateEvent"
            >
              Ajouter
            </button>
          </div>

          <p class="mt-4 text-sm leading-6 text-gray-600">
            Parcourez les activites du groupe dans une galerie claire. Les administrateurs peuvent gerer les evenements et leurs images depuis cette page.
          </p>

          <div v-if="loading" class="mt-8 rounded-2xl border border-dashed border-green-200 bg-green-50 px-4 py-6 text-sm text-green-800">
            Chargement des evenements...
          </div>

          <div v-else-if="events.length === 0" class="mt-8 rounded-2xl border border-dashed border-green-200 bg-green-50 px-4 py-6 text-sm text-green-800">
            Aucun evenement disponible pour le moment.
          </div>

          <div v-else class="mt-8 space-y-4">
            <article
              v-for="item in events"
              :key="item.id"
              class="rounded-[24px] border border-white bg-white/80 p-3 shadow-sm transition duration-200 hover:border-green-200 hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)]"
              :class="selectedEvent?.id === item.id ? 'border-green-500 bg-green-50/90 shadow-[0_12px_30px_rgba(22,163,74,0.12)]' : ''"
            >
              <button
                class="w-full rounded-[18px] px-3 py-3 text-left"
                type="button"
                @click="selectEvent(item.id)"
              >
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-base font-bold" :class="selectedEvent?.id === item.id ? 'text-black' : 'text-gray-700'">
                      {{ item.title }}
                    </p>
                    <p class="mt-1 text-sm" :class="selectedEvent?.id === item.id ? 'text-green-700' : 'text-gray-500'">
                      {{ formatDate(item.date) }}
                    </p>
                  </div>

                  <span class="event-status-pill" :class="statusClass(item.status)">
                    {{ statusLabel(item.status) }}
                  </span>
                </div>

                <p class="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                  {{ item.description }}
                </p>
              </button>

              <div v-if="isAdmin" class="mt-3 flex flex-wrap gap-2 border-t border-green-100 px-3 pt-3">
                <button
                  class="event-admin-button"
                  type="button"
                  @click="startEditEvent(item)"
                >
                  Renommer / modifier
                </button>
                <button
                  class="event-admin-button event-admin-button--danger"
                  type="button"
                  @click="removeEvent(item)"
                >
                  Supprimer
                </button>
              </div>
            </article>
          </div>
        </div>
      </aside>

      <section class="event-scroll-area max-h-screen overflow-y-auto p-4 md:p-8">
        <div v-if="selectedEvent" class="space-y-8">
          <section class="overflow-hidden rounded-[32px] border border-green-100 bg-white/78 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <div class="grid gap-8 p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
              <div>
                <div class="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
                      Evenement actif
                    </p>
                    <h2 class="mt-4 text-4xl font-black text-black md:text-5xl">
                      {{ selectedEvent.title }}
                    </h2>
                  </div>

                  <div v-if="isAdmin" class="flex flex-wrap gap-2">
                    <button
                      class="event-admin-button"
                      type="button"
                      @click="startEditEvent(selectedEvent)"
                    >
                      Modifier
                    </button>
                    <button
                      class="event-admin-button event-admin-button--primary"
                      type="button"
                      @click="startCreateImage"
                    >
                      Ajouter une image
                    </button>
                  </div>
                </div>

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
                    <p class="text-xs uppercase tracking-[0.25em] text-gray-500">Statut</p>
                    <p class="mt-2 text-lg font-bold text-black">{{ statusLabel(selectedEvent.status) }}</p>
                  </div>
                  <div class="rounded-2xl border border-gray-200 bg-white px-5 py-4">
                    <p class="text-xs uppercase tracking-[0.25em] text-gray-500">Lieu</p>
                    <p class="mt-2 text-lg font-bold text-black">{{ selectedEvent.location || 'Non renseigne' }}</p>
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
                      Cliquez sur une image pour ouvrir le lecteur plein ecran. Si vous etes administrateur, vous pouvez aussi la remplacer, la renommer ou la supprimer.
                    </p>
                  </div>

                  <div v-if="selectedEvent.imageData.length > 0" class="grid grid-cols-2 gap-4">
                    <div
                      v-for="preview in selectedEvent.imageData.slice(0, 2)"
                      :key="preview.id"
                      class="overflow-hidden rounded-2xl border border-white bg-white shadow-sm"
                    >
                      <img
                        :alt="preview.name"
                        class="h-32 w-full object-cover"
                        :src="preview.url"
                      >
                    </div>
                  </div>

                  <div v-else class="rounded-2xl border border-dashed border-green-200 bg-white/75 px-4 py-5 text-sm text-gray-500">
                    Aucune image dans cet evenement.
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
                  Photos de {{ selectedEvent.title }}
                </h3>
              </div>
              <p class="text-sm text-gray-500">
                {{ isAdmin ? 'Cliquez pour afficher, modifier ou supprimer une image.' : 'Cliquez sur une image pour l afficher en grand format.' }}
              </p>
            </div>

            <div v-if="selectedEvent.imageData.length === 0" class="rounded-[24px] border border-dashed border-green-200 bg-green-50 px-5 py-8 text-center text-sm text-green-900">
              Cet evenement ne contient encore aucune image.
            </div>

            <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              <article
                v-for="(item, index) in selectedEvent.imageData"
                :key="item.id"
                class="overflow-hidden rounded-[24px] border border-white bg-white/85 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <button
                  class="event-image-card group w-full text-left"
                  type="button"
                  @click="selectImage(index, selectedEvent)"
                >
                  <div class="relative overflow-hidden">
                    <img
                      :alt="item.name"
                      class="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                      :src="item.url"
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

                <div v-if="isAdmin" class="flex flex-wrap gap-2 border-t border-green-100 px-4 py-4">
                  <button
                    class="event-admin-button"
                    type="button"
                    @click="startEditImage(item)"
                  >
                    Mettre a jour
                  </button>
                  <button
                    class="event-admin-button event-admin-button--danger"
                    type="button"
                    @click="removeImage(item)"
                  >
                    Supprimer
                  </button>
                </div>
              </article>
            </div>
          </section>
        </div>

        <div v-else class="mx-auto mt-16 max-w-2xl rounded-[32px] border border-dashed border-green-200 bg-white/80 px-8 py-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <h2 class="text-3xl font-black text-black">
            Aucun evenement selectionne
          </h2>
          <p class="mt-3 text-sm leading-7 text-gray-600">
            Choisissez un evenement dans la colonne de gauche pour consulter sa galerie.
          </p>
          <button
            v-if="isAdmin"
            class="event-admin-button event-admin-button--primary mt-6"
            type="button"
            @click="startCreateEvent"
          >
            Creer le premier evenement
          </button>
        </div>
      </section>
    </div>

    <div v-if="eventModal.open" class="event-modal-backdrop" @click.self="closeEventModal">
      <div class="event-modal-panel">
        <div class="flex items-start justify-between gap-4 border-b border-green-100 px-6 py-5">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-green-700">
              {{ eventModal.mode === 'create' ? 'Nouvel evenement' : 'Edition evenement' }}
            </p>
            <h2 class="mt-2 text-3xl font-bold text-black">
              {{ eventModal.mode === 'create' ? 'Ajouter un evenement' : 'Renommer et mettre a jour' }}
            </h2>
          </div>

          <button class="event-modal-close" type="button" @click="closeEventModal">
            <span class="mdi mdi-window-close" />
          </button>
        </div>

        <div class="grid gap-5 px-6 py-6">
          <label class="event-field">
            <span class="event-field__label">Titre</span>
            <input
              v-model="eventForm.title"
              class="event-field__input"
              placeholder="Titre de l evenement"
              type="text"
            >
          </label>

          <label class="event-field">
            <span class="event-field__label">Description</span>
            <textarea
              v-model="eventForm.description"
              class="event-field__textarea"
              placeholder="Description detaillee"
              rows="5"
            />
          </label>

          <div class="grid gap-5 md:grid-cols-2">
            <label class="event-field">
              <span class="event-field__label">Date</span>
              <input
                v-model="eventForm.eventDate"
                class="event-field__input"
                type="date"
              >
            </label>

            <label class="event-field">
              <span class="event-field__label">Lieu</span>
              <input
                v-model="eventForm.location"
                class="event-field__input"
                placeholder="Lieu de l evenement"
                type="text"
              >
            </label>
          </div>

          <label class="event-field">
            <span class="event-field__label">Statut</span>
            <select v-model="eventForm.status" class="event-field__input">
              <option
                v-for="option in statusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </label>
        </div>

        <div class="flex justify-end gap-3 border-t border-green-100 px-6 py-5">
          <button class="event-admin-button" type="button" @click="closeEventModal">
            Annuler
          </button>
          <button class="event-admin-button event-admin-button--primary" type="button" @click="submitEventForm">
            {{ eventModal.mode === 'create' ? 'Ajouter' : 'Enregistrer' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="imageModal.open" class="event-modal-backdrop" @click.self="closeImageModal">
      <div class="event-modal-panel">
        <div class="flex items-start justify-between gap-4 border-b border-green-100 px-6 py-5">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-green-700">
              {{ imageModal.mode === 'create' ? 'Nouvelle image' : 'Edition image' }}
            </p>
            <h2 class="mt-2 text-3xl font-bold text-black">
              {{ imageModal.mode === 'create' ? 'Ajouter une image' : 'Mettre a jour une image' }}
            </h2>
          </div>

          <button class="event-modal-close" type="button" @click="closeImageModal">
            <span class="mdi mdi-window-close" />
          </button>
        </div>

        <div class="grid gap-5 px-6 py-6">
          <label class="event-field">
            <span class="event-field__label">Nom de l image</span>
            <input
              v-model="imageForm.name"
              class="event-field__input"
              placeholder="Nom visible dans la galerie"
              type="text"
            >
          </label>

          <label class="event-field">
            <span class="event-field__label">Fichier image</span>
            <input
              accept="image/*"
              class="event-field__input event-field__file"
              type="file"
              @change="onImageFileChange"
            >
          </label>

          <div v-if="imagePreview" class="overflow-hidden rounded-[24px] border border-green-100 bg-green-50/60 p-3">
            <img :alt="imageForm.name || 'Apercu image'" class="h-64 w-full rounded-[18px] object-cover" :src="imagePreview">
          </div>
        </div>

        <div class="flex justify-end gap-3 border-t border-green-100 px-6 py-5">
          <button class="event-admin-button" type="button" @click="closeImageModal">
            Annuler
          </button>
          <button class="event-admin-button event-admin-button--primary" type="button" @click="submitImageForm">
            {{ imageModal.mode === 'create' ? 'Ajouter' : 'Mettre a jour' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showDialog.show" class="event-lightbox">
      <div class="absolute inset-0 cursor-pointer" @click="closeDialog" />

      <div class="event-lightbox__panel">
        <button class="event-lightbox__nav left-4" type="button" @click="prevImage">
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

        <div class="relative overflow-hidden rounded-[30px] p-3">
          <img
            :alt="showDialog.images[showDialog.index]?.name || 'Evenement image'"
            class="h-[78vh] w-[82vw] rounded-[24px] bg-black object-contain"
            :src="showDialog.images[showDialog.index]?.url"
          >

          <div class="absolute bottom-6 left-6 rounded-full px-4 py-2 text-sm font-semibold text-black">
            {{ showDialog.index + 1 }} / {{ showDialog.images.length }}
          </div>

          <button class="event-lightbox__close" type="button" @click="closeDialog">
            ✕
          </button>
        </div>

        <button class="event-lightbox__nav right-4" type="button" @click="nextImage">
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
  import { computed, onMounted, ref, watch } from 'vue'
  import { API_BASE_URL } from '@/lib/api'
  import { useAppStore } from '@/stores/app'

  const appStore = useAppStore()

  const loading = ref(false)
  const selectedEventId = ref(null)
  const showDialog = ref({ show: false, index: 0, images: [] })
  const eventModal = ref({ open: false, mode: 'create' })
  const imageModal = ref({ open: false, mode: 'create' })
  const eventForm = ref(createEmptyEventForm())
  const imageForm = ref(createEmptyImageForm())

  const statusOptions = [
    { label: 'Brouillon', value: 'DRAFT' },
    { label: 'Publie', value: 'PUBLISHED' },
    { label: 'Archive', value: 'ARCHIVED' },
  ]

  const isAdmin = computed(() => appStore.user?.role === 'ADMIN')
  const events = computed(() => appStore.events.map(event => ({
    ...event,
    imageData: (event.imageData || []).map(image => ({
      ...image,
      url: resolveMediaUrl(image.url),
    })),
  })))
  const selectedEvent = computed(() => events.value.find(event => event.id === selectedEventId.value) || null)
  const imagePreview = computed(() => imageForm.value.imageData || imageForm.value.currentUrl || '')

  watch(events, currentEvents => {
    if (currentEvents.length === 0) {
      selectedEventId.value = null
      closeDialog()
      return
    }

    const hasSelection = currentEvents.some(event => event.id === selectedEventId.value)

    if (!hasSelection) {
      selectedEventId.value = currentEvents[0].id
    }
  }, { immediate: true })

  onMounted(() => {
    loadEvents()
  })

  function createEmptyEventForm() {
    return {
      description: '',
      eventDate: '',
      id: null,
      location: '',
      status: 'DRAFT',
      title: '',
    }
  }

  function createEmptyImageForm() {
    return {
      currentUrl: '',
      id: '',
      imageData: '',
      imageName: '',
      name: '',
    }
  }

  async function loadEvents() {
    loading.value = true

    try {
      await appStore.fetchEvents()
    } catch (error) {
      window.alert(error.message || 'Impossible de charger les evenements.')
    } finally {
      loading.value = false
    }
  }

  function selectEvent(id) {
    selectedEventId.value = id
  }

  function startCreateEvent() {
    eventForm.value = createEmptyEventForm()
    eventModal.value = { open: true, mode: 'create' }
  }

  function startEditEvent(event) {
    eventForm.value = {
      description: event.description || '',
      eventDate: toDateInputValue(event.date),
      id: event.id,
      location: event.location || '',
      status: event.status || 'DRAFT',
      title: event.title || '',
    }
    eventModal.value = { open: true, mode: 'edit' }
  }

  function closeEventModal() {
    eventModal.value = { ...eventModal.value, open: false }
    eventForm.value = createEmptyEventForm()
  }

  async function submitEventForm() {
    try {
      if (!eventForm.value.title.trim()) {
        throw new Error('Le titre est obligatoire.')
      }

      if (!eventForm.value.description.trim() || eventForm.value.description.trim().length < 5) {
        throw new Error('La description doit contenir au moins 5 caracteres.')
      }

      const payload = {
        description: eventForm.value.description.trim(),
        eventDate: eventForm.value.eventDate || undefined,
        location: eventForm.value.location.trim(),
        status: eventForm.value.status,
        title: eventForm.value.title.trim(),
      }

      const result = eventModal.value.mode === 'create'
        ? await appStore.createEvent(payload)
        : await appStore.updateEvent(eventForm.value.id, payload)

      selectedEventId.value = result.id
      closeEventModal()
    } catch (error) {
      window.alert(error.message || 'Impossible d enregistrer cet evenement.')
    }
  }

  async function removeEvent(event) {
    try {
      if (!window.confirm(`Supprimer l evenement \"${event.title}\" ?`)) {
        return
      }

      await appStore.deleteEvent(event.id)
    } catch (error) {
      window.alert(error.message || 'Impossible de supprimer cet evenement.')
    }
  }

  function startCreateImage() {
    if (!selectedEvent.value) {
      return
    }

    imageForm.value = createEmptyImageForm()
    imageModal.value = { open: true, mode: 'create' }
  }

  function startEditImage(image) {
    imageForm.value = {
      currentUrl: image.url,
      id: image.id,
      imageData: '',
      imageName: '',
      name: image.name || '',
    }
    imageModal.value = { open: true, mode: 'edit' }
  }

  function closeImageModal() {
    imageModal.value = { ...imageModal.value, open: false }
    imageForm.value = createEmptyImageForm()
  }

  function resolveMediaUrl(url) {
    if (!url) {
      return ''
    }

    if (url.startsWith('data:') || /^https?:\/\//.test(url)) {
      return url
    }

    return new URL(url, API_BASE_URL).toString()
  }

  function toDateInputValue(date) {
    if (!date) {
      return ''
    }

    const dateObject = new Date(date)

    if (Number.isNaN(dateObject.getTime())) {
      return ''
    }

    const timezoneOffset = dateObject.getTimezoneOffset() * 60000
    return new Date(dateObject.getTime() - timezoneOffset).toISOString().slice(0, 10)
  }

  function statusLabel(status) {
    if (status === 'PUBLISHED') return 'Publie'
    if (status === 'ARCHIVED') return 'Archive'
    return 'Brouillon'
  }

  function statusClass(status) {
    if (status === 'PUBLISHED') return 'event-status-pill--published'
    if (status === 'ARCHIVED') return 'event-status-pill--archived'
    return 'event-status-pill--draft'
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(String(reader.result || '')), { once: true })
      reader.addEventListener('error', () => reject(new Error('Impossible de lire cette image.')), { once: true })
      reader.readAsDataURL(file)
    })
  }

  async function onImageFileChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      imageForm.value.imageData = await readFileAsDataUrl(file)
      imageForm.value.imageName = file.name

      if (!imageForm.value.name) {
        imageForm.value.name = file.name
      }
    } catch (error) {
      window.alert(error.message || 'Impossible de charger cette image.')
    }
  }

  async function submitImageForm() {
    try {
      if (!selectedEvent.value) {
        throw new Error('Aucun evenement selectionne.')
      }

      if (!imageForm.value.name.trim()) {
        throw new Error('Le nom de l image est obligatoire.')
      }

      if (imageModal.value.mode === 'create' && !imageForm.value.imageData) {
        throw new Error('Ajoutez un fichier image avant de continuer.')
      }

      const payload = {
        imageData: imageForm.value.imageData || undefined,
        imageName: imageForm.value.imageName || imageForm.value.name,
        name: imageForm.value.name.trim(),
      }

      if (imageModal.value.mode === 'create') {
        await appStore.addEventImage(selectedEvent.value.id, payload)
      } else {
        await appStore.updateEventImage(selectedEvent.value.id, imageForm.value.id, payload)
      }

      closeImageModal()
    } catch (error) {
      window.alert(error.message || 'Impossible d enregistrer cette image.')
    }
  }

  async function removeImage(image) {
    try {
      if (!selectedEvent.value) {
        return
      }

      if (!window.confirm(`Supprimer l image \"${image.name}\" ?`)) {
        return
      }

      await appStore.deleteEventImage(selectedEvent.value.id, image.id)

      if (showDialog.value.show) {
        closeDialog()
      }
    } catch (error) {
      window.alert(error.message || 'Impossible de supprimer cette image.')
    }
  }

  function selectImage(index, event) {
    showDialog.value.show = true
    showDialog.value.index = index
    showDialog.value.images = event.imageData
  }

  function nextImage() {
    if (showDialog.value.images.length === 0) {
      return
    }

    if (showDialog.value.index < showDialog.value.images.length - 1) {
      showDialog.value.index += 1
      return
    }

    showDialog.value.index = 0
  }

  function prevImage() {
    if (showDialog.value.images.length === 0) {
      return
    }

    if (showDialog.value.index > 0) {
      showDialog.value.index -= 1
      return
    }

    showDialog.value.index = showDialog.value.images.length - 1
  }

  function closeDialog() {
    showDialog.value = { show: false, index: 0, images: [] }
  }

  function formatDate(date) {
    if (!date) {
      return 'Date a confirmer'
    }

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

.event-image-card {
  backdrop-filter: blur(12px);
}

.event-scroll-area {
  scrollbar-gutter: stable;
}

.event-status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  border-radius: 9999px;
  padding: 0.5rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.event-status-pill--draft {
  background: #e5e7eb;
  color: #374151;
}

.event-status-pill--published {
  background: #dcfce7;
  color: #166534;
}

.event-status-pill--archived {
  background: #fee2e2;
  color: #b91c1c;
}

.event-admin-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid #d1fae5;
  background: white;
  color: #065f46;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.6rem 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.event-admin-button:hover {
  transform: translateY(-1px);
  border-color: #34d399;
  box-shadow: 0 12px 24px rgba(22, 163, 74, 0.12);
}

.event-admin-button--primary {
  background: #166534;
  border-color: #166534;
  color: white;
}

.event-admin-button--danger {
  border-color: #fecaca;
  color: #b91c1c;
}

.event-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(15, 23, 42, 0.38);
  backdrop-filter: blur(8px);
}

.event-modal-panel {
  width: min(720px, 100%);
  overflow: hidden;
  border: 1px solid rgba(220, 252, 231, 0.9);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 30px 90px rgba(15, 23, 42, 0.18);
}

.event-modal-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: #f0fdf4;
  color: #166534;
}

.event-field {
  display: grid;
  gap: 0.65rem;
}

.event-field__label {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #166534;
}

.event-field__input,
.event-field__textarea {
  width: 100%;
  border: 1px solid #bbf7d0;
  border-radius: 20px;
  background: #f8fafc;
  color: #111827;
  padding: 0.95rem 1rem;
}

.event-field__textarea {
  resize: vertical;
}

.event-field__file {
  padding-block: 0.8rem;
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
