
<template>
  <footer class="site-footer">
    <template v-for="(item, index) in contactInfos" :key="index">
      
      <div class="footer-item">
        <svg-icon type="mdi" :path="item.iconPath" class="footer-icon"></svg-icon>
        <div class="text-content">
          <h4>{{ item.title }}</h4>
          <p>{{ item.value }}</p>
        </div>
      </div>

      <div v-if="index < contactInfos.length - 1" class="separator"></div>
      
    </template>
  </footer>
</template>
  


<script setup>
import { ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiEmail, mdiMapMarker, mdiPhone } from '@mdi/js' // Ajoute les autres ici

// On crée notre tableau directement
const contactInfos = ref([
  {
    title: 'ADRESSE',
    value: "3139 route du Houga, 40800 Aire sur l'Adour",
    iconPath: mdiMapMarker
  },
  {
    title: 'TÉLÉPHONE',
    value: '05 58 71 99 30',
    iconPath: mdiPhone
  },
  {
    title: 'E-MAIL',
    value: 'contact@sarrade-construction.com',
    iconPath: mdiEmail
  }
])


</script>

<style scoped>
.site-footer {
    background-color: #1a1a1a;
    color: white;
    width: 100%;
    display: flex; /* Active le mode ligne */
    flex-direction: row; /* Force l'alignement horizontal */
    justify-content: center; /* Centre le groupe au milieu de l'écran */
    align-items: center; /* Centre verticalement CHAQUE élément (icônes, textes, barres) */
    padding: 60px 0;
    font-family: Arial, sans-serif;
}

.footer-item {
    display: flex;
    align-items: center; /* Aligne l'icône et le texte ensemble */
    margin: 0 40px;
}

.footer-icon {
    width: 28px !important; /* Taille un peu plus grande pour correspondre à ton image */
    height: 28px !important;
    margin-right: 15px;
    color: white;
}

.text-content h4 {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
}

.text-content p {
    margin: 0; /* On retire toutes les marges pour éviter les décalages */
    font-size: 13px;
    color: #b3b3b3;
    margin-top: 4px;
}

.separator {
    width: 1px;
    height: 40px; /* Taille fixe de la barre */
    background-color: #444; /* Gris sombre */
    flex-shrink: 0; /* Empêche la barre de s'écraser */
}
</style>