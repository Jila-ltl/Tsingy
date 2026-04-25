import { computed } from 'vue'

export const annonces = [
  {
    id: 'match1',
    type: 'Match',
    titre: 'Match de foot amical Mada-Sénégal',
    date: '2026-04-05',
    description: 'Match amical entre les deux équipes',
    details: {
      lieu: 'Saada',
      heure: '18:00',
    },
  },
  {
    id: 'match2',
    type: 'Match',
    titre: 'Tournoi de football',
    date: '2026-04-17',
    description: 'Tournoi entre membres',
    details: {
      lieu: 'Saada',
      heure: '17:00',
    },
  },
  {
    id: 'soiree',
    type: 'Soirée',
    titre: 'Soirée culturelle malgache',
    date: '2026-04-20',
    description: 'Soirée avec animations et musique',
    details: {
      lieu: 'Ain Mezouar',
      heure: '20:00',
      dresscode: 'Traditionnel',
      paf: '50dh',
    },
  },

]

// 🔥 annonces filtrées (centralisées)
export const annoncesValides = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return annonces.filter(a => {
    const [year, month, day] = a.date.split('-')
    const dateAnnonce = new Date(year, month - 1, day)

    return dateAnnonce >= today
  })
})
