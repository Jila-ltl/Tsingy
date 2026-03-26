<template>
<div class="sidebar-wrapper">
    <div class="haikei-wave">
        <nav class="content">
            <h2>Filtrage</h2>

            <div class=" flex flex-column">
                <select   class=" mt-5 w-64 border bg-slate-700 border-white rounded-lg py-1 px-3 active:border-red-500 outline-none"  >
                    <option value="" disabled selected>Select Year</option>
                    <option v-for="item in year" :key="item" :value="item">{{ item }}</option>
                </select>

                <select   class=" mt-5 w-64 border bg-slate-700 border-white rounded-lg py-1 px-3 active:border-red-500 outline-none" >
                    <option value="" disabled selected>Select Profession</option>
                    <option v-for="item in profession" :key="item" :value="item">{{ item }}</option>
                </select>

                <input type="text" class=" mt-5 w-64 border bg-slate-700 border-white rounded-lg py-1 px-3 active:border-red-500 outline-none"  placeholder=" Etablissement" />

                <button class=" mt-5 w-64 border bg-green-700 border-white rounded-lg py-1 px-3 active:border-red-500 outline-none" >
                    <span class="mdi mdi-filter"></span>
                    <span>Go</span>
                </button>

            </div>

        </nav>
    </div>

</div>
</template>

<script setup>
import {
    ref
} from 'vue';

const year = ref([2025, 2024, 2023, 2022]);
const profession = ref(['Etudiant', 'Travailleur']);
</script>

<style scoped>
li {
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
    mask-size: 80cqmax;
    background-image: none;

    display: flex;
    flex-direction: column;
    /* Aligne les éléments verticalement */
    justify-content: center;
    /* Centre le contenu au milieu de la hauteur */
    padding-left: 30px;

}

.content {
    padding: 5px;

}
</style>
