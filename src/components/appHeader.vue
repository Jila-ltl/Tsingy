<template>
<div class=" flex border border-b px-6 py-4 justify-between ">
    <span>logo</span>
    <div class=" flex   ">
        <div v-for="item,i in menu_list" :key="i" :title="item.label" @click="redirectTo(item)" :class="item.isactive==true? 'text-yellow-400':''" class="mx-5 cursor-pointer flex  flex-col-reverse items-center">
            <!-- <span :class="item.ico" class=" text-3xl" v-if="item.url=="></span> -->
            <span :class="item.ico " class=" text-3xl"  ></span>
        </div>
        <div class=" ml-6 uppercase" @click="test()">
            logout
        </div> 
    </div>
</div>
</template>

<script setup>  
import {
    ref, onMounted
} from 'vue';
import { useRouter } from 'vue-router';

const route=useRouter()

const menu_list = ref([
    {
        label:'Docs',
        url:'/users/Docs',
        ico:'mdi mdi-book-account',
        isactive:false
    },
    {
        label:'Blog',
        url:'/users/Blog',
        ico:'mdi mdi-home-account',
        isactive:false
    },
    {
        label:'Showcase',
        url:'',
        ico:'mdi mdi-calendar',
        isactive:false
    },
    {
        label:'sponsor',
        url:'',
        ico:'mdi mdi-account-group',
        isactive:false
    } 
])

const redirectTo= (item)=>{
    // alert(item)
    route.push(item)

    menu_list.value.forEach(element => {
        element.isactive=false
    }); 
    item.isactive=true

     
}

function test() {
   route.push('/auth/signin')

}
 

</script>

<style >
.router-link-active {
  color: red; 
}

.router-link-exact-active {
  font-weight: bold;
}

</style>
