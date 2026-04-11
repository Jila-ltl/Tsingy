<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { membres } from '@/data/membres'

// 🔥 instance swiper
const swiperInstance = ref(null)
let interval = null

// récupérer swiper
const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

// ▶ NEXT (hover)
const startNext = () => {
  if (!swiperInstance.value) return

  swiperInstance.value.slideNext()

  stopSlide()

  interval = setInterval(() => {
    swiperInstance.value.slideNext()
  }, 800)
}

// ◀ PREV (hover)
const startPrev = () => {
  if (!swiperInstance.value) return

  swiperInstance.value.slidePrev()

  stopSlide()

  interval = setInterval(() => {
    swiperInstance.value.slidePrev()
  }, 800)
}

// stop auto scroll
const stopSlide = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}
</script>

<template>
  <div class="relative max-w-5xl mx-auto">

    <!-- FLÈCHE GAUCHE -->
    <button
      @mouseenter="startPrev"
      @mouseleave="stopSlide"
      class="absolute -left-6 top-1/2 -translate-y-1/2 z-10 text-gray-500 text-3xl hover:text-red-600 transition"
    >
      ‹
    </button>

    <!-- CAROUSEL -->
    <swiper
      @swiper="onSwiper"
      :slides-per-view="3"
      :space-between="30"
      class="px-4"
    >

      <swiper-slide v-for="item in membres" :key="item.nom">

  <div class="group bg-white rounded-2xl shadow-md max-w-sm mx-auto p-4 transition duration-300 hover:scale-105">

    <!-- IMAGE -->
    <img
      :src="item.image"
      class="w-full h-56 object-cover rounded-lg"
    />

    <!-- TEXTE -->
    <div class="text-center mt-4">

      <h3 class="font-semibold text-lg">
        {{ item.poste }}
      </h3>

      <p class="text-gray-500 mt-1">
        {{ item.nom }}
      </p>

    </div>

    <!-- INFOS (VERSION SIMPLE QUI MARCHE) -->
    <div class="hidden group-hover:block text-xs text-gray-600 mt-3 text-center">

      <p>Etudie à {{ item.details.ecole }} en {{ item.details.filiere }} </p>
      <p>Année : {{ item.details.niveau }}</p>
      <p>Rôle: {{ item.details.role }}</p>

    </div>

  </div>

</swiper-slide>

    </swiper>

    <!-- FLÈCHE DROITE -->
    <button
      @mouseenter="startNext"
      @mouseleave="stopSlide"
      class="absolute -right-6 top-1/2 -translate-y-1/2 z-10 text-gray-500 text-3xl hover:text-red-600 transition"
    >
      ›
    </button>

  </div>
</template>