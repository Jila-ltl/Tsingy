<template>
<div class=" h-[91vh] w-full overflow-y-auto bg-white">
  <div class="grid grid-cols-2 pt-10 pl-10 lg:grid-cols-4 mb-4 bg-[url('/img/maki.jpg')] backdrop-blur-md bg-cover bg-center">
        <div class="absolute inset-0 z-0 bg-gradient-to-br from-black/90 via-black/70 to-black/30"></div>
        <div class="lg:col-span-2 z-50 p-10 shadow-sm min-h-[500px] justify-center">
            <span class=" text-5xl text-[#00c2cb] font-bold">BIENVENU SG</span>
            <div class=" py-4 text-2xl text-white">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iusto, natus laborum est modi neque blanditiis, ducimus magni error id voluptatum facilis. Deleniti voluptatum beatae perferendis? Expedita, aperiam! Dolores, consequuntur?</p>

            </div>
            <div class=" flex flex-row gap-4 pt-10">
              <button class=" bg-white p-3 border border-solid rounded-md cursor-pointer hover:scale-105" @click="diriger('modifier')">Modifier</button>
              <button class=" bg-transparent text-white p-3 border border-collapse rounded-md cursor-pointer hover:scale-105" @click="diriger('liste')">Parcourir les listes des membres</button>
            </div>
        </div>
        <div class="relative w-80 h-96 overflow-hidden bg-gray-900 rounded-[55%_45%_30%_70%_/_70%_60%_40%_30%]">
              <img src="/img/photo.jpeg" alt="Portrait" class="absolute inset-0 w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
        </div>

  </div>


<div class="grid grid-cols-2 pl-6 pr-6 lg:grid-cols-3 gap-20 group relative pb-9">
 <div v-for="item, i in icons" :key="i">
  <div class="relative h-60 overflow-hidden rounded-2xl group cursor-pointer">
    <div class=" text-center p-5 absolute inset-0 bg-lime-900 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
      <span class="text-9xl text-white" :class="item.image "></span>
    </div>
           <div class="absolute left-40 bottom-0 text-white">
              <div class=" flex flex-row gap-1 text-center text-sm p-10">
                <img src="/img/logo.png" alt="easywp" class="logo-icon">
                <span class=" text-white text-2xl text-center"><button @click="openPopup(item.name.toLowerCase())">{{ item.name }}</button></span>
              </div>
           </div>
    </div>
</div>

</div>

<div v-if="isOpen=='annonce'" class="overlay flex-col">
    <div class=" relative bg-gray-900 border-zinc-500 p-8 w-[500px] box-shadow-lg">
        <h2 class=" text-white text-2xl font-bold mb-4">Annonce</h2 >
      <div class=" h-[60%] p-8 text-white font-sans">
      <div class="grid grid-cols-1 max-w-xl space-y-6">


      <label for="username" class="block text-sm font-bold mb-2">
        titre
      </label>
      <div class="flex rounded-md bg-[#1e293b] border border-gray-700 focus-within:border-indigo-500 transition shadow-sm">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="janesmith"
          class="block w-full border-0 bg-transparent py-2 pl-1 pr-3 text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
        >
      </div>


      <label for="about" class="block text-sm font-bold mb-2">
        Message
      </label>
      <textarea
        id="about"
        name="about"
        rows="4"
        class="block w-full rounded-md border border-gray-700 bg-[#1e293b] py-2 px-3 text-white shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      ></textarea>



      <label for="date" class="block text-sm font-bold mb-2">
        Expiratiom
      </label>
      <div class="flex rounded-md bg-[#1e293b] border border-gray-700 focus-within:border-indigo-500 transition shadow-sm">
        <input
          type="date"
          name="date"
          id="date"
          placeholder="janesmith"
          class="block w-full border-0 bg-transparent py-2 pl-1 pr-3 text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
        >

      <button
        type="submit"
        @click="isOpen=null"
        class=" rounded-md border border-transparentborder-gray-300 bg-white py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Envoyer
      </button>
      <button class="btn-close" @click="isOpen = false" aria-label="Fermer">&times;</button>
</div>
</div>
</div>
</div>
</div>


