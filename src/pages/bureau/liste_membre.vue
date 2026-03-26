<template>
<!-- <div id="app" class="w-full h-screen flex"> -->
<div class="w-full flex h-[91vh] overflow-hidden" >
    <SIDEBAR class=" z-30"/>
    <div class=" w-[15%] h-full "></div>
    <div class=" w-[85%] h-full  flex flex-col overflow-hidden">
        <div class=" w-full items-center flex justify-center">
            <div class=" mt-6 bg-stone-700 py-1 px-3 flex flex-row rounded-full w-[350px]">
            <span class="mdi mdi-magnify"></span>
            <input class=" ml-2 outline-none w-full" type="text" v-model="searchQuery" placeholder="Rechercher..."   @keyup="find_user(searchQuery)" />
            </div>
        </div>
        <!-- <div class="row pl-72"> -->
        <div class=" overflow-y-auto">
            <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 ">
                <div class="image cursor-pointer hover:scale-110" v-for="item,i in search_list" :key="i" @click="openPopup_(item)">
                    <div class="mask-container">
                        <img src="/img/photo.jpeg" alt="User silhouette" />
                    </div>
                    <div class="profile-info">
                        <div>
                            <span>Nom:</span>
                            <span v-html="item.nom"></span>
                        </div>
                        <div>
                            <span>Prénom:</span>
                            <span v-text="item.prenom"></span>
                        </div>
                        <div>
                            <span>Rôle:</span>
                            <span v-text="item.role"></span>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <!-- DIALOG  -->
        <div v-if="isShown" class=" w-full h-full backdrop-blur-sm  fixed top-0 left-0 flex items-center justify-center">
            <div class="  w-full h-full fixed top-0 left-0 z-10 cursor-pointer" @click="isShown=false"></div>
            <div class=" bg-stone-700 text-white px-2 py-1  rounded-lg shadow-lg border border-white flex flex-col z-20">
                <div @click="isShown=false" class="flex w-full justify-end cursor-pointer">
                    <span class="mdi mdi-window-close"></span>
                </div>
                <div class="flex flex-col items-left w-[400px]">
                    <h2 class="text-left font-bold mb-2 ">Information </h2>
                    <span class=" border-b border-white"></span>
                    <div>
                        <span>Nom: </span>
                        <span v-text="popupContent_.nom"></span>
                    </div>
                    <div>
                        <span>Prénom: </span>
                        <span v-text="popupContent_.prenom"></span>
                    </div>
                    <div>
                        <span>Role: </span>
                        <span v-text="popupContent_.role"></span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script setup>
import SIDEBAR from '@/components/SIDEBAR.vue'
import {
    ref,
    computed
} from 'vue'

// 1. La source de données
const items = ref(['Dashboard', 'Profil Utilisateur', 'Paramètres', 'Statistiques', 'Messages'])

// 2. La variable liée au champ de saisie
const searchQuery = ref('')

