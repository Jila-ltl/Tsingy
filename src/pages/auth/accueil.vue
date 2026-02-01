<template>
  <div class="sm:w-[80vw] justify-center" id="container">
      <div class="pt-52">
        <p class="text-5xl font-serif text-center">Bienvenu dans notre communaute</p>
        <p class="font-serif text-xl text-center">Tsingy Marrakech vous souhaite une bonne visite!</p>
      </div>
  </div>

  <div id="app">
    <h1 class="font-sans mt-10 mb-10 text-center">Qui sommes-nous?</h1>
    <MyCarousel />
  </div>
  <h1 class="text-center font-sans mt-10 mb-10">Membre du bureau</h1>

  <div v-for="item,i in liste_membre" :key="i" class="justify-self-center flex" :class="i%2==1 ? 'flex-row-reverse': 'flex-row'">
      <div id="present" :style="{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover' }"></div>
      <div id="present" class="items-center">
        <p class="place-items-center mt-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi cumque culpa, harum quod quae ratione! Adipisci nulla dolorem laborum ducimus illum dignissimos, nam quod vitae soluta iste tempora laudantium modi.</p>
      </div>
  </div>


</template>

<script setup>
import MyCarousel from '../../components/Carousel.vue';

  const liste_membre = ref(
    [{
            image: "../../../public/img/img.jpg",
            mot: "Lorem ipsum"

        },
        {
            image: "../../../public/img/img.jpg",
            mot:"Lorem ipsum"

        },
        {
            image: "../../../public/img/img.jpg",
            mot:"Lorem ipsum"

        }
    ]
  )


</script>

  
<style scoped>
#app {
  font-family: sans-serif;
  padding: 20px;
  text-align: center;
}
#container {
    background-image: url("../../../public/img/img1.png");
    background-size: cover;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    height: 30%;
    width: 100%;

}

#present {
    height: 300px;
    width: 50%;
}


</style>
