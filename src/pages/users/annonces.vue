<template>
  <section id="annonces" class="py-20 bg-gray-100 min-h-screen">

    <h1 class="text-3xl font-bold text-center mb-12 text-gray-900">
      Toutes les annonces
    </h1>

    <div class="max-w-5xl mx-auto">

      <div
        v-for="item in annoncesValides"
        :id="item.id"
        :key="item.id"
        class="flex gap-6 bg-white p-6 rounded-xl shadow mb-8 hover:bg-gray-50 transition"
      >

        <!-- Bloc date -->
        <div class="bg-red-600 text-white p-4 text-center rounded-lg w-24 flex flex-col justify-center">
          <div class="text-2xl font-bold">
            {{ getDay(item.date) }}
          </div>
          <div class="uppercase">
            {{ getMonth(item.date) }}
          </div>
          <div class="text-sm">
            {{ getYear(item.date) }}
          </div>
        </div>

        <!-- Contenu -->
        <div class="flex-1">

          <h2 class="text-xl font-semibold mb-2">
            {{ item.titre }}
          </h2>

          <p class="text-gray-600 mb-3">
            {{ item.description }}
          </p>

          <!-- Infos -->
          <div class="text-sm text-gray-500 flex flex-wrap gap-4">

            <span>📍 {{ item.details.lieu }}</span>
            <span>⏰ {{ item.details.heure }}</span>

            <span v-if="item.details.dresscode">
              👕 {{ item.details.dresscode }}
            </span>

            <span v-if="item.details.paf">
              💰 {{ item.details.paf }}
            </span>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { annoncesValides } from '@/data/annonces'

  const route = useRoute()

  // 📌 Fonctions date
  const getDay = date => new Date(date).getDate().toString().padStart(2, '0')

  function getMonth (date) {
    return new Date(date).toLocaleString('fr-FR', { month: 'short' })
  }

  const getYear = date => new Date(date).getFullYear()

  // 📌 Scroll vers l’annonce
  onMounted(() => {
    if (route.hash) {
      const el = document.querySelector(route.hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 200)
      }
    }
  })

  const today = new Date()

  const annoncesFiltrees = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return annonces.filter(a => {
      const dateAnnonce = new Date(a.date)
      dateAnnonce.setHours(0, 0, 0, 0)

      return dateAnnonce >= today
    })
  })
</script>

<style scoped>
</style>
