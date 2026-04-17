<template>
  <div class=" main flex flex-row gap-80 h-full">
    <button class="nav-arrow left" @click="prev">
        <svg class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.75 19.5L8.25 12l7.5-7.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

    <div class="grid grid-cols-1">
      <h1 class="about-title ">OUR TEAM</h1>
      <div class="carousel-container grid grid-cols-1 ">
        <div class="carousel-track">
          <div
            v-for="(member, i) in teamMembers"
            :key="i"
            class="card"
            :class="getCardClass(i)"
            @click="updateCarousel(i)"
          >
            <img :src="member.image" :alt="member.nom">
          </div>
        </div>

        <div class="member-info" :style="{ opacity: infoOpacity }">
          <h2 class="member-name">{{ teamMembers[currentIndex].nom }}</h2>
          <p class="member-role">{{ teamMembers[currentIndex].role }}</p>
        </div>

    <div class="dots">
      <div
        v-for="(_, i) in teamMembers"
        :key="i"
        class="dot"
        :class="{ active: i === currentIndex }"
        @click="updateCarousel(i)"
      ></div>
    </div>

      </div>
    </div>
    <button class="nav-arrow right" @click="next">
        <svg class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.25 4.5l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const teamMembers = ref([
  { role: "Secrétaire générale (SG)", nom: "Marie Warenska Jocya Ralison", image: "/img/waren.jpeg" },
  { role: "Secrétaire générale adjointe", nom: "Jade Ismaël", image: "/img/jade.jpeg" },
  { role: "Trésorière", nom: "Valisoa Razaiarimalala", image: "/img/waren.jpeg" },
  { role: "Chargé culturel", nom: "Juliana Razafindramanana", image: "/img/juliana.jpeg" },
  { role: "Chargé sportif", nom: "Guillot Harizaza", image: "/img/guillot.jpeg" },
  { role: "Responsable logistique", nom: "Guiot Ranaivomanana", image: "/img/waren.jpeg" },
  { role: "Chargé culturel", nom: "Juliana Razafindramanana", image: "/img/juliana.jpeg" },
  { role: "Responsable communication", nom: "Ulrica Chadia Baozaka", image: "/img/chadia.jpeg" },
  { role: "Chargé culturel", nom: "Juliana Razafindramanana", image: "/img/juliana.jpeg" },
  { role: "Responsable académique", nom: "Francia Arimelimanjaka", image: "/img/francia.jpeg" }
]);

const currentIndex = ref(0);
const isAnimating = ref(false);
const infoOpacity = ref(1);

// Logique pour calculer la classe CSS de chaque carte selon l'index actuel
const getCardClass = (i) => {
  const total = teamMembers.value.length;
  const offset = (i - currentIndex.value + total) % total;

  if (offset === 0) return "center";
  if (offset === 1) return "right-1";
  if (offset === 2) return "right-2";
  if (offset === total - 1) return "left-1";
  if (offset === total - 2) return "left-2";
  return "hidden";
};

const updateCarousel = (newIndex) => {
  if (isAnimating.value) return;
  isAnimating.value = true;

  infoOpacity.value = 0; // Transition du texte

  setTimeout(() => {
    currentIndex.value = newIndex;
    infoOpacity.value = 1;
    setTimeout(() => { isAnimating.value = false; }, 500);
  }, 300);
};

const next = () => updateCarousel((currentIndex.value + 1) % teamMembers.value.length);
const prev = () => updateCarousel((currentIndex.value - 1 + teamMembers.value.length) % teamMembers.value.length);

// Gestion du clavier
const handleKey = (e) => {
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
};

onMounted(() => {
  window.addEventListener("keydown", handleKey);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKey);
});
</script>

<style scoped>
.main {
    font-family: sans-serif;
    align-items: center;
    justify-content: center;
    background: linear-gradient(190deg, #010b37, #08090c);
    overflow: hidden;
    position: relative;
}
.about-title {
    /* margin-top: -60%; */
    font-size: 7.5rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.02rem;
    pointer-events: none;
    white-space: nowrap;
    background: linear-gradient(to bottom, rgb(255 255 255 / 35%) 30%, rgb(255 255 255 / 0%) 76%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.nav-arrow {

    top: 50%;
    transform: translateY(-50%);
    background: white;
    color: #01030f;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 20;
    transition: all 0.3s ease;
    font-size: 1.5rem;
    border: none;
    padding-bottom: 4px;
}

.nav-arrow:hover {
   transform: translateY(-50%) scale(1.1);
}

.left{
    right: 100px;
    padding-right: 3px;
}

.right{
    left: 100px;
    padding-left: 3px;
}


.carousel-container {
    width: 100%;
    max-width: 1200px;
    height: 450px;
    perspective: 1000px;
    position: relative;
    margin-top: 200PX;

}

.carousel-track {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card {
    position: absolute;
    width: 280px;
    height: 380px;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    transition: all 0.8s cubic-bezier(0.25,
        0.46,
        0.45,
        0.94);
}

.card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card.center {
    z-index: 10;
    transform: scale(1.1) translateZ(0);
}

.card.left-1,
.card.right-1 {
    z-index: 5;
    transform: scale(0.9) translateZ(-100px);
    opacity: 0.9;
}

.card.left-2,
.card.right-2 {
    z-index: 1;
    transform: scale(0.8) translateZ(-300px);
    opacity: 0.7;
}

.card.left-1 img,
.card.left-2 img,
.card.right-1 img,
.card.right-2 img {
    filter: grayscale(100%);
}

.card.left-1 {
    transform: translateX(-200px) scale(0.9) translateZ(-100px);
}

.card.left-2 {
    transform: translateX(-400px) scale(0.8) translateZ(-300px);
}

.card.right-1 {
    transform: translateX(200px) scale(0.9) translateZ(-100px);

}

.card.right-2 {
    transform: translateX(400px) scale(0.8) translateZ(-100px);

}

.card.hidden {
    opacity: 0;
    pointer-events: none;
}

.member-info {
    text-align: center;
    margin-top: 200px;
    transition: all 0.5s ease-out;
}

.member-name {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    position: relative;
    display: inline-block;
}

.member-name::before,
.member-name::after {
    content: "";
    position: absolute;
    top: 100%;
    width: 100px;
    height: 2px;
    background: rgb(8, 42, 123);
}

.member-name::before {
    left: -120px;
}

.member-name::after {
    right: -120px;
}

.member-role {
    color: #848696;
    font-weight: 500;
    font-size: 1.5rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    padding: 10px 0;
    margin-top: -15px;
}

.dots {

    display: flex;
    justify-content: center;
    gap: 10px;
    top: 85%;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #cccccc70;
    cursor: pointer;
    transition: all 0.3s ease;
}

.dot.active {
    background: white;
    transform: scale(1.2);
}


/* media query */
@media (max-width: 768px) {}
</style>
