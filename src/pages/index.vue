<template>
<div class="flex items-center bg-gray-200 h-12 overflow-hidden">

  <!-- Bloc NEWS -->
  <div class="bg-red-600 text-white px-6 h-full flex items-center font-bold">
    NEWS
  </div>

  <!-- Texte défilant -->
  <div class="flex-1 overflow-hidden">

    <div class="whitespace-nowrap animate-marquee flex items-center h-full text-black">

      <span
        v-for="item in annoncesValides"
        :key="item.id"
        @click="goToAnnonce(item.id)"
        class="mx-10 cursor-pointer flex items-center gap-4"
      >

        <!-- point rouge -->
        <span class="text-red-500 text-lg">●</span>

        <!-- type -->
        <span class="bg-gray-700 text-white px-2 py-1 rounded text-sm">
          {{ item.type }}
        </span>

        <!-- date -->
        <span class="text-gray-700">
          {{ item.date }}
        </span>

        <!-- titre -->
        <span>
          {{ item.titre }}
        </span>

      </span>

    </div>

  </div>

</div>

  <section class="py-20 bg-gray-50">

  <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    <!-- Images -->
      <div class="relative w-full h-[350px]">

    <!-- Image principale -->
      <img
        src="/img/baobab.jpg"
        class="w-full h-full object-cover rounded-2xl shadow-md"
      />

    <!-- Image secondaire -->
      <img
        src="/img/marrakech.jpg"
        class="absolute bottom-[-30px] right-[-20px] w-2/3 h-[200px] object-cover rounded-xl shadow-lg border-4 border-white"
      />
  </div>

    <!-- Card texte -->
      <div class="bg-white p-10 rounded-2xl shadow-lg">

        <h2 class="text-2xl font-semibold text-gray-900 mb-2">
          Qui sommes-nous ? des winners
        </h2>

        <p class="text-gray-600 leading-relaxed">
          Tsingy Marrakech est une association qui regroupe les ressortissants
          malgaches résidant à Marrakech. Nous sommes là afin de faciliter
          l’intégration de chacun à la société.
        </p>

        <p class="text-gray-600 mt-4">
          Nous mettons en valeur notre culture à travers plusieurs activités,
          réunions amicales et actions solidaires dans les domaines éducatif,
          professionnel et personnel.
        </p>

        <p class="mt-6 font-medium text-gray-800">
          Bienvenue à vous !
        </p>

      </div>

    </div>

  </section>

  <section id="mot_sg" class="bg-white py-16">

    <div class="max-w-5xl mx-auto flex items-center gap-10">

        <!-- Image -->
      <div class="w-1/3">
        <img
          src="/img/waren.jpeg"
          class="rounded-xl shadow-md object-cover w-full h-[250px]"
        />
      </div>

      <!-- Texte -->
      <div class="w-2/3">

        <h2 class="text-2xl font-semibold text-gray-900 mb-4">
          Mot de la Secrétaire Générale
        </h2>

        <p class="text-gray-600 leading-relaxed">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias odit qui illum quisquam voluptates
          cum eum eaque? Minus eius molestias beatae tenetur sequi non facilis a voluptatum illo, quaerat consectetur!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio laudantium corporis ullam provident totam
          voluptatum corupti neque ipsam voluptatibus eligendi quidem magnam dignissimos laboriosam cupiditate, officiis aut odit odio et!
        </p>

        <p class="text-gray-600 mt-4">
          Nous espérons que vous trouverez ici un espace d’échange,
          de solidarité et de partage.
        </p>

      </div>

    </div>

  </section>
  <section id="pres_bureau" class="bg-gray-100 pb-16 h-screen">
    <div class="w-full bg-green-900 py-6 text-center mb-12">
      <h1 class="text-white text-3xl font-semibold">
        Les membres du bureau
      </h1>
    </div>



  </section>
  <section id="espace_membre" class="py-20 text-center bg-gray-50">
    <div class="max-w-5xl mx-auto">

      <h1 class="text-3xl font-sans mb-12 text-gray-900 text-center">
        Espace membre
      </h1>

    <div class="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-lg">

    <!-- Bloc inscription -->
    <div class="bg-white p-10 text-center flex flex-col justify-center">

      <p class="text-lg text-gray-700 mb-2">
        Vous êtes malgache à Marrakech ?
      </p>

      <p class="text-gray-500 mb-6">
        Rejoignez notre communauté en vous inscrivant
      </p>

      <button
        class="bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-900 transition mx-auto"
        @click="inscription_rout()"
      >
        Inscription
      </button>

    </div>

    <!-- Bloc modification -->
    <div class="bg-gray-200 p-10 text-center flex flex-col justify-center">

      <p class="text-gray-600 mb-6">
        Si vous êtes déjà membre et souhaitez modifier vos coordonnées
      </p>

      <button
        class="bg-red-700 text-white px-8 py-3 rounded-xl hover:bg-red-800 transition mx-auto"
        @click="login()"
      >
        Se connecter
      </button>

    </div>

  </div>

