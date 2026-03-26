<template>
    <div class="blob-wrapper">
        <div class="blob-bg"></div>
    
        <div class="blob-main">
            <img :src="imageSrc" alt="Illustration" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const imageSrc= ref('/img/photo.jpeg')
defineProps({
  src: {
    type: String,
    required: true
  }
})


</script>

<style scoped>
.blob-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.blob-main {
  position: relative;
  z-index: 2;
  width: 450px; /* Taille à ajuster */
  aspect-ratio: 1 / 1;
  -webkit-mask-image: url('@/assets/mask-blob.svg');
  mask-image: url('@/assets/mask-blob.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3)); /* Ombre plus forte sur fond noir */
}

.blob-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blob-bg {
  position: absolute;
  z-index: 1;
  width: 450px;
  aspect-ratio: 1 / 1;
  background-color: #333; /* Un gris sombre pour ton thème dark */
  top: 30px;
  left: -20px;
  -webkit-mask-image: url('@/assets/mask-blob.svg');
  mask-image: url('@/assets/mask-blob.svg');
  mask-size: contain;
  opacity: 0.5;
}


</style>