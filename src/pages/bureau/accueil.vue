<template>
<div class=" h-[91vh] w-full overflow-y-auto">
  <main class="landing-page">
    <div class="container">
        <div class="hero-text">
            <p class="tagline">BIENVENU SG</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur iusto, natus laborum est modi neque blanditiis, ducimus magni error id voluptatum facilis. Deleniti voluptatum beatae perferendis? Expedita, aperiam! Dolores, consequuntur?</p>
            <button class="btn">Modifier</button>
        </div>

        <div class="hero-image">
            <BlobImage imageSrc="/img/photo.jpeg" />
        </div>

    </div>

</main>
<div class="cards-container">
    <div class="card">
        <div class="card-header bg-blue">
            <div class="fan">
                <img src="/img/megaphone.png" alt="Person" class="masked-img">
            </div>
        </div>
        <div class="card-body">
            <div class="brand1">
                <img src="/img/logo.png" alt="easywp" class="logo-icon">
                <span><button @click="openPopup('annonce')">Annonce</button></span>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header bg-green">
            <div class="fan">
                <img src="/img/check.png" alt="Person" class="masked-img">
            </div>
        </div>
        <div class="card-body">
            <div class="brand1">
                <img src="/img/logo.png" alt="easywp" class="logo-icon">
                <span><button @click="openPopup('approbation')">Approbation des membres</button></span>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header bg-yellow">
            <div class="fan">
                <img src="/img/calendar.png" alt="Person" class="masked-img">
            </div>
        </div>
        <div class="card-body">
            <div class="brand1">
                <img src="/img/logo.png" alt="starlight" class="logo-icon">
                <span><button @click="openPopup('gestion')">gestion</button></span>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-header bg-purple-700">
            <div class="fan">
                <img src="/img/member.png" alt="Person" class="masked-img">
            </div>
        </div>
        <div class="card-body">
            <div class="brand1">
                <img src="/img/logo.png" alt="starlight" class="logo-icon">
                <span><button @click="consulter()">Consulter</button></span>
            </div>
        </div>
    </div>
</div>

<div v-if="isOpen=='annonce'" class="overlay flex-col">
    <div class="popup">
        <h2 class=" text-white">Ajouter une annonce</h2>
        <div class="form-container">
            <form>
                <div class="groupe">
                    <label>Titre:</label><br>
                    <input type="text" class="champ-saisie" name="Titre" placeholder="TItle">
                </div>

                <div class="groupe">
                    <label>Message :</label><br>
                    <textarea class="champ-saisie" name="message" placeholder="Écrivez ici..." variant="outlined"></textarea>
                </div>
                <div class="groupe">
                    <label>Expiration :</label><br>
                    <input type="date" class="champ-saisie" name="Expiration">
                </div>
                <v-btn :loading="loading" class="bouton" height="48" variant="tonal" @click="isOpen = false">
                    Envoyer
                </v-btn>
                <button class="btn-close" @click="isOpen = false" aria-label="Fermer">&times;</button>
            </form>
        </div>

    </div>

</div>
<div v-if="isOpen=='approbation'" class="overlay">
    <div class="popup ">
        <h2>Approbation</h2>
        <div class="form-container">
            <form @submit.prevent="envoyerFormulaire">
                <textarea id="message" v-model="monTexteLong" placeholder="Ecrivez votre texte" rows="6" class="custom-textarea">
                    </textarea>
                <div>
                    <v-btn :loading="loading" class="bouton" height="48" variant="tonal" @click="isOpen = false">S'inscrire</v-btn>
                </div>

                <button class="btn-close" @click="isOpen = false" aria-label="Fermer">&times;</button>
            </form>
        </div>
    </div>
</div>
<div v-if="isOpen=='gestion'" class="overlay">
    <div class="popup">
        <h2 class=" text-white">Evenement</h2>
        <div class="form-container">
            <form>
                <div class="groupe">
                    <label>Photo:</label><br>
                    <input type="file" class="champ-saisie" name="Titre" placeholder="TItle">
                </div>

                <div class="groupe">
                    <label>Description :</label><br>
                    <textarea class="champ-saisie" name="message" placeholder="Écrivez ici..." variant="outlined"></textarea>
                </div>
                <v-btn :loading="loading" class="bouton" height="48" variant="tonal" @click="isOpen = false">
                    Upload
                </v-btn>
                <button class="btn-close" @click="isOpen = false" aria-label="Fermer">&times;</button>
            </form>
        </div>
    </div>

</div>

