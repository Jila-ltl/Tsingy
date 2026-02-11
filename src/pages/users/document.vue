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

<div class="box mt-40 flex flex-col">
    <div class="entete mt-5 px-6 py-6 text-4xl">Demande de documents</div>
    <div class="forme mt-3 py-4 text-lg">
        <form @submit.prevent="envoyerFormulaire">
            <div class="field-group">
                <label for="">Attesatation de bourse</label>
                <select class="custom-input custom-select">
                    <option value="" disabled selected>Choisir une option...</option>
                    <option v-for="opt,i in document" :key="i" :value="opt">{{ opt }}</option>
                </select>
            </div>
            
            <v-btn :loading="loading" class="flex-grow-1" height="48" variant="tonal" @click="inscription_rout()">
                Envoyer
            </v-btn>
            
        </form>
    </div>
    <div class="entete  py-4 text-lg ">
        <h2 class="title">Liste des demandes</h2>
        <hr class="separator" />
        <table class="custom-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Annee</th>
          <th>État</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(demande, index) in demandes" :key="index">
          <td>{{ demande.date }}</td>
          <td>{{ demande.annee }}</td>
          <td :class="{ 'status-validated': demande.etat === 'Validée' }">
            {{ demande.etat }}
          </td>
        </tr>
      </tbody>
    </table>
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

const document = ref(
    ['2020','2021','2022']
)

const demandes = [
  { date: '31/10/2025 01:13:55', annee: '2021', etat: 'Validée' },
  { date: '18/09/2025 11:03:18', annee: "2022", etat: 'Validée' },
];
</script>

<style>
    #bg_img {
    background-image: url("../../../public/img/img1.png");
    background-size: cover;
}

#container {
    box-shadow: 0px 2px 10px 1px rgba(71,71 ,71, 0.52);
    background-image: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    height: auto;
    width: 60%;
    border-radius: 20px;
}

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


.box {
  width: 80%;
  margin-left: 310px;
  height: auto;
  background-color: #333;
  background-position: center;
 
}

.entete{
    width: 96%;
    height: 15%;
    margin-left: 2%;
    box-shadow: 0px 2px 10px 1px rgba(71,71 ,71, 0.52);
    background-image: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.forme{
    width: 96%;
    height: auto;
    margin-left: 2%;
    display: flex;
    flex-direction: row;
}

.field-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.custom-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  padding: 12px;
  border-radius: 8px;
  width: 350px;

  outline: none;
}


.custom-select {
  appearance: none; /* Supprime le style par défaut du navigateur */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c5a059'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em;
  padding-right: 2.5rem;
  cursor: pointer;
}

select option {
  background-color: #1a1a1a;
  color: white;
}


/* tableau */
.title {
  color: #8cc63f; /* Le vert pomme du titre */
  font-weight: normal;
  margin-bottom: 10px;
}

.separator {
  border: 0;
  border-top: 1px solid #ddd;
  margin-bottom: 20px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse; /* Pour enlever les espaces entre les bordures */
}

/* Header du tableau */
.custom-table th {
  background-color: #a0a0a0; /* Gris moyen */
  color: white;
  text-align: left;
  padding: 12px 15px;
  font-weight: normal;
}

/* Lignes du tableau */
.custom-table td {
  padding: 12px 15px;
  border-bottom: 2px solid white; /* Ligne blanche séparatrice */
  background-color: #e0e0e0; /* Gris clair */
  color: #555;
  font-size: 14px;
}

/* État Validée en vert */
.status-validated {
  color: #8cc63f;
  font-weight: bold;
}
</style>