// 3. La logique de filtrage (réactive)
const filteredItems = computed(() => {
    return items.value.filter(item =>
        item.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const isOpen = ref(false)
const popupContent = ref({
    Nom: 'Juliana',
    age: 20
}) // Pour stocker le texte dynamique

const openPopup = (message) => {
    popupContent.value = message // On définit le message
    isOpen.value = true // On ouvre le popup
}
const users_list = ref([{
        nom: 'Benali',
        prenom: 'Youssef',
        role: 'Développeur'
    },
    {
        nom: 'El Amrani',
        prenom: 'Salma',
        role: 'Designer UI/UX'
    },
    {
        nom: 'Tazi',
        prenom: 'Omar',
        role: 'Chef de projet'
    },
    {
        nom: 'Alaoui',
        prenom: 'Nadia',
        role: 'Responsable RH'
    },
    {
        nom: 'Haddad',
        prenom: 'Karim',
        role: 'DevOps'
    },
    {
        nom: 'Bennani',
        prenom: 'Lina',
        role: 'Data Analyst'
    },
    {
        nom: 'Zerhouni',
        prenom: 'Mehdi',
        role: 'Ingénieur logiciel'
    },
    {
        nom: 'Chraibi',
        prenom: 'Sara',
        role: 'Marketing digital'
    },
    {
        nom: 'Idrissi',
        prenom: 'Amine',
        role: 'Testeur QA'
    },
    {
        nom: 'Fassi',
        prenom: 'Hajar',
        role: 'Support client'
    },
    {
        nom: 'Kabbaj',
        prenom: 'Rachid',
        role: 'Architecte IT'
    },
    {
        nom: 'Lamrani',
        prenom: 'Imane',
        role: 'Product Owner'
    },
    {
        nom: 'Boussaid',
        prenom: 'Adil',
        role: 'Administrateur système'
    },
    {
        nom: 'Skalli',
        prenom: 'Meryem',
        role: 'Comptable'
    },
    {
        nom: 'Naciri',
        prenom: 'Zakaria',
        role: 'Consultant IT'
    },
    {
        nom: 'Ouazzani',
        prenom: 'Fatima',
        role: 'Assistante de direction'
    },
    {
        nom: 'Tahiri',
        prenom: 'Ayoub',
        role: 'Développeur mobile'
    },
    {
        nom: 'Sbihi',
        prenom: 'Othmane',
        role: 'Technicien réseau'
    },
    {
        nom: 'Belkadi',
        prenom: 'Soukaina',
        role: 'UX Researcher'
    },
    {
        nom: 'Majidi',
        prenom: 'Hamza',
        role: 'Scrum Master'
    },
    {
        nom: 'Raji',
        prenom: 'Nour',
        role: 'Chargée de communication'
    },
    {
        nom: 'Berrada',
        prenom: 'Yassine',
        role: 'Ingénieur sécurité'
    },
    {
        nom: 'Kettani',
        prenom: 'Hind',
        role: 'Business Analyst'
    },
    {
        nom: 'Ziani',
        prenom: 'Walid',
        role: 'Développeur backend'
    },
    {
        nom: 'Amrani',
        prenom: 'Khadija',
        role: 'Développeuse frontend'
    },
    {
        nom: 'Lahlou',
        prenom: 'Samir',
        role: 'Chef d’équipe'
    },
    {
        nom: 'Tounsi',
        prenom: 'Rim',
        role: 'Graphiste'
    },
    {
        nom: 'El Fassi',
        prenom: 'Bilal',
        role: 'Administrateur base de données'
    },
    {
        nom: 'Mouline',
        prenom: 'Asmae',
        role: 'Responsable qualité'
    },
    {
        nom: 'Cherkaoui',
        prenom: 'Driss',
        role: 'Auditeur IT'
    },
    {
        nom: 'Bouzidi',
        prenom: 'Nabil',
        role: 'Développeur fullstack'
    },
    {
        nom: 'Ait Said',
        prenom: 'Leila',
        role: 'Chargée RH'
    },
    {
        nom: 'Mernissi',
        prenom: 'Oumaima',
        role: 'Content manager'
    },
    {
        nom: 'Dakki',
        prenom: 'Anas',
        role: 'Technicien support'
    },
    {
        nom: 'Bekkali',
        prenom: 'Reda',
        role: 'Ingénieur cloud'
    },
    {
        nom: 'Hajji',
        prenom: 'Siham',
        role: 'Office manager'
    },
    {
        nom: 'El Khatib',
        prenom: 'Tarik',
        role: 'Consultant fonctionnel'
    },
    {
        nom: 'Bounou',
        prenom: 'Younes',
        role: 'Analyste financier'
    },
    {
        nom: 'Karimi',
        prenom: 'Ilham',
        role: 'Responsable marketing'
    },
    {
        nom: 'Saidi',
        prenom: 'Achraf',
        role: 'Développeur junior'
    }
])

const isShown = ref(false)
const search_list = ref([])
const popupContent_ = ref({
    nom: ' ',
    prenom: ' ',
    role: ''
}) // Pour stocker le texte dynamique

function find_user(nom) {
    var temp_list = []
    users_list.value.forEach(element => {
        if (element.nom.toLowerCase().includes(nom.toLowerCase())) {
            temp_list.push({
                nom: element.nom.toLowerCase().replace(nom.toLowerCase(), `<span class="bg-yellow-800">${nom}</span>`),
                prenom: element.prenom,
                role: element.role
            })
        }
    });
    search_list.value = temp_list

    // return users_list.value.find(user => user.nom === nom)
}

function openPopup_(message) {
    popupContent_.value = message // On définit le message
    isShown.value = true // On ouvre le popup
}

onMounted(() => {
    search_list.value = users_list.value
})
</script>

<style scoped>
#app {
    display: flex;
    /* Pour que le main soit à côté du sidebar */

}

.search-wrapper {
    padding: 15px;

}

.search-group {
    position: relative;
    /* Indispensable pour l'icône en absolute */
    display: flex;
    align-items: center;

}

.search-icon {
    position: fixed;
    margin-left: 40%;
    position: absolute;
    left: 12px;
    /* Positionne l'icône à l'intérieur à gauche */
    display: flex;
    color: rgba(255, 255, 255, 0.6);
    /* Couleur adaptée pour ton sidebar bleu */
    pointer-events: none;
    /* L'icône ne bloque pas le clic sur l'input */
}

.search-input {
    margin-left: 40%;
    width: 30%;
    padding: 10px 10px 10px 40px;
    /* 40px à gauche pour ne pas écrire sur l'icône */
    border-radius: 30px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    /* Fond transparent pour le sidebar */
    color: white;
    outline: none;
    transition: background 0.3s;
}

.search-input:focus {
    background: rgba(255, 255, 255, 0.2);
}

.search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.btn {
    padding: 10px 30px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 50px;
    cursor: pointer;
    color: #000;
}

/*autre*/

.mask-container {
    width: 300px;
    height: 300px;
    /* Application du masque flèche */
    -webkit-mask-image: url('@/assets/profile.svg');
    mask-image: url('@/assets/profile.svg');
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    display: flex;
    flex-direction: column;
    /* Aligne les éléments de haut en bas */
    align-items: center;
    /* Centre l'image et le texte horizontalement */
    text-align: center;
}

.mask-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.row {
    display: flex;
    height: 50%;

}

.image {
    width: 300px;
    height: 400px;
    display: inline-block;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.5s;

}

.profile-info {
    margin-top: -55px;
    padding-left: 30%;
}

.profile-info p {
    margin: 5px 0;
    /* Réduit l'espace entre les lignes de texte */
    font-size: 16px;

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
.popup {
    background: white;
    padding: 30px;
    border-radius: 16px;
    /* Bords arrondis */
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    /* Ombre portée douce */
    max-width: 400px;
    width: 90%;
    /* Responsive sur mobile */
    position: relative;
    text-align: center;
    border: 1px solid #eee;
}

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

/* 4. Le bouton de fermeture */
.btn-close {
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

.btn-close:hover {
    transform: scale(1.05);
    /* Petit effet de zoom au survol */
    background-color: #ff6b81;
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
</style>
