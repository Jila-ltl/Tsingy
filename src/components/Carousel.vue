<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importation obligatoire des styles CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Navigation, Pagination, Autoplay];

const liste_membre = ref(
    [{
            image: "../../public/img/img.jpg",
            mot: "Bonjour"

        },
        {
            image: "/img/img1.png",
            mot:"Bonjour"

        },
        {
            image: "/img/img.jpg",
            mot:"Bonjour"

        }
    ]
)
</script>

<template>
  <div class="carousel-wrapper">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="10"
      :navigation="true"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 3000 }"
      class="my-swiper"
    >
      <swiper-slide v-for="item,i in liste_membre" :key="i" class="slide " :style="{ backgroundImage: `url(${item.image})` }">
        {{ item.mot }}
        
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.carousel-wrapper { width: 100%; margin: auto; }
.slide { 
   width: 100%;
  height: 400px; /* Ou la hauteur de ton choix */
  background-size: cover;
  background-position: center;
  color: white; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  border-radius: 8px;
  font-size: 2rem;
}
/* Style pour voir les flèches de navigation */
:deep(.swiper-button-next), :deep(.swiper-button-prev) { color: #35495e; }


</style>