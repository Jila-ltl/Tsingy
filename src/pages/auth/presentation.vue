<template>
  <section id="mot_sg" class="bg-white flex flex-col h-fit pb-10 items-center pt-5 gap-4">
    <span class=" text-4xl font-semibold text-gray-900 mb-4">
          Mot de la Secrétaire Générale
        </span>

    <div class="max-w-5xl mx-auto flex items-center gap-10">
        <!-- Image -->
      <div class="w-1/3">
        <img
          src="/img/waren.jpeg"
          class="rounded-xl shadow-md object-cover w-full h-[100%]"
        />
      </div>

      <!-- Texte -->
      <div class="w-2/3">
        <p class="text-gray-600 text-2xl leading-relaxed">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias odit qui illum quisquam voluptates
          cum eum eaque? Minus eius molestias beatae tenetur sequi non facilis a voluptatum illo, quaerat consectetur!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio laudantium corporis ullam provident totam
          voluptatum corupti neque ipsam voluptatibus eligendi quidem magnam dignissimos laboriosam cupiditate, officiis aut odit odio et!
        </p>

        <p class="text-gray-600 text-2xl mt-4">
          Nous espérons que vous trouverez ici un espace d’échange,
          de solidarité et de partage.
        </p>
      </div>
    </div>
</section>
<section class="bg-white h-screen m-0 flex flex-col gap-8">
  <div class="text-center">
      <span class="text-4xl font-semibold">Les membres de bureau de Tsingy Marrakech</span>
  </div>
  <div class="pres flex flex-col gap-5 items-center">
      <div v-for="row, index in rows" :key="index" class="flex flex-row gap-5">
          <div v-for="member, i in row" :key="i"
              class="group relative w-[300px] h-[400px] transform transition-transform duration-300 even:translate-y-16 hover:scale-105">
          <img :src="member.image" class="w-full h-full rounded-lg shadow-lg object-cover  transition-colors" alt="">
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/5 to-transparent transition-colors duration-300 rounded-lg group-hover:bg-black/50 "></div>
          <div class="absolute bottom-0 p-6 text-white flex flex-col">
             <span class=" text-md opacity-80"> {{ member.poste }}</span>
             <span class="text-xl font-bold"> {{ member.nom }}</span>
             <span class="text-xl font-bold"> {{ member.det }}</span>
          </div>
          </div>
      </div>

    </div>
</section>
</template>

<script  setup>

 import { ref} from 'vue'
const membres = [
  {
    poste: "Secrétaire générale (SG)",
    nom: "Marie Warenska Jocya Ralison",
    image: "/img/waren.jpeg",
    details: {
      ecole: "ENCG",
      filiere: "Audit",
      niveau: "4ème année",
      role: "Coordination générale"

    }
  },
  {
    poste: "Secrétaire générale adjointe",
    nom: "Jade Ismaël",
    image: "/img/jade.jpeg",
    details: {
      ecole: "FSJES",
      filiere: "Droit",
      niveau: "3ème année",
      role: "Support SG"
    }
  },
  {
    poste: "Trésorière",
    nom: "Valisoa Razaiarimalala",
    image: "/img/waren.jpeg",
    details: {
      ecole: "FSJES",
      filiere: "Economie",
      niveau: "3ème année",
      role: "Gestion finances"
    }
  },
  {
    poste: "Chargé culturel",
    nom: "Juliana Razafindramanana",
    image: "/img/juliana.jpeg",
    details: {
      ecole: "ENSA",
      filiere: "Cycle préparatoire",
      niveau: "2ème année",
      role: "Organisaton des événements"
    }
  },
  {
    poste: "Chargé sportif",
    nom: "Guillot Harizaza",
    image: "/img/guillot.jpeg",
    details: {
      ecole: "ENSA",
      filiere: "Cycle préparatoire",
      niveau: "1ère année",
      role: "Gestion des activités sportives"
    }
  },
  {
    poste: "Responsable logistique",
    nom: "Guiot Ranaivomanana",
    image: "/img/waren.jpeg",
    details: {
      ecole: "FST",
      filiere: "MISA",
      niveau: "4ème année",
      role: "Logistique"
    }
  },
  {
    poste: "Responsable communication",
    nom: "Ulrica Chadia Baozaka",
    image: "/img/chadia.jpeg",
    details: {
      ecole: "ENCG",
      filiere: "Commerce et Gestion",
      niveau: "2ème année",
      role: "Communication des informations"
    }
  },
  {
    poste: "Responsable académique",
    nom: "Francia Arimelimanjaka",
    image: "/img/francia.jpeg",
    details: {
      ecole: "FSJES",
      filiere: "Droit",
      niveau: "3ème année",
      role: "Affaires académiques"
    }
  }]

  const rows = [
  [membres[0], membres[1], membres[2], membres[3]],
  [membres[4],membres[5],membres[6],membres[7]]
]
</script>

<style scoped>
.zigzag-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes */
  gap: 20px;
  padding: 40px;
}

.image-wrapper img {
  width: 100%;
  border-radius: 8px;
  display: block;
}

/* On décale les éléments 2, 4, 6, etc. vers le bas */
.image-wrapper:nth-child(even) {
  transform: translateY(50px);
}
</style>
