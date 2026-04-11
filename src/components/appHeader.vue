<template>
  <div class=" flex border border-b py-4 justify-between px-4">
    <div class=" flex flex-row items-center justify-center">
      <img alt="logo" class=" w-12" src="../../public/img/logo.png">
      <span class=" ml-5">Tsingy Marrakech</span>
    </div>
    <div class=" flex items-center justify-center">

      <div
        v-for="item,i in menu_list"
        :key="i"
        class=" mx-4 cursor-pointer flex  flex-col-reverse items-center"
        :class="isRouteActive(item.url) ? 'text-green-500' : ''"
        :title="item.label"
        @click="redirectTo(item.url)"
      >
        <img
          v-if="item.ico.includes('/')"
          alt="logo"
          class="logo-img"
          :src="item.ico"
          :to="item.url"
        >
        <span v-else class=" text-3xl" :class="item.ico " @click="router.push(item.url)" />
      </div>
      <div class="cursor-pointer ml-10 bg-green-500 rounded-full px-3 py-1" @click="login()">se connecter</div>
    </div>
  </div>

<!-- <div   class="flex border border-b py-4 justify-center" id="membre">
    <div class=" flex ">
        <span class="text-3xl ">Tsingy</span>
        <img src="../../public/img/logo.png" alt="logo" class="logo-img"/>
        <span class="text-3xl">Marrakech</span>
    </div>
</div> -->
</template>

<script setup>
  import {
    ref,
  } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  const menu_list = ref([
    {
      label: 'Accueil',
      url: '/',
      ico: 'mdi mdi-home',
    },
    {
      label: 'Blog',
      url: '/bureau/accueil',
      ico: 'mdi mdi-ticket-account',
    },
    {
      label: 'Contact',
      url: '/users/membre',
      ico: 'mdi mdi-account-group',
    },

  ])

  function isRouteActive (url) {
    return route.path === url
  }

  function redirectTo (item) {
    router.push(item)
  }

  function login () {
    router.push('/auth/signin')
  }

</script>

<style>
.router-link-active {
  color: #22c55e;
}

.router-link-exact-active {
  font-weight: bold;
}
.logo-img{
    height: 45px;            /* Le logo est souvent un peu plus grand que les icônes */
    width: auto;
}

#membre{
    margin-left: 206px;
}

</style>
