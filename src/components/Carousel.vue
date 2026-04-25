<script setup>
  import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { computed, ref } from 'vue'
  import { membres } from '@/data/membres'
  import 'swiper/css'

  import 'swiper/css/effect-coverflow'

  const props = defineProps({
    members: {
      type: Array,
      default: () => [],
    },
    showManageButton: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['delete-slide', 'edit-slide', 'manage'])

  const modules = [Autoplay, EffectCoverflow, Navigation]

  const swiperInstance = ref(null)
  const activeIndex = ref(0)

  const carouselMembers = computed(() => props.members.length > 0 ? props.members : membres)

  const activeMember = computed(() => carouselMembers.value[activeIndex.value] ?? carouselMembers.value[0])

  function onSwiper (swiper) {
    swiperInstance.value = swiper
    activeIndex.value = swiper.realIndex ?? 0
  }

  function onSlideChange (swiper) {
    activeIndex.value = swiper.realIndex ?? 0
  }

  function goPrev () {
    swiperInstance.value?.slidePrev()
  }

  function goNext () {
    swiperInstance.value?.slideNext()
  }

  function openManager () {
    emit('manage')
  }

  function editSlide (member) {
    emit('edit-slide', member)
  }

  function deleteSlide (member) {
    emit('delete-slide', member)
  }
</script>

<template>
  <div class="bureau-carousel mx-auto max-w-6xl">
    <div class="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
          Bureau 2026
        </p>
        <h3 class="mt-3 font-serif text-2xl font-semibold text-stone-900 sm:text-3xl md:text-4xl">
          Une équipe visible, active et connectée.
        </h3>
      </div>

      <div class="flex items-center gap-3 self-center lg:self-auto">
        <button
          v-if="showManageButton"
          class="bureau-manage-button"
          type="button"
          @click="openManager"
        >
          Modifier
        </button>
        <button
          class="bureau-control"
          type="button"
          @click="goPrev"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          class="bureau-control"
          type="button"
          @click="goNext"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>

    <swiper
      :autoplay="{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }"
      :breakpoints="{
        320: { slidesPerView: 1.02, spaceBetween: 14 },
        480: { slidesPerView: 1.18, spaceBetween: 16 },
        768: { slidesPerView: 1.5, spaceBetween: 24 },
        1024: { slidesPerView: 2.2, spaceBetween: 28 }
      }"
      :centered-slides="true"
      class="bureau-swiper overflow-visible pb-6 sm:pb-8"
      :coverflow-effect="{
        depth: 120,
        modifier: 1,
        rotate: 0,
        scale: 0.9,
        slideShadows: false,
        stretch: 0
      }"
      :effect="'coverflow'"
      :grab-cursor="true"
      :loop="true"
      :modules="modules"
      @slide-change="onSlideChange"
      @swiper="onSwiper"
    >
      <swiper-slide
        v-for="item in carouselMembers"
        :key="item.id || item.nom"
        class="bureau-slide"
      >
        <article class="member-card overflow-hidden rounded-[1.5rem] border border-white/60 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.12)] sm:rounded-[2rem]">
          <div class="relative h-[21rem] overflow-hidden sm:h-[25rem]">
            <img
              :alt="`${item.nom} - ${item.poste}`"
              class="member-card__image h-full w-full object-cover"
              :src="item.image"
            >
            <div class="member-card__overlay absolute inset-0" />
            <div class="absolute left-4 top-4 rounded-full border border-white/25 bg-black/20 px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:text-[0.65rem] sm:tracking-[0.28em]">
              Tsingy
            </div>
            <div
              v-if="showManageButton"
              class="member-card__actions absolute right-4 top-4 z-10 flex gap-2 sm:right-5 sm:top-5"
            >
              <button
                class="member-card__action member-card__action--edit"
                type="button"
                @click.stop="editSlide(item)"
              >
                Edit
              </button>
              <button
                class="member-card__action member-card__action--delete"
                type="button"
                @click.stop="deleteSlide(item)"
              >
                Supprimer
              </button>
            </div>
            <div class="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-200">
                {{ item.details.role }}
              </p>
              <h4 class="mt-2 text-xl font-semibold leading-tight sm:text-2xl">
                {{ item.nom }}
              </h4>
              <p class="mt-2 text-sm text-white/80">
                {{ item.poste }}
              </p>
            </div>
          </div>
        </article>
      </swiper-slide>
    </swiper>
    class="bureau-swiper overflow-visible pb-6 sm:pb-8"

    <div class="active-member-panel mt-2 grid gap-5 rounded-[1.5rem] border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/60 p-4 shadow-[0_20px_60px_rgba(16,185,129,0.08)] sm:mt-4 sm:rounded-[2rem] sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center md:p-8">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
          Membre à l'honneur
        </p>
        <h4 class="mt-3 font-serif text-2xl font-semibold text-stone-900 sm:text-3xl md:text-4xl">
          {{ activeMember.nom }}
        </h4>
        <p class="mt-2 text-base font-medium text-stone-600">
          {{ activeMember.poste }}
        </p>
        <p class="mt-5 max-w-2xl text-sm leading-7 text-stone-600 md:text-base">
          Un rôle central dans la dynamique de l'association, avec une mission claire et une implication directe dans la vie du bureau.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div class="detail-tile">
          <span class="detail-tile__label">École</span>
        </div>
        <div class="detail-tile">
          <span class="detail-tile__label">Filière</span>
          <strong class="detail-tile__value">{{ activeMember.details.filiere }}</strong>
        </div>
        <div class="detail-tile">
          <span class="detail-tile__label">Niveau</span>
          <strong class="detail-tile__value">{{ activeMember.details.niveau }}</strong>
        </div>
        <div class="detail-tile">
          <span class="detail-tile__label">Mission</span>
          <strong class="detail-tile__value">{{ activeMember.details.role }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bureau-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid rgba(5, 150, 105, 0.2);
  border-radius: 9999px;
  background: white;
  color: rgb(17 24 39);
  font-size: 1.1rem;
  transition: transform 180ms ease, background-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
}

