<template>
<div id="bg_img" class="  w-full flex flex-row justify-center items-center h-full">
    <div class="flex flex-row sm:w-[80vw]" id="container">
        <div class="  sm:w-[50%] pa-12 border-x-2">
            <div class=" mb-10 ml-48">
                <span class="text-white text-3xl font-bold">Login</span>
            </div>
            <v-text-field v-for="item,i in user_form" :key="i" :label="item.title" v-model="item.field" variant="outlined" :prepend-inner-icon="item.icon"></v-text-field>

            <div class="flex flex-col">
                <v-btn :loading="loading" class="flex-grow-1" height="48" variant="tonal" @click="load()">
                    Se Connecter
                </v-btn>
                    
            </div>
        </div>
        <div class="flex flex-col justify-center sm:px-24 sm:w-[50%]" >
        <div class="justify-end ml-32">
            <v-icon size="100">mdi-account-circle</v-icon>
        </div>
        <div class="justify-center">
            <span class=" text-400 text-3xl font-bold ml-10">Pas encore membre?</span>
        </div>
        <div class=" flex-col justify-center">
            <span class=" text-400 text-3l ml-10">Inscrivez-vous sur notre espace membre</span>
        </div>
        <div>
            <v-btn :loading="loading" class="flex-grow-1 ml-32" height="48" variant="tonal" @click="inscription_rout()">
            S'inscrire
            </v-btn>
        </div>
    </div>
</div>
        
</div>
</template>

<script setup>


import {
    ref,
} from 'vue'

import { useRouter } from 'vue-router'



const router = useRouter()
const user_form = ref(
    [{
            field: "",
            title: "Email adress",
            type: "email",
            icon: "mdi-email"

        },
        {
            field: "",
            title: "Password",
            type: "password",
            icon: "mdi-lock"

        }
    ]
)

const loading = ref(false)
const load = () => {
    loading.value = true
    setTimeout(() => (loading.value = false), 3000)
    setTimeout(() => (
    router.push('/users/membre')), 3200)
}
const inscription_rout = () => {
  router.push('signup')

}
</script>

<style scoped>
#bg_img {
    background-image: url("../../../public/img/img1.png");
    background-size: cover;
}

#container {
    box-shadow: 0px 2px 10px 1px rgba(71,71 ,71, 0.52);
    background-image: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    height: 60%;
    width: 60%;
    border-radius: 20px;
}


</style>