<div class="reclam justify-self-center">
    <div class="titre text-center pt-8">
        <h3>Reclamations</h3>
    </div>
    <div class="reclamation-container mb-8">

        <ul class="reclamation-list">

            <li class="reclamation-item">
                <img src="/img/profile.jpeg" alt="Juliana" class="avatar">
                <div class="notif-content">
                    <p><strong>Juliana</strong> a aimé votre photo de profil.</p>
                    <span class="notif-time">Il y a 2 minutes</span>
                </div>
                <div class="unread-dot"></div>
            </li>

            <li class="reclamation-item">
                <img src="/img/photo.jpeg" alt="Bob" class="avatar">
                <div class="notif-content">
                    <p><strong>Bob</strong> vous a envoyé une invitation.</p>
                    <span class="notif-time">Hier à 14:30</span>
                </div>
            </li>

            <li class="reclamation-item">
                <img src="/img/photo.jpeg" alt="Bob" class="avatar">
                <div class="notif-content">
                    <p><strong>Bob</strong> vous a envoyé une invitation.</p>
                    <span class="notif-time">Hier à 14:30</span>
                </div>
            </li>
        </ul>
    </div>
</div>

<foot />
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

const isOpen = ref(null)
const popupContent = ref(['approbation', 'annonce']) // Pour stocker le texte dynamique

const openPopup = (message) => {
    isOpen.value = message // On ouvre le popup
}
const router = useRouter()
const consulter = () => {
    router.push('liste_membre')

}
const monTexteLong = ref('')
</script>

<style scoped>
.reclamation-container {
    width: 1000px;
    height: auto;
    background: rgb(100, 97, 97);
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
}

.reclamation-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.reclamation-item {
    display: flex;
    /* Aligne la photo et le texte côte à côte */
    align-items: center;
    padding: 12px;
    cursor: pointer;
    transition: background 0.2s;
}

.reclamation-item:hover {
    background-color: #f2f2f2;
}

.avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    /* Image ronde */
    margin-right: 12px;
}

.notif-content {
    flex: 1;
    /* Prend tout l'espace restant */
}

.notif-content p {
    margin: 0;
    font-size: 14px;
    color: #050505;
}

.notif-time {
    font-size: 12px;
    color: #050505;
    font-weight: 600;
}

/* Le petit point bleu pour les non-lues */
.unread-dot {
    width: 12px;
    height: 12px;
    background-color: #0866ff;
    border-radius: 50%;
    margin-left: 8px;
}

/* Style spécifique pour les non-lues */
.reclamation-item.unread {
    background-color: #ebf5ff;
}

.form-container {
    display: flex;
    flex-direction: column;
    /* Espace uniforme entre chaque section */
    padding: 10px;
}

.groupe {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* Aligne tout à gauche */

}

input {
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #444;
    background-color: #333;
    color: white;
}

textarea {
    width: 100%;
    height: 150px;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #444;
    background-color: #333;
    color: white;
}

.cards-container {
    display: flex;
    gap: 24px;
    justify-content: center;
    padding: 40px;
    background-color: #000;
    /* Fond noir global */
    height: auto;
}

.card {
    width: 100%;
    max-width: 400px;
    border-radius: 24px;
    overflow: hidden;
    /* Pour que les bords soient arrondis en haut */
    background-color: #1a1a1a;
    /* Fond gris sombre des cadres */
    display: flex;
    flex-direction: column;

}

.card-header {
    height: 240px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bg-green {
    background: linear-gradient(135deg, #00c28e, #1a9e7a);
}

.bg-yellow {
    background-color: #ffb31a;
}

.fan {
    width: 200px;
    height: 200px;
}

.membre-div {
    width: 200px;
    height: auto;
}

.masked-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.membre {
    width: 200px;
    height: 350px;
    object-fit: cover;

}

/* Contenu textuel */
.card-body {
    padding: 32px;
    color: white;
}

.brand1 {
    display: flex;
    justify-content: center;
    gap: 10px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ccc;
    line-height: 1.2;
    margin-bottom: 16px;
}

.logo-icon {
    width: 24px;
    height: 24px;
}

h3 {
    font-size: 28px;

    line-height: 1.2;
}

p {
    color: #999;
    line-height: 1.6;
    font-size: 16px;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 80px 10%;
    font-family: 'Arial', sans-serif;
}

.hero-text {
    flex: 1;
}

.hero-image {
    flex: 1;
}

p {
    font-size: 1.5rem;
    color: #746f6f;
    margin: 20px 0;
}

.tagline {
    font-size: 3.5rem;
    color: #00c2cb;
    font-weight: bold;
    letter-spacing: 1px;
}

.btn {
    padding: 15px 30px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 50px;
    cursor: pointer;
    color: #000;
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
    background: rgb(56, 54, 54);
    padding: 30px;
    border-radius: 16px;
    /* Bords arrondis */
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    /* Ombre portée douce */
    max-width: 600px;
    width: 100%;
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
