<template>

 <div class=" bg-[#0a190a]  grid grid-cols-2 p-8 lg:col-span-2 min-h-screen justify-center gap-10 ">

  <div class="grid md:grid-cols-2 max-h-[500px] max-w-5xl w-full mt-[20%] border border-gray-800 rounded-2xl overflow-y-auto">

    <div class="p-8 border border-gray-800 hover:bg-gray-800/30 transition-colors group relative " @click="afficher('procuration')">
      <div class="flex justify-between items-start">
        <div class="p-3 bg-teal-500/10 rounded-lg text-teal-400">
          <span class="mdi mdi-file-document-outline h-6 w-6"></span>
        </div>
        <span class="text-gray-600 group-hover:text-gray-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 7l-10 10M17 7H7M17 7v10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>
      <h3 class="text-white font-semibold mt-6 text-lg">Demande de procuration</h3>
      <p class="text-gray-400 mt-2 text-sm leading-relaxed">Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.</p>
    </div>

    <div class="p-8 border border-gray-800 hover:bg-gray-800/30 transition-colors group" @click="afficher('reclamation')">
      <div class="flex justify-between items-start">
        <div class="p-3 bg-purple-500/10 rounded-lg text-purple-400">
          <span class="mdi mdi-alert-box h-6 w-6"></span>
        </div>
        <span class="text-gray-600 group-hover:text-gray-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 7l-10 10M17 7H7M17 7v10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>
      <h3 class="text-white font-semibold mt-6 text-lg">Reclamation bourse</h3>
      <p class="text-gray-400 mt-2 text-sm leading-relaxed">Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.</p>
    </div>

    <div class="p-8 border border-gray-800 hover:bg-gray-800/30 transition-colors group" @click="afficher('certificat')">
      <div class="flex justify-between items-start">
        <div class="p-3 bg-blue-500/10 rounded-lg text-blue-400">
         <span class="mdi mdi-folder-arrow-up-outline h-6 w-6"></span>
        </div>
        <span class="text-gray-600 group-hover:text-gray-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 7l-10 10M17 7H7M17 7v10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>
      <h3 class="text-white font-semibold mt-6 text-lg">Save certificate</h3>
      <p class="text-gray-400 mt-2 text-sm leading-relaxed">Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.</p>
    </div>

    <div class="p-8 border border-gray-800 hover:bg-gray-800/30 transition-colors group" @click="afficher('modification')">
      <div class="flex justify-between items-start">
        <div class="p-3 bg-yellow-500/10 rounded-lg text-yellow-400">
         <span class="mdi mdi-account-edit h-6 w-6"></span>
        </div>
        <span class="text-gray-600 group-hover:text-gray-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 7l-10 10M17 7H7M17 7v10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>
      <h3 class="text-white font-semibold mt-6 text-lg">Modifier mes infos</h3>
      <p class="text-gray-400 mt-2 text-sm leading-relaxed">Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.</p>
    </div>
  </div>