</div>
</section>

  <section id="contact" class="mt-20 bg-gray text-white py-16 px-10 text-align-center">

    <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

      <!-- Colonne 1 -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">
          Tsingy Marrakech
        </h2>

        <p class="text-gray-400">
          Tongasoa à Marrakech !
        </p>
      </div>

      <!-- Colonne 2 -->
      <div>
        <h2 class="text-2xl font-semibold text-green-900 mb-4">
          Contact
        </h2>

        <p class="text-gray-400">Téléphone : +212 XXX XXX XXX</p>
        <p class="text-gray-400">Email : contact@tsingy.ma</p>
        <p class="text-gray-400">Marrakech, Maroc</p>
      </div>

      <!-- Colonne 3 -->
       <div>
          <h2 class="text-2xl font-semibold text-green-900 mb-4">
          Réseaux sociaux
          </h2>

          <div class="flex gap-6 text-2xl">

            <a href="https://www.facebook.com/share/1ARtb33t9U/"
              target="_blank"
              class="hover:text-blue-500 transition">
              <i class="mdi mdi-facebook"></i>
            </a>

            <a href="https://www.instagram.com/tsingymarrakech?igsh=MnBoZHp6NDBtcHU2"
              target="_blank"
              class="hover:text-pink-500 transition">
              <i class="mdi mdi-instagram"></i>
            </a>
          </div>

        </div>

  </div>

  <!-- Ligne bas -->
  <div class="text-center text-gray-500 mt-12 text-sm">
    © 2026 Tsingy Marrakech — Tous droits réservés
  </div>

</section>


</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { annoncesValides } from '@/data/annonces'
  import 'swiper/css'
import 'swiper/css/navigation'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
  const route = useRoute()

 function login () {
    router.push('/auth/signin')
 }

  function inscription_rout () {
    router.push('/auth/signup')
  }
  const liste_membre = ref(
    [{
       image: '../../../public/img/img.jpg',
       mot: 'Lorem ipsum',

     },
     {
       image: '../../../public/img/img.jpg',
       mot: 'Lorem ipsum',

     },
     {
       image: '../../../public/img/img.jpg',
       mot: 'Lorem ipsum',

     },
    ],
  )

  const translateX = ref(0)

let interval = null

onMounted(() => {
  interval = setInterval(() => {
    translateX.value -= 0.2

    if (translateX.value < -100) {
      translateX.value = 100
    }
  }, 20)
})

onUnmounted(() => {
  clearInterval(interval)
})

const next = () => {
  translateX.value -= 20
}

const prev = () => {
  translateX.value += 20
}


const goToAnnonce = (id) => {
  router.push(`/users/annonces#${id}`)
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
#app {
  font-family: serif;
  padding: 20px;
  text-align: center;
}
#container {
    background-image: url("../../../public/img/quisn2.png");
    background-size: center;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    height: 30%;
    width: 100%;

}

#present {
    height: 300px;
    width: 50%;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 12s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