.bureau-manage-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0.75rem 1.1rem;
  border: 1px solid rgba(5, 150, 105, 0.18);
  border-radius: 9999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(220, 252, 231, 0.95));
  color: rgb(6 95 70);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.bureau-manage-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(5, 150, 105, 0.16);
}

.bureau-control:hover {
  background: rgb(5 150 105);
  color: white;
  box-shadow: 0 14px 30px rgba(5, 150, 105, 0.22);
  transform: translateY(-2px);
}

.bureau-slide {
  transition: transform 300ms ease, opacity 300ms ease, filter 300ms ease;
}

.bureau-slide:not(.swiper-slide-active) {
  opacity: 0.62;
  filter: saturate(0.7);
}

.bureau-slide.swiper-slide-active {
  opacity: 1;
}

.member-card {
  transition: transform 350ms ease, box-shadow 350ms ease;
}

.member-card__image {
  transition: transform 700ms ease;
}

.member-card__overlay {
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.08) 0%, rgba(15, 23, 42, 0.18) 40%, rgba(15, 23, 42, 0.82) 100%),
    linear-gradient(135deg, rgba(16, 185, 129, 0.15), transparent 55%);
}

.bureau-slide.swiper-slide-active .member-card {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.18);
}

.member-card__actions {
  opacity: 1;
}

.member-card__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;
  padding: 0.55rem 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 9999px;
  background: rgba(6, 17, 13, 0.62);
  color: white;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease;
}

.member-card__action:hover {
  transform: translateY(-1px);
}

.member-card__action--edit:hover {
  background: rgba(5, 150, 105, 0.88);
  border-color: rgba(167, 243, 208, 0.65);
}

.member-card__action--delete:hover {
  background: rgba(220, 38, 38, 0.86);
  border-color: rgba(254, 202, 202, 0.7);
}

.bureau-slide.swiper-slide-active .member-card__image,
.member-card:hover .member-card__image {
  transform: scale(1.06);
}

.active-member-panel {
  position: relative;
  overflow: hidden;
}

.active-member-panel::after {
  content: '';
  position: absolute;
  top: -3rem;
  right: -3rem;
  width: 10rem;
  height: 10rem;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0) 72%);
  pointer-events: none;
}

.detail-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-height: 7rem;
  padding: 1rem;
  border: 1px solid rgba(16, 185, 129, 0.12);
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(8px);
}

.detail-tile__label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgb(5 150 105);
}

.detail-tile__value {
  font-size: 1rem;
  line-height: 1.5;
  color: rgb(24 24 27);
}

@media (max-width: 767px) {
  .member-card {
    border-radius: 1.5rem;
  }

  .bureau-slide.swiper-slide-active .member-card {
    transform: translateY(-4px) scale(1.01);
  }

  .active-member-panel {
    padding: 1.25rem;
  }
}
</style>
