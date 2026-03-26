<template>
  <div class="h-full w-full flex items-center justify-center">
    Chargement ...
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import {
    ref,
} from 'vue'


const router = useRouter()
  //
  onMounted(() => {
    router.replace('/bureau/accueil')
  })
</script>
