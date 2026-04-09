<template>
  <!-- <div id="app" class="w-full h-screen flex"> -->
  <div class="w-full flex h-[91vh] overflow-hidden bg-[url('/img/tsingy.jpg')] backdrop-blur-md bg-cover bg-center">
    <div class="absolute inset-0 z-0 bg-gradient-to-br from-black/90 via-black/70 to-black/30" />
    <div class=" w-[15%] h-full backdrop-blur-md flex flex-column items-center justify-center">

      <select v-model="selectedYear" class=" mt-5 w-64 border bg-slate-700 border-white rounded-lg py-1 px-3">
        <option disabled selected value="">Select Year</option>
        <option v-for="item in years" :key="item" :value="item">{{ item }}</option>
      </select>

      <select v-model="selectedProfession" class=" mt-5 w-64 border bg-slate-700 border-white rounded-lg py-1 px-3">
        <option disabled selected value="">Select Profession</option>
        <option value="etudiant">Etudiant(e)</option>
        <option value="travailleur">Travailleur(euse)</option>

      </select>

      <input v-model="etablissement" class=" mt-5 w-64 border bg-slate-700 border-white rounded-lg py-1 px-3 " placeholder=" Etablissement" type="text">

      <button class=" mt-5 w-64 border bg-green-700 border-white rounded-lg py-1 px-3 hover:bg-green-600 transition-colors hover:scale-105" @click="showSelectedData">
        <span class="mdi mdi-filter" />
        <span>Go</span>
      </button>
      {{ appliedFilters.profession }},{{ appliedFilters.year }},{{ appliedFilters.text }}

    </div>

    <div class=" w-[85%] h-full  flex flex-col overflow-hidden">
      <header class=" z-50 flex justify-center items-center mb-8 border-b pb-4">
        <h1 class=" text-2xl font-light italic items-center">Liste Membre Tsingy Marrakech</h1>
      </header>
      <div class=" z-50 w-full items-center flex justify-center">
        <div class=" bg-stone-700 py-3 px-3 flex flex-row rounded-full w-[350px]">
          <span class="mdi mdi-magnify" />
          <input
            v-model="searchQuery"
            class=" ml-2 outline-none w-full"
            placeholder="Rechercher..."
            type="text"
            @keyup="find_user(searchQuery)"
          >
        </div>
      </div>
      <!-- <div class="row pl-72"> -->
      <div class=" overflow-y-auto">
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 ">
          <div v-for="item,i in search_list" :key="i" class="grid grid-cols-1 gap-5 p-5 cursor-pointer hover:scale-110 hover:z-100" @click="openPopup_(item)">
            <div class="relative w-[200px] h-[200px] overflow-hidden bg-gray-900 rounded-[55%_45%_30%_70%_/_70%_60%_40%_30%]">
              <img alt="Portrait" class="absolute inset-0 w-full h-full object-cover" :src="item.photo">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40" />
            </div>
            <!-- <div class="mask-container">
                        <img :src="item.photo" alt="User silhouette" />
                    </div> -->
            <div class="relative pt-16 right-8 profile-info ">
              <div>
                <span>Nom:</span>
                <span v-html="item.nom" />
              </div>
              <div>
                <span>Prénom:</span>
                <span v-text="item.prenom" />
              </div>
              <div>
                <span>Rôle:</span>
                <span v-text="item.profession" />
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- DIALOG  -->
      <div v-if="isShown" class=" w-full h-full backdrop-blur-sm  fixed top-0 left-0 flex items-center justify-center">
        <div class="  w-full h-full fixed top-0 left-0 z-10 cursor-pointer" />
        <div class=" bg-stone-700 text-white px-2 py-1  rounded-lg shadow-lg border border-white flex flex-col z-20">
          <div class="flex w-full justify-end cursor-pointer" @click="isShown=false">
            <span class="mdi mdi-window-close" />
          </div>
          <div class="grid grid-cols-2 items-left w-[700px] max-h-[700px]">
            <div class=" m-5">
              <div class=" mask-container w-[350px] h-[350px]">
                <img alt="User silhouette" :src="popupContent_.photo">
              </div>
              <div>
                <span>Nom: </span>
                <span v-text="popupContent_.nom" />
              </div>
              <div>
                <span>Prénom: </span>
                <span v-text="popupContent_.prenom" />
              </div>
              <div>
                <span>Role: </span>
                <span v-text="popupContent_.role" />
              </div>
              <hr>
            </div>
            <div class="">
              <h2 class="text-left font-bold mb-2 ">Information </h2>
              <span class=" border-b border-white" />
              <div>
                <span>Nom: </span>
                <span v-text="popupContent_.nom" />
              </div>
              <div>
                <span>Prénom: </span>
                <span v-text="popupContent_.prenom" />
              </div>
              <div>
                <span>Role: </span>
                <span v-text="popupContent_.role" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  import {
    computed,
    ref,
  } from 'vue'

  // 1. La source de données
  const items = ref(['Dashboard', 'Profil Utilisateur', 'Paramètres', 'Statistiques', 'Messages'])

  // 2. La variable liée au champ de saisie
  const searchQuery = ref('')

  // 3. La logique de filtrage (réactive)
  const filteredItems = computed(() => {
    return items.value.filter(item =>
      item.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  const isOpen = ref(false)
  const popupContent = ref({
    Nom: 'Juliana',
    age: 20,
  }) // Pour stocker le texte dynamique

  function openPopup (message) {
    popupContent.value = message // On définit le message
    isOpen.value = true // On ouvre le popup
  }

  const isShown = ref(false)
  const search_list = ref([])
  const popupContent_ = ref({
    nom: ' ',
    prenom: ' ',
    role: '',
  }) // Pour stocker le texte dynamique

  function find_user (nom) {
    const temp_list = []
    for (const element of users_list.value) {
      if (element.nom.toLowerCase().includes(nom.toLowerCase())) {
        temp_list.push({
          nom: element.nom.toLowerCase().replace(nom.toLowerCase(), `<span class="bg-yellow-800">${nom}</span>`),
          prenom: element.prenom,
          role: element.role,
        })
      }
    }
    search_list.value = temp_list

    // return users_list.value.find(user => user.nom === nom)
  }

  function openPopup_ (message) {
    popupContent_.value = message // On définit le message
    isShown.value = true // On ouvre le popup
  }

  onMounted(() => {
    search_list.value = users_list.value
  })

  const years = Array.from(
    { length: new Date().getFullYear() - 2007 + 1 },
    (_, i) => 2007 + i,
  )

  // Dans ton setup ou data
  const selectedYear = ref('')
  const selectedProfession = ref('')
  const etablissement = ref('')

  const appliedFilters = ref({
    year: '',
    profession: '',
    text: '',
  })

  function showSelectedData () {
    // Mise à jour des filtres appliqués
    appliedFilters.value = {
      year: selectedYear.value,
      profession: selectedProfession.value,
      text: etablissement.value,
    }
    const temp_list = []
    for (const element of users_list.value) {
      if (element.date_arrivee_maroc == Number(filters.year)) {
        temp_list.push({
          nom: element.nom,
          prenom: element.prenom,
          profession: element.profession,
        })
      }
    }
    search_list.value = temp_list
  // // 3. Filtrage et affectation à search_list
  //   search_list.value = users_list.filter(user => {
  //   const filters = appliedFilters.value;

  //   const matchYear = !filters.year || user.date_arrivee_maroc == Number(filters.year);
  //   const matchProfession = !filters.profession || user.profession === filters.profession;

  //   const searchLow = filters.text.toLowerCase();
  //   const matchEtab = !filters.text ||
  //                     (user.univ && user.univ.toLowerCase().includes(searchLow)) ||
  //                     (user.metier && user.metier.toLowerCase().includes(searchLow));

  //   return matchYear && matchProfession && matchEtab;
  // });
  }

  const users_list = ref([
    {
      nom: 'Rakoto',
      prenom: 'Andry',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2003-05-12',
      date_arrivee_maroc: 2021,
      profession: 'etudiant',
      filiere: 'Génie Informatique',
      univ: 'Université Cadi Ayyad',
      code_amci: '202500001',
      metier: '',
      numero_passeport_malgache: 'AB123456',
      domicile_a_marrakech: 'Guéliz',
      email: 'andry.rakoto@gmail.com',
      contact: '+212612345678',
      nom_facebook: 'Andry Rakoto Mada',
    },
    {
      nom: 'Raza',
      prenom: 'Miora',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1995-11-20',
      date_arrivee_maroc: 2014,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Développeur Fullstack',
      numero_passeport_malgache: 'AC987654',
      domicile_a_marrakech: 'Daoudiate',
      email: 'miora.raza@pro.mg',
      contact: '+212711223344',
      nom_facebook: 'Miora Raza Dev',
    },
    {
      nom: 'Andrian',
      prenom: 'Feno',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2004-02-28',
      date_arrivee_maroc: 2023,
      profession: 'etudiant',
      filiere: 'Économie',
      univ: 'FSJES Marrakech',
      code_amci: '202500002',
      metier: '',
      numero_passeport_malgache: 'AD456123',
      domicile_a_marrakech: 'M\'hamid',
      email: 'feno.andrian@outlook.com',
      contact: '+212655443322',
      nom_facebook: 'Feno Andrian',
    },
    {
      nom: 'Raman',
      prenom: 'Lova',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1992-08-15',
      date_arrivee_maroc: 2010,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Expert Comptable',
      numero_passeport_malgache: 'AE789321',
      domicile_a_marrakech: 'Hivernage',
      email: 'lova.raman@gmail.com',
      contact: '+212699887766',
      nom_facebook: 'Lova Raman Accountant',
    },
    {
      nom: 'Randria',
      prenom: 'Tovo',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2002-09-30',
      date_arrivee_maroc: 2020,
      profession: 'etudiant',
      filiere: 'Médecine',
      univ: 'FMPM Marrakech',
      code_amci: '202500003',
      metier: '',
      numero_passeport_malgache: 'AF654987',
      domicile_a_marrakech: 'Semlalia',
      email: 'tovo.randria@amci.ma',
      contact: '+212600112233',
      nom_facebook: 'Tovo Randria Med',
    },
    {
      nom: 'Benali',
      prenom: 'Youssef',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1998-04-12',
      date_arrivee_maroc: 2016,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Ingénieur Logiciel',
      numero_passeport_malgache: 'AG147258',
      domicile_a_marrakech: 'Massira 2',
      email: 'youssef.benali@tech.ma',
      contact: '+212644556677',
      nom_facebook: 'Youssef Benali Dev',
    },
    {
      nom: 'Rabeman',
      prenom: 'Nary',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2005-01-10',
      date_arrivee_maroc: 2024,
      profession: 'etudiant',
      filiere: 'Physique-Chimie',
      univ: 'FST Marrakech',
      code_amci: '202500004',
      metier: '',
      numero_passeport_malgache: 'AH369852',
      domicile_a_marrakech: 'Targa',
      email: 'nary.rabe@gmail.com',
      contact: '+212722334455',
      nom_facebook: 'Nary Rabeman',
    },
    {
      nom: 'Sitraka',
      prenom: 'Tahina',
      photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1990-06-22',
      date_arrivee_maroc: 2008,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Infirmier Polyvalent',
      numero_passeport_malgache: 'AI258963',
      domicile_a_marrakech: 'Sidi Youssef Ben Ali',
      email: 'tahina.sitraka@santemg.com',
      contact: '+212633221100',
      nom_facebook: 'Tahina Sitraka',
    },
    {
      nom: 'Mialy',
      prenom: 'Hasina',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2003-12-05',
      date_arrivee_maroc: 2022,
      profession: 'etudiant',
      filiere: 'Management',
      univ: 'ENCG Marrakech',
      code_amci: '202500005',
      metier: '',
      numero_passeport_malgache: 'AJ123789',
      domicile_a_marrakech: 'Issil',
      email: 'hasina.mialy@student.ma',
      contact: '+212644778899',
      nom_facebook: 'Hasina Mialy',
    },
    {
      nom: 'Ralamb',
      prenom: 'Koloina',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1994-03-18',
      date_arrivee_maroc: 2012,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Architecte d\'intérieur',
      numero_passeport_malgache: 'AK951753',
      domicile_a_marrakech: 'Palmerie',
      email: 'kolo.ralamb@arch.mg',
      contact: '+212688990011',
      nom_facebook: 'Koloina Ralamb',
    },
    {
      nom: 'Solo',
      prenom: 'Njaka',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2004-07-14',
      date_arrivee_maroc: 2023,
      profession: 'etudiant',
      filiere: 'Droit',
      univ: 'FSJES Marrakech',
      code_amci: '202500006',
      metier: '',
      numero_passeport_malgache: 'AL842615',
      domicile_a_marrakech: 'Daoudiate',
      email: 'njaka.solo@gmail.com',
      contact: '+212712345098',
      nom_facebook: 'Njaka Solo Jr',
    },
    {
      nom: 'Razafy',
      prenom: 'Tsiry',
      photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1991-10-10',
      date_arrivee_maroc: 2009,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Responsable Ventes',
      numero_passeport_malgache: 'AM357159',
      domicile_a_marrakech: 'Victor Hugo',
      email: 'tsiry.razafy@biz.ma',
      contact: '+212655009988',
      nom_facebook: 'Tsiry Razafy',
    },
    {
      nom: 'Tiana',
      prenom: 'Rado',
      photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2002-05-25',
      date_arrivee_maroc: 2021,
      profession: 'etudiant',
      filiere: 'Génie Civil',
      univ: 'FST Marrakech',
      code_amci: '202500007',
      metier: '',
      numero_passeport_malgache: 'AN159482',
      domicile_a_marrakech: 'Amerchich',
      email: 'rado.tiana@edu.ma',
      contact: '+212611228844',
      nom_facebook: 'Rado Tiana Civil',
    },
    {
      nom: 'Hery',
      prenom: 'Fanilo',
      photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1993-01-05',
      date_arrivee_maroc: 2011,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Technicien Réseaux',
      numero_passeport_malgache: 'AO753951',
      domicile_a_marrakech: 'Sidi Abbad',
      email: 'fanilo.hery@inwi.ma',
      contact: '+212788554433',
      nom_facebook: 'Fanilo Hery Net',
    },
    {
      nom: 'Feno',
      prenom: 'Aina',
      photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2006-03-12',
      date_arrivee_maroc: 2024,
      profession: 'etudiant',
      filiere: 'Mathématiques',
      univ: 'FSSM Marrakech',
      code_amci: '202500008',
      metier: '',
      numero_passeport_malgache: 'AP486217',
      domicile_a_marrakech: 'Semlalia',
      email: 'aina.feno@math.ma',
      contact: '+212600993322',
      nom_facebook: 'Aina Feno',
    },
    {
      nom: 'Vola',
      prenom: 'Noro',
      photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2a04?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1989-12-12',
      date_arrivee_maroc: 2007,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Gestionnaire RH',
      numero_passeport_malgache: 'AQ153759',
      domicile_a_marrakech: 'Guéliz',
      email: 'noro.vola@rh.ma',
      contact: '+212677112200',
      nom_facebook: 'Noro Vola',
    },
    {
      nom: 'Lala',
      prenom: 'Hery',
      photo: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2003-08-20',
      date_arrivee_maroc: 2022,
      profession: 'etudiant',
      filiere: 'Agronomie',
      univ: 'IAV Marrakech',
      code_amci: '202500009',
      metier: '',
      numero_passeport_malgache: 'AR852147',
      domicile_a_marrakech: 'M\'hamid',
      email: 'hery.lala@agri.ma',
      contact: '+212755331199',
      nom_facebook: 'Lala Hery',
    },
    {
      nom: 'Sanda',
      prenom: 'Fitia',
      photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1997-02-14',
      date_arrivee_maroc: 2015,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Graphiste Senior',
      numero_passeport_malgache: 'AS963258',
      domicile_a_marrakech: 'Massira 1',
      email: 'fitia.sanda@art.mg',
      contact: '+212622446688',
      nom_facebook: 'Fitia Sanda Design',
    },
    {
      nom: 'Zo',
      prenom: 'Tiavina',
      photo: 'https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2004-11-11',
      date_arrivee_maroc: 2024,
      profession: 'etudiant',
      filiere: 'Anglais',
      univ: 'FLSH Marrakech',
      code_amci: '202500010',
      metier: '',
      numero_passeport_malgache: 'AT741852',
      domicile_a_marrakech: 'Azli',
      email: 'tiavina.zo@gmail.com',
      contact: '+212611773344',
      nom_facebook: 'Zo Tiavina',
    },
    {
      nom: 'Bema',
      prenom: 'Jean',
      photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1985-04-04',
      date_arrivee_maroc: 2007,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Chef de Projet BTP',
      numero_passeport_malgache: 'AU321654',
      domicile_a_marrakech: 'Targa',
      email: 'jean.bema@construction.ma',
      contact: '+212688442211',
      nom_facebook: 'Jean Bema Pro',
    },
    {
      nom: 'Naina',
      prenom: 'Rindra',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2005-05-05',
      date_arrivee_maroc: 2023,
      profession: 'etudiant',
      filiere: 'Informatique',
      univ: 'EST Marrakech',
      code_amci: '202500011',
      metier: '',
      numero_passeport_malgache: 'AV951846',
      domicile_a_marrakech: 'Daoudiate',
      email: 'rindra.naina@est.ma',
      contact: '+212700445566',
      nom_facebook: 'Rindra Naina',
    },
    {
      nom: 'Faly',
      prenom: 'Bakoly',
      photo: 'https://images.unsplash.com/photo-1544717305-27a734ef1904?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1993-07-19',
      date_arrivee_maroc: 2013,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Traducteur Arabe-Français',
      numero_passeport_malgache: 'AW456789',
      domicile_a_marrakech: 'Mellah',
      email: 'bakoly.faly@lang.mg',
      contact: '+212644110022',
      nom_facebook: 'Bakoly Faly',
    },
    {
      nom: 'Tiana',
      prenom: 'Tojo',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2002-01-28',
      date_arrivee_maroc: 2020,
      profession: 'etudiant',
      filiere: 'Biologie',
      univ: 'FSSM Marrakech',
      code_amci: '202500012',
      metier: '',
      numero_passeport_malgache: 'AX753159',
      domicile_a_marrakech: 'Semlalia',
      email: 'tojo.tiana@bio.ma',
      contact: '+212699332211',
      nom_facebook: 'Tojo Tiana',
    },
    {
      nom: 'Rasoa',
      prenom: 'Lanja',
      photo: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1988-10-30',
      date_arrivee_maroc: 2008,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Manager d\'Hôtel',
      numero_passeport_malgache: 'AY159753',
      domicile_a_marrakech: 'Hivernage',
      email: 'lanja.rasoa@hotel.ma',
      contact: '+212633558877',
      nom_facebook: 'Lanja Rasoa',
    },
    {
      nom: 'Kely',
      prenom: 'Sanda',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2006-02-14',
      date_arrivee_maroc: 2025,
      profession: 'etudiant',
      filiere: 'Tourisme',
      univ: 'ENCG Marrakech',
      code_amci: '202500013',
      metier: '',
      numero_passeport_malgache: 'AZ357951',
      domicile_a_marrakech: 'Guéliz',
      email: 'sanda.kely@tourisme.ma',
      contact: '+212677004411',
      nom_facebook: 'Sanda Kely Travel',
    },
    {
      nom: 'Mamy',
      prenom: 'Nirina',
      photo: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1994-05-17',
      date_arrivee_maroc: 2014,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Consultant IT',
      numero_passeport_malgache: 'BA246813',
      domicile_a_marrakech: 'Issil',
      email: 'mamy.nirina@consult.mg',
      contact: '+212711447788',
      nom_facebook: 'Mamy Nirina',
    },
    {
      nom: 'Riva',
      prenom: 'Tovo',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2004-06-09',
      date_arrivee_maroc: 2023,
      profession: 'etudiant',
      filiere: 'Physique',
      univ: 'FSSM Marrakech',
      code_amci: '202500014',
      metier: '',
      numero_passeport_malgache: 'BB135792',
      domicile_a_marrakech: 'Semlalia',
      email: 'tovo.riva@gmail.com',
      contact: '+212644228855',
      nom_facebook: 'Tovo Riva',
    },
    {
      nom: 'Haja',
      prenom: 'Solo',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1992-09-21',
      date_arrivee_maroc: 2012,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Analyste Financier',
      numero_passeport_malgache: 'BC975314',
      domicile_a_marrakech: 'Sidi Abbad',
      email: 'solo.haja@bank.ma',
      contact: '+212766339900',
      nom_facebook: 'Haja Solo Finance',
    },
    {
      nom: 'Erick',
      prenom: 'Lova',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '2003-03-03',
      date_arrivee_maroc: 2021,
      profession: 'etudiant',
      filiere: 'Marketing',
      univ: 'ENCG Marrakech',
      code_amci: '202500015',
      metier: '',
      numero_passeport_malgache: 'BD864209',
      domicile_a_marrakech: 'Daoudiate',
      email: 'lova.erick@gmail.com',
      contact: '+212622558833',
      nom_facebook: 'Lova Erick',
    },
    {
      nom: 'Andry',
      prenom: 'Hery',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=400&fit=crop',
      date_de_naissance: '1990-01-01',
      date_arrivee_maroc: 2010,
      profession: 'travailleur',
      filiere: '',
      univ: '',
      code_amci: '',
      metier: 'Ingénieur Électricien',
      numero_passeport_malgache: 'BE102030',
      domicile_a_marrakech: 'Targa',
      email: 'hery.andry@elec.ma',
      contact: '+212744889911',
      nom_facebook: 'Hery Andry Elect',
    },
  ])

</script>

<style scoped>

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

.profile-info {
    margin-top: -55px;
    padding-left: 30%;
}

.profile-info p {
    margin: 5px 0;
    /* Réduit l'espace entre les lignes de texte */
    font-size: 10px;
    color: #eee;

}

/* 1. L'arrière-plan (Overlay) */

</style>
