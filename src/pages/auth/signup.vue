<template>
<div id="bg_img" class="  w-full flex flex-row justify-center items-center h-full">
  <div class="flex flex-row sm:w-[80vw] justify-center" id="container">
    <div class="form-container">
      <div class="justify-center mb-10 ml-36 mt-10">
          <span class="text-black text-3xl font-bold">Inscription</span>
      </div>
      <form @submit.prevent="envoyerFormulaire">
        <div v-for="champ in configurationChamps" :key="champ.id" class="field-group">
          <label :for="champ.id">{{ champ.label }}</label>

        <select 
          v-if="champ.type === 'select'"
          :id="champ.id"
          v-model="formValues[champ.id]"
          class="custom-input custom-select"
        >
        <option value="" disabled selected>Choisir une option...</option>
        <option v-for="opt,i in champ.options" :key="i" :value="opt">
          {{ opt }}
        </option>
        </select>

        <input 
          v-else
          :id="champ.id"
          :type="champ.type"
          :placeholder="champ.placeholder"
          v-model="formValues[champ.id]" 
          class="custom-input"
        />

      </div>

            <v-btn :loading="loading" class="flex-grow-1" height="48" variant="tonal" @click="inscription_rout()">
            S'inscrire
            </v-btn>
        
    </form>
  </div>
  <div class="flex flex-col justify-center sm:px-24 sm:w-[50%]" >
        <div class="justify-end ml-32">
            <v-icon size="100" class="ml-5">mdi-account-circle</v-icon>
        </div>
        <div class="justify-center">
            <p class="text-center text-400 text-3xl font-bold ml-10 ">Nous sommes ravis de vous accueillir</p>
        </div>
  </div>
   </div>
</div>
</template>

<script setup>

import { ref, computed } from 'vue';

// 1. Les données saisies par l'utilisateur
const formValues = ref({
  Nom: '',
  email: '',
  message: ''
});

// 2. Si tu veux générer les champs dynamiquement via une liste
const configurationChamps = [
  { id: 'nom', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
  { id: 'prenom', label: 'Prenom', type: 'text', placeholder: 'Votre prenom' },
  { id: 'mdp', label: 'password', type: 'text', placeholder: 'Mot de passe' },
  { id: 'matricule', label: 'Matricule AMCI', type: 'text', placeholder: 'Votre matricule AMCI' },
  { id: 'naissance', label: 'Date de naissance', type: 'date', placeholder: 'Votre date de naissance' },
  { id: 'profession', label: 'Profession', type: 'select', placeholder: ' Votre Profession', options: ['Etudiant', 'Travailleur'] },
  { id: 'passeport', label: 'Passeport', type: 'text', placeholder: 'Numero de passeport' },
  { id: 'carte sejour', label: 'Carte sejour', type: 'text', placeholder: 'Numero carte sejour' },
  { id: 'arrive maroc', label: 'Arrive Maroc', type: 'date', placeholder: 'Date arrive au Maroc' },
  { id: 'domicile', label: 'Domicile', type: 'text', placeholder: 'Votre adresse' },
];

</script>

<style scoped>
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

.field-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  color: #000000; /* Ton doré */
  margin-bottom: 5px;
  font-weight: bold;
}

.custom-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px;
  border-radius: 8px;
  width: 350px;

  outline: none;
}

.custom-input:focus {
  border-color: #c5a059;
}

.submit-btn {
  background: #c5a059;
  color: black;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
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

/* Style des options (limité par le navigateur, mais aide à la lisibilité) */
select option {
  background-color: #1a1a1a;
  color: white;
}

</style>

