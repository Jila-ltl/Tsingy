<template>
<div class="parallax-hero w-full bg-white">
    <div class=" flex flex-row h-[90vh] items-center justify-center backdrop-blur-md bg-cover bg-center">
        <div class="absolute inset-0 z-0 bg-gradient-to-br from-white/90 via-white/70 to-white/30" />
        <div class="lg:col-span-2 z-50 p-10 shadow-sm  w-[750px] justify-center">
            <span class=" text-5xl text-red-500 font-bold">BIENVENU SG</span>
            <div class=" py-4 text-2xl text-black">
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iusto, natus laborum est modi neque blanditiis, ducimus magni error id voluptatum facilis. Deleniti voluptatum beatae perferendis? Expedita, aperiam! Dolores, consequuntur?</span>

            </div>
            <div class=" flex flex-row gap-4 pt-10">
                <button class=" text-white font-bold bg-green-500 p-3 border border-solid rounded-md cursor-pointer hover:scale-105" @click="diriger()">Parcourir les listes des membresr</button>
            </div>
        </div>
        <div class="relative w-80 h-96 overflow-hidden bg-gray-900 rounded-[55%_45%_30%_70%_/_70%_60%_40%_30%]">
            <img alt="Portrait" class="absolute inset-0 w-full h-full object-cover" src="/img/photo.jpeg">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40" />
        </div>

    </div>

    <div class=" flex flex-row h-[90vh] items-center justify-center">
        <div v-for="item, i in icons" :key="i" @click="openPopup(item.name.toLowerCase())" class="icon-card mx-32 rounded-xl w-[350px] items-center justify-center flex flex-col " style=" border: 4px white solid; background: #FFFFFF55;">
            <div class=" text-center">
                <span class="text-9xl text-white" :class="item.image " />
            </div>
            <div class=" left-40 bottom-0 text-white">
                <div class="  flex flex-row gap-1 text-center text-sm p-10">
                    <span class="uppercase font-bold text-white text-2xl text-center">
                        {{ item.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div v-if="isOpen=='annonce'" class="overlay approbation-overlay">
     <div class="w-full h-full fixed top-0 left-0 cursor-pointer" @click="isOpen=null" />
      <div class="approbation-modal z-[100]">
        <div class="flex items-start justify-between gap-4 border-b border-green-100 px-6 py-5">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-green-700">
              ANNONCE
            </p>
            <h2 class="mt-2 text-3xl font-bold text-black">
              Ajouter une nouvelle annonce
            </h2>
            <p class="mt-2 text-sm text-gray-500">
              Verifiez les informations de chaque profil avant approbation.
            </p>
          </div>

          <button class="approbation-close" @click="isOpen=null">
            <span class="mdi mdi-window-close" />
          </button>
        </div>
        <div class="grid grid-cols-1 gap-4 max-w-xl p-8">
            <div >
               <label class="member-label" for="username">
                  titre
                </label>
                <Input_ id="username"  name="username" placeholder="janesmith" type="text"/>
            </div>
              <div>
                <label class="member-label" for="about">
                  Message
                </label>
                <textarea id="about" class="member-input min-h-[160px]" name="about" rows="4" />
              </div>

            <div >
               <label class="member-label" for="date">
                Expiratiom
              </label>
              <Input_
                id="date"
                name="date"
                placeholder="janesmith"
                type="date"
              />
            </div>
            <button
                class=" rounded-md border border-transparentborder-gray-300 bg-white py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
                @click="isOpen=null"
              >
                Envoyer
              </button>
        </div>
      </div>
    </div>

    <div v-if="isOpen==='approbation'" class="overlay approbation-overlay">
      <div class="w-full h-full fixed top-0 left-0 cursor-pointer" @click="isOpen=null" />
      <div class="approbation-modal z-[100]">
        <div class="flex items-start justify-between gap-4 border-b border-green-100 px-6 py-5">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-green-700">
              Validation
            </p>
            <h2 class="mt-2 text-3xl font-bold text-black">
              Nouveaux membres
            </h2>
            <p class="mt-2 text-sm text-gray-500">
              Verifiez les informations de chaque profil avant approbation.
            </p>
          </div>

          <button class="approbation-close" @click="isOpen=null">
            <span class="mdi mdi-window-close" />
          </button>
        </div>

        <div class="approbation-scroll px-6 py-5">
          <div
            v-for="item, i in new_members"
            :key="i"
            class="approbation-item"
          >
            <div class="flex items-center gap-4">
              <img alt="Avatar" class="approbation-avatar" :src="item.photo">

              <div class="grid gap-2">
                <p class="text-lg font-bold text-black">
                  {{ item.prenom }} {{ item.nom }}
                </p>
                <p class="text-sm uppercase tracking-[0.25em] text-green-700">
                  {{ item.ecole }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ item.domicile }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button class="approbation-action approbation-action--approve">
                <span class="mdi mdi-checkbox-marked text-2xl" />
              </button>
              <button class="approbation-action approbation-action--reject">
                <span class="mdi mdi-close-box text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isOpen==='gestion'" class=" w-full h-full backdrop-blur-sm  fixed top-0 left-0 flex items-center justify-center z-[100]">
      <div class="  w-full h-full fixed top-0 left-0 z-10 cursor-pointer" @click="isOpen=null" />
      <div class=" grid grid-cols-1 bg-stone-700 p-8 text-white py-1 max-w-full rounded-lg shadow-lg border border-white z-20">
        <div class="flex w-full justify-end cursor-pointer" @click="isOpen=null">
          <span class="mdi mdi-window-close" />
        </div>
        <h2 class=" font-bold m-2 text-center ">Gestion des evenements</h2>
        <span class=" border-b border-white" />
        <div class="flex flex-col items-left p-5 w-[600px] h-[500px] overflow-y-auto ">
          <label class="block text-sm font-bold mb-2" for="username">
            titre
          </label>
          <div class="flex rounded-md bg-[#1e293b] border border-gray-700 focus-within:border-indigo-500 transition shadow-sm">
            <input
              id="username"
              class="block w-full border-0 bg-transparent py-2 pl-1 pr-3 text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
              name="description"
              placeholder="description"
              type="text"
            >
          </div>
        </div>
      </div>

    </div>

    <!-- Reclamation -->ù
    <div class=" bg-[#0a190a7f] h-[90vh]">
      <div class="flex justify-center items-center pt-10"  gradient opacity=".7" thickness="3">
        <span class="h-[10px] w-[200px] mr-3 bg-gradient-to-l from-green-500 to-transparent"></span>
        <h1 class="text-green-500">RECLAMATION</h1>
        <span class="h-[10px] w-[200px] ml-3 bg-gradient-to-r  from-green-500 to-transparent "></span>
      </div>
      <div class="w-ful h-fit">
        <div class=" grid grid-cols-2 p-3 h-fit gap-4 mb-20 m-auto w-fit pb-10 ">
          <div v-for="item, i in reclamation " :key="i" class=" w-full rounded-lg cursor-pointer " :class="item.status==='envoye' ? ' bg-gray-800/30 border border-gray-800' : 'backdrop-blur-md'">
            <div class="flex flex-row p-3">
              <img alt="Avatar" class="avatar" :src="item.avatar">
              <div class=" grid grid-cols-1 p-2 gap-2">
                <span class=" text-white text-sm"><strong>{{ item.name }}</strong> </span>
                <span class=" text-slate-400">{{ item.message }} </span>
                <span class=" text-sm text-slate-400">{{ item.time }}</span>
              </div>

            </div>
            <div class="flex flex-row px-10 pl-4 pb-4 gap-2">
              <button
                class="rounded-md border border-transparentborder-gray-300 bg-white py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
                @click="check('receptionee', item)"
              >
                Receptioner
              </button>
              <button
                class="rounded-md border border-transparentborder-gray-300 bg-white py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
                @click="check('valide',item)"
              >
                Valider
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
    <!-- Demande de procuration -->

    <div class=" ">
         <v-card
    class="member-table-card"
    title=" "
    flat
  >
    <template v-slot:text>
      <v-text-field
        v-model="search"
        base-color="green"
        class="member-search-field"
        color="green"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      ></v-text-field>
    </template>

    <v-data-table
      :headers="headers"
      :items="new_members"
      :row-props="getMemberRowProps"
      :search="search"
      class="member-data-table"
      @click:row="openMemberModal"
    ></v-data-table>
  </v-card>
    </div>

    <MyModal
      v-model="isMemberModalOpen"
      :member="selectedMember"
    />

    <foot />
  </div>
</template>

<script setup>
import {
    ref,
} from 'vue'
import {
    useRouter,
} from 'vue-router'

import { computed, reactive } from 'vue'

const search = ref('')
const headers = [{
        align: 'start',
        key: 'name',
        sortable: false,

    },
    {
        key: 'nom',
        title: 'Nom'
    },
    {
        key: 'prenom',
        title: 'Prenom'
    },
    {
        key: 'domicile',
        title: 'Domicile'
    },
    {
        key: 'ecole',
        title: 'Ecole'
    },
]

  const isMemberModalOpen = ref(false)
  const selectedMember = ref(null)

const new_members = ref([{
        nom: 'Dupont',
        prenom: 'Jean',
        domicile: 'Paris',
        ecole: 'Lycée Henri IV',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',

    },
    {
        nom: 'Martin',
        prenom: 'Alice',
        domicile: 'Lyon',
        ecole: 'INSA Lyon',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
        nom: 'Lefebvre',
        prenom: 'Thomas',
        domicile: 'Lille',
        ecole: 'EDHEC Business School',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    {
        nom: 'Dubois',
        prenom: 'Sophie',
        domicile: 'Bordeaux',
        ecole: 'Sciences Po',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
    {
        nom: 'Moreau',
        prenom: 'Lucas',
        domicile: 'Nantes',
        ecole: 'Centrale Nantes',
        photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop',
    },
    {
        nom: 'Lambert',
        prenom: 'Emma',
        domicile: 'Marseille',
        ecole: 'Kedge Business School',
        photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop',
    },
    {
        nom: 'Rousseau',
        prenom: 'Hugo',
        domicile: 'Toulouse',
        ecole: 'ENAC',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    },
    {
        nom: 'Girard',
        prenom: 'Chloé',
        domicile: 'Strasbourg',
        ecole: 'Université de Strasbourg',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    },
    {
        nom: 'Mercier',
        prenom: 'Antoine',
        domicile: 'Rennes',
        ecole: 'Rennes School of Business',
        photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop',
    },
    {
        nom: 'Petit',
        prenom: 'Léa',
        domicile: 'Montpellier',
        ecole: 'Montpellier Business School',
        photo: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=150&h=150&fit=crop',
    },
])

const etudiants = ref([{
        nom: 'Dupont',
        prenom: 'Jean',
        anneeScolaire: '2025-2026',
        status: 'en attente'
    },
    {
        nom: 'Martin',
        prenom: 'Alice',
        anneeScolaire: '2024-2025',
        status: 'en attente'
    },
    {
        nom: 'Lefebvre',
        prenom: 'Thomas',
        anneeScolaire: '2025-2026',
        status: 'en attente'
    },
    {
        nom: 'Dubois',
        prenom: 'Sophie',
        anneeScolaire: '2023-2024',
        status: 'en attente'
    },
    {
        nom: 'Moreau',
        prenom: 'Lucas',
        anneeScolaire: '2025-2026',
        status: 'en attente'
    },
    {
        nom: 'Lambert',
        prenom: 'Emma',
        anneeScolaire: '2024-2025',
        status: 'en attente'
    },
    {
        nom: 'Rousseau',
        prenom: 'Hugo',
        anneeScolaire: '2025-2026',
        status: 'en attente'
    },
    {
        nom: 'Girard',
        prenom: 'Chloé',
        anneeScolaire: '2023-2024',
        status: 'en attente'
    },
    {
        nom: 'Mercier',
        prenom: 'Antoine',
        anneeScolaire: '2024-2025',
        status: 'en attente'
    },
    {
        nom: 'Petit',
        prenom: 'Léa',
        anneeScolaire: '2025-2026',
        status: 'en attente'
    },
])

function procuration(message, item) {
    for (const element of etudiants.value) {
        if (element === item) {
            element.status = message
        }
    }
}

function check(message, item) {
    for (const element of reclamation.value) {
        if (element === item) {
            element.status = message
        }
    }
}

const reclamation = ref([{
        name: 'Julie Vallet',
        message: 'Je souhaiterais modifier mon adresse de livraison pour la commande #994.',
        time: '12 minutes ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=julie',
    },
    {
        name: 'Sophie Fontenelle',
        message: 'Le code promotionnel "BIENVENUE10" ne semble pas s’appliquer à mon panier.',
        time: '45 minutes ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=sophie',
    },
    {
        name: 'Karim Mansour',
        message: 'Est-il possible d’avoir un suivi plus précis sur l’expédition internationale ?',
        time: '1 hour ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=karim',
    },
    {
        name: 'Emma Watson',
        message: 'Je n’ai toujours pas reçu mon email de confirmation après 24 heures.',
        time: '2 hours ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=emma',
    },
    {
        name: 'Lucas Dupont',
        message: 'Une erreur 500 s’affiche lorsque j’essaie d’accéder à mes factures.',
        time: '3 hours ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=lucas',
    },
    {
        name: 'Sarah Jenkins',
        message: 'Serait-il possible de renouveler mon abonnement par virement bancaire ?',
        time: '5 hours ago',
        status: 'envoye',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
    },
])

const icons = ref([{
        name: 'Annonce',
        color: 'bg-blue',
        image: 'mdi mdi-bullhorn',
    },
    {
        name: 'Approbation',
        color: 'bg-green',
        image: 'mdi mdi-check-decagram',
    },
    {
        name: 'Gestion',
        color: 'bg-yellow',
        image: 'mdi mdi-calendar-month',
    },
])

const isOpen = ref(null)
const popupContent = ref(['approbation', 'annonce']) // Pour stocker le texte dynamique

function openPopup(message) {
    isOpen.value = message // On ouvre le popup
}
const router = useRouter()

function consulter() {
    router.push('liste_membre')
}

function diriger() {
  router.push('liste_membre')
}

function getMemberRowProps() {
  return {
    class: 'cursor-pointer',
  }
}

function openMemberModal(_, context) {
  selectedMember.value = context?.item?.raw ?? context?.item ?? null
  isMemberModalOpen.value = !!selectedMember.value
}
</script>

<style scoped>
.member-input {
  width: 100%;
  border: 1px solid #d1fae5;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  color: #111827;
  padding: 0.95rem 1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.member-input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
}

.member-label {
  display: block;
  margin-bottom: 0.65rem;
  color: #15803d;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.parallax-hero {
    background-image: url('/img/maki.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
}

.icon-card {
    transition: transform 0.5s ease-in;
    transform-origin: center;
}

.icon-card:hover {
    transform: rotateY(360deg);
}

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

  .approbation-overlay {
    background-color: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(10px);
  }

  .approbation-modal {
    width: min(860px, calc(100vw - 2rem));
    max-height: min(720px, calc(100vh - 2rem));
    overflow: hidden;
    border: 1px solid #dcfce7;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.22);
  }

  .approbation-scroll {
    max-height: calc(720px - 120px);
    overflow-y: auto;
    scrollbar-gutter: stable;
  }

  .approbation-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #dcfce7;
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(240, 253, 244, 0.8));
  }

  .approbation-item + .approbation-item {
    margin-top: 1rem;
  }

  .approbation-avatar {
    width: 88px;
    height: 88px;
    border-radius: 24px;
    object-fit: cover;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
  }

  .approbation-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  .approbation-action:hover {
    transform: translateY(-1px);
  }

  .approbation-action--approve {
    background: rgba(34, 197, 94, 0.12);
    color: #15803d;
    box-shadow: 0 10px 24px rgba(34, 197, 94, 0.12);
  }

  .approbation-action--reject {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
    box-shadow: 0 10px 24px rgba(239, 68, 68, 0.1);
  }

  .approbation-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.92);
    color: #111827;
    font-size: 1.25rem;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);
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

@media (max-width: 960px) {
    .parallax-hero {
        background-attachment: scroll;
    }
}

:deep(.member-table-card) {
  background: #ffffff;
  border: 1px solid #dcfce7;
  border-radius: 20px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
}

:deep(.member-table-card .v-card-text) {
  padding: 24px 24px 8px;
}

:deep(.member-search-field .v-field) {
  background: #ffffff;
  color: #111827;
}

:deep(.member-search-field .v-label) {
  color: #6b7280;
}

:deep(.member-search-field input) {
  color: #111827;
}

:deep(.member-search-field .v-icon) {
  color: #15803d;
}

:deep(.member-data-table) {
  background: rgba(255, 255, 255, 0.72) !important;
  color: #111827;
}

:deep(.member-data-table .v-table),
:deep(.member-data-table .v-table__wrapper),
:deep(.member-data-table .v-table__wrapper > table),
:deep(.member-data-table thead),
:deep(.member-data-table tbody),
:deep(.member-data-table tr),
:deep(.member-data-table th),
:deep(.member-data-table td) {
  background: transparent !important;
}

:deep(.member-data-table .v-table) {
  background-color: rgba(255, 255, 255, 0.72) !important;
  border-radius: 16px;
  overflow: hidden;
}

:deep(.member-data-table .v-table__wrapper) {
  scrollbar-gutter: stable;
}

:deep(.member-data-table .v-data-table-header__content) {
  color: #02d14e;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.03em;
}

:deep(.member-data-table tbody tr) {
  transition: background-color 0.2s ease;
}

:deep(.member-data-table tbody tr:hover) {
  background: rgba(22, 163, 74, 0.08);
}

:deep(.member-data-table tbody td) {
  color: #374151;
}

:deep(.member-data-table tbody td:first-child),
:deep(.member-data-table tbody td:nth-child(2)) {
  color: #111827;
  font-weight: 600;
}
</style>
