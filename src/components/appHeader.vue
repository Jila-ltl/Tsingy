<template>
<div v-if="!isSpecialPage" class=" flex border border-b px-6 py-4 justify-between ">
    <span class="mt-4">Tsingy Marrakech</span>
    <div class=" flex ">
        <div v-for="item,i in menu_list" :key="i" :title="item.label" @click="redirectTo(item.url)" :class="item.isactive==true? 'text-yellow-400':''" class="mx-5 cursor-pointer flex  flex-col-reverse items-center">
            <img v-if="item.ico.includes('/')" :to="item.url" :src="item.ico" alt="logo" class="logo-img"/>
            <span v-else @click="router.push(item.url)" :class="item.ico " class=" text-3xl"></span>
        </div>
        
    </div>
    <div class=" ml-6 mt-4 flex flex-row uppercase" >
        <div @click="login()" class="cursor-pointer">se connecter</div>
    </div>  
</div> 

<div v-else class="flex border border-b px-6 py-4 justify-center" id="membre">
    <div class=" flex ">
        <span class="text-3xl ">Tsingy</span>
        <img src="../../public/img/logo.png" alt="logo" class="logo-img"/>
        <span class="text-3xl">Marrakech</span>
    </div>
</div>
</template>

<script setup>  
import {
    ref, onMounted
} from 'vue';
import { useRouter,useRoute  } from 'vue-router';
import { computed } from 'vue';

const router = useRouter()
const route = useRoute();

const pagesSansHeader = ['membre','document', 'modifier'];
const isSpecialPage = computed(() => {
  // On vérifie si l'URL actuelle contient l'un des mots de notre liste
  return pagesSansHeader.some(page => route.path.includes(page));
});

const menu_list = ref([
    {
        label:'Accueil',
        url:'/auth/accueil',
        ico:'mdi mdi-home-account',
        isactive:false
    },
    {
        label:'Blog',
        url:'#',
        ico:'../../public/img/logo.png',
        isactive:false
    },
    {
        label:'Contact',
        url:'/users/contact',
        ico:'mdi mdi-account-group',
        isactive:false
    } 
])

const redirectTo= (item)=>{
    // alert(item)
    router.push(item)

    menu_list.value.forEach(element => {
        element.isactive=false
    }); 
    item.isactive=true

     
}

function logout() {
   router.push('/auth/accueil')
}

function login() {
   router.push('/auth/signin')
}
 

</script>

<style >
.router-link-active {
  color: red; 
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