<div class="lg:col-span-1 w-full h-full p-10 mb-6 rounded-lg max-w-5xl items-center justify-center overflow-y-auto" >

  <!-- demande de procuration -->
  <div v-if="open === 'procuration'" class=" mt-[20%]">
    <header class="flex justify-center items-center mb-8 border-b pb-4">
    <h1 class="text-2xl font-light italic items-center">Demande de procuration</h1>
  </header>
  <div class="flex items-center gap-4 mt-6 mb-3 overflow-y-auto max-h-[600px]" >
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparentborder-gray-300 bg-white py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Faire une demande
      </button>
    </div>
    <span class="font-light italic text-2xl">Liste de mes demandes</span>
    <hr>
   <div class="max-w-6xl py-5 mx-auto overflow-hidden">
    <table class="min-w-full table-fixed border-separate border-spacing-0">
      <thead>
        <tr class="text-left">
          <th class="pb-4 pt-2 px-4 text-sm font-semibold text-white">Name</th>
          <th class="pb-4 pt-2 px-4 text-sm font-semibold text-white">Description</th>
          <th class="pb-4 pt-2 px-4 text-sm font-semibold text-white">Date</th>
          <th class="pb-4 pt-2 px-4 text-sm font-semibold text-white">Etat</th>
          <th class="pb-4 pt-2 px-4"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-800 border-t border-gray-800">
        <tr class="hover:bg-white/5 transition-colors">
          <td class="py-4 px-4 text-sm font-bold text-white">Lindsay Walton</td>
          <td class="py-4 px-4 text-sm text-gray-400">Front-end Developer</td>
          <td class="py-4 px-4 text-sm text-gray-400">lindsay.walton@example.com</td>
          <td class="py-4 px-4 text-sm text-gray-400">Member</td>
          <td class="py-4 px-4 text-right text-sm font-medium">
            <a href="#" class="text-indigo-500 hover:text-indigo-400">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>

    <!-- reclamation -->
    <div v-if="open === 'reclamation'" class="">
    <header class="flex justify-center items-center mb-8 border-b pb-4">
    <h1 class="text-2xl font-light italic items-center">Reclamation bourse</h1>
  </header>
  <div class="min-h-screen p-8 text-white font-sans">
    <div class="max-w-xl space-y-6 ">

    <div>
      <label for="username" class="block text-sm font-bold mb-2">
        Username
      </label>
      <div class="flex rounded-md  border border-gray-700 focus-within:border-indigo-500 transition shadow-sm">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="janesmith"
          class="block w-full border-0 bg-transparent py-2 pl-1 pr-3 text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
        >
    </div>
  </div>

    <div>
      <label for="about" class="block text-sm font-bold mb-2">
        Decrivez-votre reclamation
      </label>
      <textarea
        id="about"
        name="about"
        rows="4"
        class="block w-full rounded-md border border-gray-700 py-2 px-3 text-white shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      ></textarea>
      <p class="mt-2 text-sm text-gray-400">
        Soyez claire et precis
      </p>
    </div>
    <div class="flex items-center gap-4">
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparentborder-gray-300 bg-white py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Envoyer
      </button>
    </div>
</div>

  <div class="max-w-6xl py-5 mx-auto overflow-hidden">
    <table class="min-w-full table-fixed border-separate border-spacing-0">
      <thead>
        <tr class="text-left">
          <th class="pb-4 pt-2 px-4 text-sm font-semibold text-white">Name</th>
          <th class="pb-4 pt-2 px-4 text-sm font-semibold text-white">Description</th>
          <th class="pb-4 pt-2 px-4 text-sm font-semibold text-white">Date</th>
          <th class="pb-4 pt-2 px-4 text-sm font-semibold text-white">Etat</th>
          <th class="pb-4 pt-2 px-4"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-800 border-t border-gray-800">
        <tr class="hover:bg-white/5 transition-colors">
          <td class="py-4 px-4 text-sm font-bold text-white">Lindsay Walton</td>
          <td class="py-4 px-4 text-sm text-gray-400">Front-end Developer</td>
          <td class="py-4 px-4 text-sm text-gray-400">lindsay.walton@example.com</td>
          <td class="py-4 px-4 text-sm text-gray-400">Member</td>
          <td class="py-4 px-4 text-right text-sm font-medium">
            <a href="#" class="text-indigo-500 hover:text-indigo-400">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>