<div v-if="isOpen==='approbation'" class=" overlay ">
        <div class="  w-full h-full fixed top-0 left-0  cursor-pointer " @click="isOpen=null"></div>
            <div class=" grid grid-cols-1 bg-gray-900 text-white py-1 max-w-full w-fit rounded-lg shadow-lg border border-white z-[100]">
                <div @click="isOpen=null" class="flex w-full justify-end cursor-pointer">
                    <span class="mdi mdi-window-close"></span>
                </div>
                <h2 class=" font-bold m-2 text-center ">Nouveaux membres</h2>
                  <span class=" border-b border-white"></span>
                <div class="flex flex-col items-left w-[600px] h-[500px] overflow-y-auto">
                  <div v-for="item, i in new_members" :key="i" class=" flex flex-row p-3 justify-between border border-gray-800">
                        <div class=" flex flex-row">
                            <img :src="item.photo" alt="Avatar" class="avatar">
                            <div class=" grid grid-cols-1 p-2 gap-2">
                                <span class=" text-white text-sm"><strong>{{ item.nom }}</strong> <strong>{{ item.prenom }}</strong></span>
                              <span class=" text-gray-500">{{ item.ecole }} </span>
                            <span class=" text-sm text-gray-500">{{ item.domicile }}</span>
                            </div>
                        </div>
                        <div class=" flex flex-row gap-2 p-10">
                          <div class="hover:scale-125">
                               <span class="mdi mdi-checkbox-marked text-2xl text-lime-700"></span>
                          </div>
                          <div class="hover:scale-125">
                                <span class="mdi mdi-close-box text-2xl text-red-700 "></span>
                          </div>
                        </div>
                  </div>
              </div>
          </div>
  </div>




<div v-if="isOpen==='gestion'" class=" w-full h-full backdrop-blur-sm  fixed top-0 left-0 flex items-center justify-center z-[100]">
    <div class="  w-full h-full fixed top-0 left-0 z-10 cursor-pointer" @click="isOpen=null"></div>
    <div class=" grid grid-cols-1 bg-stone-700 p-8 text-white py-1 max-w-full rounded-lg shadow-lg border border-white z-20">
      <div @click="isOpen=null" class="flex w-full justify-end cursor-pointer">
          <span class="mdi mdi-window-close"></span>
      </div>
      <h2 class=" font-bold m-2 text-center ">Gestion des evenements</h2>
      <span class=" border-b border-white"></span>
     <div class="flex flex-col items-left p-5 w-[600px] h-[500px] overflow-y-auto " >
        <label for="username" class="block text-sm font-bold mb-2">
          titre
        </label>
        <div class="flex rounded-md bg-[#1e293b] border border-gray-700 focus-within:border-indigo-500 transition shadow-sm">
        <input
          type="text"
          name="description"
          id="username"
          placeholder="description"
          class="block w-full border-0 bg-transparent py-2 pl-1 pr-3 text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
        >
      </div>
      </div>
    </div>

</div>


<!-- Reclamation -->
<v-divider opacity=".7" thickness="3" gradient ><h1>RECLAMATION</h1></v-divider>
<div class="w-ful bg-[#0a190a] h-fit">
<div class=" grid grid-cols-2 p-3 h-fit gap-4 mb-20 m-auto w-fit pb-10 " >
<div v-for="item, i in reclamation " :key="i" class=" w-full rounded-lg cursor-pointer " :class="item.status==='envoye' ? ' bg-gray-800/30 border border-gray-800' : 'backdrop-blur-md'">
    <div class="flex flex-row p-3">
        <img :src="item.avatar" alt="Avatar" class="avatar">
        <div class=" grid grid-cols-1 p-2 gap-2">
             <span class=" text-white text-sm"><strong>{{ item.name }}</strong> </span>
            <span class=" text-slate-400">{{ item.message }} </span>
            <span class=" text-sm text-slate-400">{{ item.time }}</span>
        </div>

    </div>
    <div class="flex flex-row px-10 pl-4 pb-4 gap-2">
      <button
        type="submit"
        @click="check('receptionee', item)"
        class="rounded-md border border-transparentborder-gray-300 bg-white py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Receptioner
      </button>
      <button
        type="submit"
        @click="check('valide',item)"
        class="rounded-md border border-transparentborder-gray-300 bg-white py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Valider
      </button>
    </div>

</div>
</div>

</div>


