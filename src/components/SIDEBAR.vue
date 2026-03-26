<template>
  <div class="sidebar-wrapper">
      <div class="haikei-wave">
        <nav class="content">
        <h2>Filtrage</h2>
        <ul>
          <form >
          <li>Annee
            <select 
          type="select"
          id="annee"
          class="custom-select"
        >
        <option value="" disabled selected>Choisir une option...</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        </select>
          </li>
          <li>Profession
            <select 
          type="select"
          id="job"
          class="custom-select"
        >
        <option value="" disabled selected>Choisir une option...</option>
        <option value="Etudiant">Etudiant</option>
        <option value="Travailleur">Travailleur</option>
      </select>
          </li>
          <li>Etablissement 
            <input type="text" class="custom-input"> 
          </li>
          <li>
            <v-btn class="flex-grow-1" height="48" variant="tonal">
            Filtrer
            </v-btn>
          </li>
</form>
        </ul>
        
      </nav>
      </div>
   
  </div>
</template>

<style scoped>
li{
  padding: 10px 0px;
  list-style: none;
}

.custom-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 8px;
  outline: none;
  width: fit-content;
}

.custom-select:focus {
  border-color: #888682;
}

.custom-select {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgb(26, 24, 24);
  border-radius: 8px;
  outline: none;
  width: fit-content;
}

.sidebar-wrapper {
  display: flex;
  height: 100%;
}


.haikei-wave {
position: fixed;
top: 0;
width: 100vh;
height: 100vh;
background-image: url('@/assets/wave2.svg');
background-size: 100% 100%;
background-repeat: no-repeat;

background-color: #333f52; 
mask-image: url('@/assets/wave2.svg');
mask-size: 80cqmax ;
background-image: none; 

display: flex;
flex-direction: column;   /* Aligne les éléments verticalement */
justify-content: center;  /* Centre le contenu au milieu de la hauteur */
padding-left: 30px;

}

.content { padding: 5px; 
  
}


</style>