<template>
<div  class=" flex border border-b py-4 justify-between px-4">
  <div class=" flex flex-row items-center justify-center">
    <img src="../../public/img/logo.png" alt="logo" class=" w-12">
    <span class=" ml-5">Tsingy Marrakech</span>
  </div>
    <div class=" flex items-center justify-center" >

        <div v-for="item,i in menu_list" :key="i" :title="item.label" @click="redirectTo(item.url)" :class="item.isactive==true? 'text-yellow-400':''" class=" mx-2 cursor-pointer flex  flex-col-reverse items-center">
            <img v-if="item.ico.includes('/')" :to="item.url" :src="item.ico" alt="logo" class="logo-img"/>
            <span v-else @click="router.push(item.url)" :class="item.ico " class=" text-3xl"></span>
        </div>
        <div @click="login()" class="cursor-pointer ml-4 bg-green-500 rounded-full px-3 py-1">se connecter</div>
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
    ref, onMounted
} from 'vue';
import { useRouter,useRoute  } from 'vue-router';
import { computed } from 'vue';

const router = useRouter()
const route = useRoute();

const pagesSansHeader = ['membre','document', 'modifier'];
const isSpecialPage = computed(() => {
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
        ico:'',
        isactive:false
    },
    {
        label:'Contact',
        url:'/users/membre',
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