<!-- modification -->
<div v-if="open === 'modification'" >
    <header class="flex justify-center items-center mb-8 border-b pb-4">
    <h1 class="text-2xl font-light italic items-center">Modifier votre profile</h1>
  </header>
  <div class="h-fit  p-8 text-white font-sans ">
  <div class="max-w-4xl">
    <div class="mb-8">
      <h2 class="text-base font-semibold leading-7 text-white">Personal Information</h2>
      <p class="mt-1 text-sm leading-6 text-gray-400">Use a permanent address where you can receive mail.</p>
    </div>

    <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6 overflow-y-auto max-h-[500px]">

      <div class="sm:col-span-3">
        <label for="first-name" class="block text-sm font-medium leading-6 text-white mb-2">First name</label>
        <input type="text" name="first-name" id="first-name" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
      </div>

      <div class="sm:col-span-3">
        <label for="last-name" class="block text-sm font-medium leading-6 text-white mb-2">Last name</label>
        <input type="text" name="last-name" id="last-name" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
      </div>

      <div class="sm:col-span-4">
        <label for="date-of-birth" class="block text-sm font-medium leading-6 text-white mb-2">Date de naissance</label>
        <input type="date" name="date-of-birth" id="date-of-birth" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
      </div>

      <div class="sm:col-span-3 ">
        <div class="">
          <label for="country" class="block text-sm font-medium leading-6 text-white mb-2">Profession</label>
        <select id="country" name="profession" class="block w-full rounded-md border-0 bg-white/5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <option value="etudiant">Etudiant(e)</option>
          <option value="travailleur">Travailleur(euse)</option>
        </select>
        </div>
      </div>

      <div class="sm:col-span-3">
            <label for="university" class="block text-sm font-medium leading-6 text-white mb-2">Universite</label>
            <input type="text" name="university" id="university" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <label for="field" class="block text-sm font-medium leading-6 text-white mb-2">filiere</label>
            <input type="text" name="field" id="field" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <label for="student-id" class="block text-sm font-medium leading-6 text-white mb-2">Matricule AMCI</label>
            <input type="text" name="student-id" id="student-id" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <label for="occupation" class="block text-sm font-medium leading-6 text-white mb-2">Poste/Metier</label>
            <input type="text" name="occupation" id="occupation" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
      </div>

      <div class="sm:col-span-4">
        <label for="passport-number" class="block text-sm font-medium leading-6 text-white mb-2">Numero Passeport</label>
        <input type="text" name="passport-number" id="passport-number" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
      </div>

      <div class="sm:col-span-4">
        <label for="arrivee" class="block text-sm font-medium leading-6 text-white mb-2">Arrivee au Maroc</label>
        <input type="date" name="arrivee" id="arrivee" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
      </div>

      <div class="sm:col-span-3">
        <label for="address" class="block text-sm font-medium leading-6 text-white mb-2">Domicile</label>
        <input type="text" name="address" id="address" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
      </div>

      <div class="sm:col-span-3">
        <label for="email" class="block text-sm font-medium leading-6 text-white mb-2">Email</label>
        <input type="email" name="email" id="email" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
      </div>

      <div class="sm:col-span-3">
        <label for="contact" class="block text-sm font-medium leading-6 text-white mb-2">Contact</label>
        <input type="text" name="contact" id="contact" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
      </div>

      <div class="sm:col-span-4">
        <label for="reseaux" class="block text-sm font-medium leading-6 text-white mb-2">reseaux sociaux</label>
        <input type="text" name="reseaux" id="reseaux" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
      </div>

    </div>

    <div class="flex items-center gap-4 mt-6">
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparentborder-gray-300 bg-white py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Envoyer
      </button>
    </div>
    <div class="mt-10 border-t border-white/10 pt-10"></div>
  </div>
</div>
</div>

<!-- certificate -->
 <div v-if="open === 'certificat'" >
<div class=" p-10 text-white font-sans">
  <div class="max-w-4xl">
       <header class="flex justify-center items-center mb-8 border-b pb-4">
    <h1 class="text-2xl font-light italic items-center">Save my certificate</h1>
  </header>
    <label class="block text-sm font-medium leading-6 text-white mb-2">
      Attachments
    </label>

    <div class="mt-2 flex justify-center rounded-lg border-2 border-dashed border-white/10 px-6 py-10 bg-white/5 hover:border-indigo-500 hover:bg-white/10 transition-all group">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-500 group-hover:text-indigo-400 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>

        <div class="mt-4 flex text-sm leading-6 text-gray-400 justify-center">
          <label for="doc-upload" class="relative cursor-pointer rounded-md font-semibold text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-[#0f172a] hover:text-indigo-300">
            <span>Upload a file</span>
            <input id="doc-upload" name="doc-upload" type="file" class="sr-only" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt">
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>

        <p class="text-xs leading-5 text-gray-500 mt-1">
          PDF, DOCX or XLS up to 20MB
        </p>
      </div>
    </div>

    <div class="sm:col-span-3 mt-6">
        <label for="annee-scolaire" class="block text-sm font-medium leading-6 text-white mb-2">Annee scolaire</label>
        <input type="text" name="annee-scolaire" id="annee-scolaire" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
    </div>
     <div class="flex items-center gap-4 mt-6">
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparentborder-gray-300 bg-white py-2 px-4 text-sm font-medium  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Envoyer
      </button>
    </div>
  </div>
</div>
</div>





</div>
</div>






</template>

<script setup>
import {
    ref
} from 'vue'
const open = ref('')
function afficher(message) {
    open.value = message
}
</script>

<style>

</style>
