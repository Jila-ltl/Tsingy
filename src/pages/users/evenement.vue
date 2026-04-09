<template>
<div class=" h-full flex flex-row">
    <!-- Navigation menu -->
    <div class=" w-[20%] h-full bg-lime-900 bg-gradient-to-t from-black/80 via-black/20 to-transparent pt-4">
         <span class=" font-bold text-white uppercase p-10">List Events</span>
      <div class="mt-10  ">
        <div @click="changeStatus(item)" :class="item.isSelect?' bg-stone-800':''" class="my-1 px-8 py-2 cursor-pointer hover:bg-stone-700" v-for="item, i in events" :key="i">
            <span v-if=" item.isSelect" class=" text-green-500">{{ item.name }}</span>
            <span v-else class=" ">{{ item.name }}</span>

        </div>
      </div>
    </div>
    <!-- Container SPA -->
    <div class="w-[80%] max-h-[91vh] bg-white  overflow-y-auto">
      <div v-if="selectedEvent">
        <div class=" columns-1 md:columns-2 p-2 lg:columns-4 gap-3 space-y-2">
          <div class="" v-for=" item , i in selectedEvent.imageData " :key="i">
          <img :src="item.url" class="w-full rounded" alt="Event Image" @click="selecteItem(i,selectedEvent)">
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDialog.show" class=" absolute z-50 top-0 left-0 w-full h-[100vh] flex items-center justify-center backdrop-blur-md" style=" background: #00000077;">
      <div class="relative group">
            <button @click="prevImage" class="absolute left-2 z-10 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <img :src="showDialog.image[showDialog.index].url" alt="" class="w-[80vw] h-[80vh] object-contain border border-white rounded-2xl bg-black">
            <button @click="showDialog.show = false" class="absolute -top-0 -right-0 z-20 text-white text-2xl">✕</button>

            <button @click="nextImage" class="absolute right-4 z-10 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
      </div>
    </div>
</div>
</template>

<script setup>
import {
    ref
} from 'vue'
const selectedEvent = ref(null);
const showDialog = ref({ show: false, index:0, image:[]});

function selecteItem(index,item) {
  console.log('Selected item:', item)
    showDialog.value.show = true;
    showDialog.value.index = index;

    showDialog.value.image = item.imageData;
}
function changeStatus(item) {
    events.value.forEach(i => {
        i.isSelect = false
    })
    selectedEvent.value = item
    item.isSelect = true
}

const nextImage = () => {
  if (showDialog.value.index < showDialog.value.image.length - 1) {
    showDialog.value.index++;
  } else {
    showDialog.value.index = 0; // Revenir à la première image
  }
};

const prevImage = () => {
  if (showDialog.value.index > 0) {
    showDialog.value.index--;
  } else {
    showDialog.value.index = showDialog.value.image.length - 1; // Aller à la dernière image
  }
};

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
