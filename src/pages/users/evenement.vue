<template>
<div class=" h-full flex flex-row">
    <!-- Navigation menu -->
    <div class=" w-[30%] h-full bg-stone-900">
        <span class=" font-bold text-green-500 ml-11 uppercase mt-4">List Events</span>
      <div class="mt-10  ">
              <div @click="changeStatus(item)" :class="item.isSelect?' bg-stone-800':''" class="my-1 px-8 py-2 cursor-pointer hover:bg-stone-700" v-for="item, i in events" :key="i">
            <span v-if=" item.isSelect" class=" text-green-500">{{ item.name }}</span>
            <span v-else class=" ">{{ item.name }}</span>

        </div>
      </div>
    </div>
    <!-- Container SPA -->
    <div class="w-[70%] h-full bg-stone-400">
      <div v-if="selectedEvent">
        <div class=" grid grid-cols-3 gap-4 p-4">
          <div class="" v-for=" item , i in selectedEvent.imageData " :key="i">
          <img :src="item.url" alt="Event Image" @click="selecteItem(item)">
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDialog.show" class=" absolute top-0 left-0 w-full h-full bg-black">
      <img src="" alt="">
    </div>
</div>
</template>

<script setup>
import {
    ref
} from 'vue'
const selectedEvent = ref(null);
const showDialog = ref({show:false,image:''});

function selecteItem(item) {
  console.log('Selected item:', item)
    showDialog.value = true;
}
function changeStatus(item) {
    events.value.forEach(i => {
        i.isSelect = false
    })
    selectedEvent.value = item
    item.isSelect = true
}

const events = ref([{
        name: 'Assemblé.G',
        id: 1,
        date: '2024-06-01',
        isSelect:true,
        description: 'Réunion générale annuelle avec présentation des résultats et discussions stratégiques.',
        imageData: Array.from({
            length: 25
        }, (_, i) => ({
            name: `image${i + 1}.jpg`,
            type: 'image/jpeg',
            url: `https://picsum.photos/id/${i + 1}/300/200`
        }))
    },
    {
        name: 'Conférence Tech',
        id: 2,
        date: '2024-07-15',
        isSelect:false,
        description: 'Conférence dédiée aux nouvelles technologies, innovation et intelligence artificielle.',
        imageData: Array.from({
            length: 25
        }, (_, i) => ({
            name: `image${i + 26}.jpg`,
            type: 'image/jpeg',
            url: `https://picsum.photos/id/${i + 26}/300/200`
        }))
    },
    {
        name: 'Workshop Design',
        id: 3,
        date: '2024-08-10',
        isSelect:false,
        description: 'Atelier pratique sur le design UI/UX avec exercices et cas concrets.',
        imageData: Array.from({
            length: 25
        }, (_, i) => ({
            name: `image${i + 51}.jpg`,
            type: 'image/jpeg',
            url: `https://picsum.photos/id/${i + 51}/300/200`
        }))
    },
    {
        name: 'Séminaire Marketing',
        id: 4,
        date: '2024-09-05',
        isSelect:false,
        description: 'Séminaire sur les stratégies marketing digitales et la croissance des entreprises.',
        imageData: Array.from({
            length: 25
        }, (_, i) => ({
            name: `image${i + 76}.jpg`,
            type: 'image/jpeg',
            url: `https://picsum.photos/id/${i + 76}/300/200`
        }))
    },
    {
        name: 'Hackathon Dev',
        id: 5,
        date: '2024-10-20',
        isSelect:false,
        description: 'Compétition de développement où les participants créent des projets innovants en équipe.',
        imageData: Array.from({
            length: 25
        }, (_, i) => ({
            name: `image${i + 101}.jpg`,
            type: 'image/jpeg',
            url: `https://picsum.photos/id/${i + 101}/300/200`
        }))
    }
])
</script>

<style scoped>

</style>
