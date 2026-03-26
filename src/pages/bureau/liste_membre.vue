<template>
  <div id="app">
  <SIDEBAR/>
<main>
 <div class="search-wrapper">
    <div class="search-group flex">
      <span class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </span>

      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher..."
        class="search-input"
      />
    </div>
  </div>
     <!-- Tableau dynamique des membres -->
    <div class="table-container pl-72">
      <table class="membres-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Rôle</th>
            <th>Âge</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="membre in filteredMembres" :key="membre.id">
            <td>
              <img :src="membre.photo" :alt="membre.nom" class="tableau-photo" />
            </td>
            <td>{{ membre.nom }}</td>
            <td>{{ membre.prenom }}</td>
            <td>{{ membre.role }}</td>
            <td>{{ membre.age }}</td>
            <td>
              <button @click="openPopup(membre)" class="btn-infos">
                Infos
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
              </button>
            </div>
        </div>
        <div class="image">
            <div class="mask-container">
              <img src="/img/photo.jpeg" alt="User silhouette" />
            </div>
            <div class="profile-info">
              <p><strong>Nom: RAZAFY</strong></p>
              <p>Prénom: Juliana</p>
              <p>Étudiant</p>
              <button @click="openPopup({Nom:'Juliana', age: 20})">
                    Infos
              </button>
            </div>
        </div>

        <div class="image">
            <div class="mask-container">
              <img src="/img/photo.jpeg" alt="User silhouette" />
            </div>
            <div class="profile-info">
              <p><strong>Nom: RAZAFY</strong></p>
              <p>Prénom: Juliana</p>
              <p>Étudiant</p>
              <button @click="openPopup({Nom:'Juliana', age: 20})">
                    Infos
              </button>
            </div>
        </div>

        <div class="image">
            <div class="mask-container">
              <img src="/img/photo.jpeg" alt="User silhouette" />
            </div>
            <div class="profile-info">
              <p><strong>Nom: RAZAFY</strong></p>
              <p>Prénom: Juliana</p>
              <p>Étudiant</p>
              <button @click="openPopup({Nom:'Juliana', age: 20})">
                    Infos
              </button>
            </div>
        </div>
        <div class="image">
            <div class="mask-container">
              <img src="/img/photo.jpeg" alt="User silhouette" />
            </div>
            <div class="profile-info">
              <p><strong>Nom: RAZAFY</strong></p>
              <p>Prénom: Juliana</p>
              <p>Étudiant</p>
              <button @click="openPopup({Nom:'Juliana', age: 20})">
                    Infos
              </button>
            </div>
        </div>

    </div>




    <div v-if="isOpen" class="overlay">
            <div class="popup">
                <h2>infoS</h2>
                    <button class="btn-close" @click="isOpen = false" aria-label="Fermer">&times;</button>

            </div>
        </div>
</main>
</div>
</template>



<script setup>
import SIDEBAR from '@/components/SIDEBAR.vue'
import { ref, computed } from 'vue'

// Données des membres
const membres = ref([
  { id: 1, nom: 'RAZAFY', prenom: 'Juliana', role: 'Étudiant', age: 20, photo: '/img/photo.jpeg' },
  { id: 2, nom: 'RAZAFY', prenom: 'Juliana', role: 'Étudiant', age: 20, photo: '/img/photo.jpeg' },
  { id: 3, nom: 'RAZAFY', prenom: 'Juliana', role: 'Étudiant', age: 20, photo: '/img/photo.jpeg' },
  { id: 4, nom: 'RAZAFY', prenom: 'Juliana', role: 'Étudiant', age: 20, photo: '/img/photo.jpeg' },
  { id: 5, nom: 'RAZAFY', prenom: 'Juliana', role: 'Étudiant', age: 20, photo: '/img/photo.jpeg' },
  { id: 6, nom: 'RAZAFY', prenom: 'Juliana', role: 'Étudiant', age: 20, photo: '/img/photo.jpeg' },
])

// Variable de recherche
const searchQuery = ref('')

// Filtrer les membres selon la recherche
const filteredMembres = computed(() => {
  return membres.value.filter(membre =>
    membre.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    membre.prenom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    membre.role.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const isOpen = ref(false)
const popupContent = ref({}) // Pour stocker les infos du membre

const openPopup = (membre) => {
  popupContent.value = membre
  isOpen.value = true
<style scoped>
#app {
  display: flex; /* Pour que le main soit à côté du sidebar */

}


.search-wrapper {
  padding: 15px;


}

.search-group {
  position: relative; /* Indispensable pour l'icône en absolute */
  display: flex;
  align-items: center;


}

.search-icon {
  position: fixed;
   margin-left: 40%;
  position: absolute;
  left: 12px; /* Positionne l'icône à l'intérieur à gauche */
  display: flex;
  color: rgba(255, 255, 255, 0.6); /* Couleur adaptée pour ton sidebar bleu */
  pointer-events: none; /* L'icône ne bloque pas le clic sur l'input */
}

.search-input {
  margin-left: 40%;
  width: 30%;
  padding: 10px 10px 10px 40px; /* 40px à gauche pour ne pas écrire sur l'icône */
  border-radius: 30px;
  border: none;
  background: rgba(255, 255, 255, 0.1); /* Fond transparent pour le sidebar */
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
  flex-direction: column; /* Aligne les éléments de haut en bas */
  align-items: center;    /* Centre l'image et le texte horizontalement */
  text-align: center;
}

.mask-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.row{
    display: flex;
    height: 50%;

}

.image{
    width: 300px;
    height: 400px;
    display: inline-block;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.5s;

}

.profile-info{
  margin-top: -55px;
  padding-left: 30%;
}

.profile-info p {
  margin: 5px 0;          /* Réduit l'espace entre les lignes de texte */
  font-size: 16px;

}



/* 1. L'arrière-plan (Overlay) */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); /* Noir semi-transparent */
  backdrop-filter: blur(4px);            /* Effet de flou derrière (très moderne) */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;                         /* Toujours au-dessus de tout */
}

/* 2. La boîte du Popup */
.popup {
  background: white;
  padding: 30px;
  border-radius: 16px;                   /* Bords arrondis */
  box-shadow: 0 20px 40px rgba(0,0,0,0.3); /* Ombre portée douce */
  max-width: 400px;
  width: 90%;                            /* Responsive sur mobile */
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
  transform: scale(1.05); /* Petit effet de zoom au survol */
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
  transform: scale(0.9); /* Démarre un peu plus petit */
}

/* Tableau dynamique */
.table-container {
  margin: 20px 0;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.membres-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.membres-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.membres-table thead th {
  padding: 16px;
  text-align: left;
  border-bottom: 3px solid #667eea;
}

.membres-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}

.membres-table tbody tr:hover {
  background-color: #f5f5f5;
}

.membres-table tbody tr:last-child {
  border-bottom: none;
}

.membres-table tbody td {
  padding: 14px 16px;
  color: #333;
  font-size: 14px;
}

.tableau-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e0e0;
}

.btn-infos {
  padding: 6px 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-infos:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-infos:active {
  transform: translateY(0);
}

</style>