<!-- Demande de procuration -->
<v-divider opacity=".7" thickness="3" gradient><h1>DEMANDE DE PROCURATION</h1></v-divider>
<div class=" p-3 ">
  <v-table class=" w-[80%] m-auto border border-gray-800 rounded-2xl bg-lime-900 bg-gradient-to-br from-black/90 via-black/70 to-transparent">
    <thead class="border border-gray-800 rounded-2xl bg-lime-900 bg-gradient-to-br from-black/90 via-black/70 to-transparent">
      <tr>
        <th class="text-left">Nom</th>
        <th class="text-left">Prenom</th>
        <th class="text-left">Annee scolaire</th>
        <th class="text-left">Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="border border-gray-800 rounded-2xl bg-lime-900 bg-gradient-to-br from-black/90 via-black/70 to-transparent">
      <tr :class="item.status === 'en attente'? 'bg-stone-600':''"
        v-for="item in etudiants"
        :key="item.nom"
      >
        <td >{{ item.nom }}</td>
        <td >{{ item.prenom }}</td>
        <td >{{ item.anneeScolaire }}</td>
        <td >{{ item.status }}</td>
        <td class="flex flex-row pt-3 gap-2 bg-transparent" style="background-color: transparent;">
          <span @click="procuration('recu',item)" class="mdi mdi-reload text-2xl text-[#0ea5e9]  transform hover:scale-125" ></span>
          <span @click="procuration('disponible',item)"  class="mdi mdi-check-underline text-2xl font-bold text-[#0ee969] transform hover:scale-125" ></span>
        </td>
      </tr>
    </tbody>
  </v-table>
</div>




<foot/>
</div>
</template>

<script setup>
import {
    ref
} from 'vue'
import BlobImage from '@/components/BlobImage.vue'
import {
    useRouter
} from 'vue-router'

const new_members = ref([
  {
    nom: "Dupont",
    prenom: "Jean",
    domicile: "Paris",
    ecole: "Lycée Henri IV",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"

  },
  {
    nom: "Martin",
    prenom: "Alice",
    domicile: "Lyon",
    ecole: "INSA Lyon",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    nom: "Lefebvre",
    prenom: "Thomas",
    domicile: "Lille",
    ecole: "EDHEC Business School",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    nom: "Dubois",
    prenom: "Sophie",
    domicile: "Bordeaux",
    ecole: "Sciences Po",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  },
  {
    nom: "Moreau",
    prenom: "Lucas",
    domicile: "Nantes",
    ecole: "Centrale Nantes",
    photo: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop"
  },
  {
    nom: "Lambert",
    prenom: "Emma",
    domicile: "Marseille",
    ecole: "Kedge Business School",
    photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop"
  },
  {
    nom: "Rousseau",
    prenom: "Hugo",
    domicile: "Toulouse",
    ecole: "ENAC",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop"
  },
  {
    nom: "Girard",
    prenom: "Chloé",
    domicile: "Strasbourg",
    ecole: "Université de Strasbourg",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop"
  },
  {
    nom: "Mercier",
    prenom: "Antoine",
    domicile: "Rennes",
    ecole: "Rennes School of Business",
    photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop"
  },
  {
    nom: "Petit",
    prenom: "Léa",
    domicile: "Montpellier",
    ecole: "Montpellier Business School",
    photo: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=150&h=150&fit=crop"
  }
]);

const etudiants = ref([
  { nom: "Dupont", prenom: "Jean", anneeScolaire: "2025-2026", status: "en attente" },
  { nom: "Martin", prenom: "Alice", anneeScolaire: "2024-2025", status: "en attente" },
  { nom: "Lefebvre", prenom: "Thomas", anneeScolaire: "2025-2026", status: "en attente" },
  { nom: "Dubois", prenom: "Sophie", anneeScolaire: "2023-2024", status: "en attente" },
  { nom: "Moreau", prenom: "Lucas", anneeScolaire: "2025-2026", status: "en attente" },
  { nom: "Lambert", prenom: "Emma", anneeScolaire: "2024-2025", status: "en attente" },
  { nom: "Rousseau", prenom: "Hugo", anneeScolaire: "2025-2026", status: "en attente" },
  { nom: "Girard", prenom: "Chloé", anneeScolaire: "2023-2024", status: "en attente" },
  { nom: "Mercier", prenom: "Antoine", anneeScolaire: "2024-2025", status: "en attente" },
  { nom: "Petit", prenom: "Léa", anneeScolaire: "2025-2026", status: "en attente" }
]);
 const procuration = (message, item) => {
    etudiants.value.forEach(element => {
      if(element === item) {
        element.status = message;
      }
    });
}

