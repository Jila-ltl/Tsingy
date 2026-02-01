<template>
 <aside class="sidebar items-center">
    <ul class="menu-list items-center">
      <li v-for="item in menuItems" :key="item.label" class="text-center">
        <router-link :to="item.url" :class="{ 'exit-link': item.isExit }">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
</aside>

<div class="profile-header">
    <div class="cover-photo" :style="{ backgroundImage: `url('/img/cover.jpg')` }"></div>

    <div class="avatar-container">
      <div class="profile-circle" :style="{ backgroundImage: `url('/img/profile.jpeg')` }"></div>
      <div class="profile-info">
        <h1>Juliana RAZAFINDRAMANANA</h1>
        <p>Membre simple</p>
        <p>
            <router-link to="#">Modifier</router-link>
            <span class="mdi mdi-pencil-box-outline"></span>
        </p>
      </div>
    </div>
</div>

<div class="flex ml-20 justify-center  text-xl font-bold border-lime-700" id="identite">
      <div id="present" class="space-y-10 mt-10 border-collapse">
        <p>Nom: RAZAFINDRAMANANA</p>
        <p>Prenom: Juliana</p>
        <p>Date de naissance: 04/10/2005</p>
        <p>Profession: Etudiante</p>
      </div>

      <div id="present" class="space-y-10 mt-10">
        <p>Passeport: A24X52268</p>
        <p>Carte sejour: E034606W</p>
        <p>Date d'arrivee au Maroc: 08/09/2024</p>
        <p>Domicile: Jnane Aourad</p>
      </div>
      
</div>

  

</template>

<script setup>
const menuItems = ref([
  { label: 'Mes infos', url: 'membre' },
  { label: 'Modifier mon mot de passe', url: '#' },
  { label: 'Demande de documents', url: 'document' },
  { label: 'Se deconnecter', url: '/auth/accueil', isExit: true }
])
</script>

<style scoped>
    .sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 260px;
  /* Effet de transparence et de flou */
  background: rgba(255, 255, 255, 0.15); 
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px); /* Pour Safari */
  
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centre le menu verticalement */
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 100;
}

.menu-list {
  list-style: none;
  padding: 0;
}

.menu-list li {
  margin: 25px 0;
}

.menu-list a {
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  font-weight: 300;
  transition: all 0.3s ease;
  display: block;
}

.menu-list a:hover {
  transform: translateX(10px); /* Petit décalage au survol */
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.exit-link {
  margin-top: 50px; /* Espace supplémentaire pour le bouton déconnexion */
}


/* body */
.profile-header {
  width: 100%;
  background: #111; /* Fond sombre pour coller à ton design */
  margin-left: 260px;
}

.cover-photo {
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
  background-color: #333;
}

.avatar-container {
  padding: 0 50px; /* Aligne l'avatar avec ton contenu */
  display: flex;
  align-items: flex-end; /* Aligne le texte en bas de l'avatar */
  gap: 20px;
}

.profile-circle {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 5px solid #111; /* Bordure épaisse de la couleur du fond (effet Facebook) */
  background-size: cover;
  background-position: center;
  
  /* L'effet magique : */
  margin-top: -150px; /* La moitié de la hauteur pour chevaucher parfaitement */
  position: relative;
  z-index: 2;
  background-color: #444;
}

.profile-info {
  margin-bottom: 90px;
  color: white;
}

.profile-info h1 {
  margin: 0;
  font-size: 1.8rem;
}

.profile-info a {
    color: white;
    margin: 0;
    font-size: 1rem;
}

#present {
    height: 300px;
    width: 40%;
}
#identite{
    width: 150vh;
    margin-left: 270px;
    background-color: #444;
    border: #444;
}

p{
    align-items: center;
}



</style>