const check = (message, item) => {
    reclamation.value.forEach(element => {
      if(element === item) {
        element.status = message;
      }
    });
}

const reclamation = ref([
    {
        name: 'Thomas Lemaitre',
        message: 'L’interface de paiement semble bloquée sur mobile après la validation.',
        time: '5 minutes ago',
        status: 'receptionnee',
        avatar: 'https://i.pravatar.cc/150?u=thomas'
    },
    {
        name: 'Julie Vallet',
        message: 'Je souhaiterais modifier mon adresse de livraison pour la commande #994.',
        time: '12 minutes ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=julie'
    },
    {
        name: 'Marc-Antoine Petit',
        message: 'Merci pour la réactivité de votre support, mon problème est résolu !',
        time: '25 minutes ago',
        status: 'regle',
        avatar: 'https://i.pravatar.cc/150?u=marc'
    },
    {
        name: 'Sophie Fontenelle',
        message: 'Le code promotionnel "BIENVENUE10" ne semble pas s’appliquer à mon panier.',
        time: '45 minutes ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=sophie'
    },
    {
        name: 'Karim Mansour',
        message: 'Est-il possible d’avoir un suivi plus précis sur l’expédition internationale ?',
        time: '1 hour ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=karim'
    },
    {
        name: 'Emma Watson',
        message: 'Je n’ai toujours pas reçu mon email de confirmation après 24 heures.',
        time: '2 hours ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=emma'
    },
    {
        name: 'Lucas Dupont',
        message: 'Une erreur 500 s’affiche lorsque j’essaie d’accéder à mes factures.',
        time: '3 hours ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=lucas'
    },
    {
        name: 'Sarah Jenkins',
        message: 'Serait-il possible de renouveler mon abonnement par virement bancaire ?',
        time: '5 hours ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=sarah'
    }
])

const icons = ref([{
    name: 'Annonce',
    color: 'bg-blue',
    image: 'mdi mdi-bullhorn'
},
{
    name: 'Approbation',
    color: 'bg-green',
    image: 'mdi mdi-check-decagram'
},
{
    name: 'Gestion',
    color: 'bg-yellow',
    image: 'mdi mdi-calendar-month'
}
])


const isOpen = ref(null)
const popupContent = ref(['approbation', 'annonce']) // Pour stocker le texte dynamique

const openPopup = (message) => {
    isOpen.value = message // On ouvre le popup
}
const router = useRouter()
const consulter = () => {
    router.push('liste_membre')

}
const diriger
  = (message) => {
    if(message=='liste'){
      router.push('liste_membre')
    }
    else{
      router.push('../users/evenement')
    }

  }

</script>

<style scoped>


.avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    /* Image ronde */
    margin-right: 12px;
}


.logo-icon {
    width: 30px;
    height: 30px;
}




/* 1. L'arrière-plan (Overlay) */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    /* Noir semi-transparent */
    backdrop-filter: blur(4px);
    /* Effet de flou derrière (très moderne) */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* Toujours au-dessus de tout */
}

/* 2. La boîte du Popup */


/* 3. Les textes */
.popup h2 {
    margin-top: 0;
    color: #333;
    font-family: sans-serif;
}

.popup p {
    color: #666;
    line-height: 1.5;
}

.btn-close {
    /* Positionnement absolu dans le coin */
    position: absolute;
    top: 8px;
    /* Distance du bord haut */
    right: 12px;
    /* Distance du bord droit */

    /* Style de la croix */
    background: transparent;
    border: none;
    font-size: 24px;
    /* Taille de la croix */
    font-weight: bold;
    cursor: pointer;
    color: #888;
    line-height: 1;
    transition: color 0.2s;
}

.btn-close:hover {
    color: #000;
    /* Devient plus sombre au survol */
}

/* Animation d'entrée et de sortie */
.fade-pop-enter-active,
.fade-pop-leave-active {
    transition: all 0.3s ease;
}

.fade-pop-enter-from,
.fade-pop-leave-to {
    opacity: 0;
    transform: scale(0.9);
    /* Démarre un peu plus petit */
}

.bouton {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ff4757;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s ease;
}

.bouton:hover {
    transform: scale(1.05);
    /* Petit effet de zoom au survol */
    background-color: #ff6b81;
}
</style>
