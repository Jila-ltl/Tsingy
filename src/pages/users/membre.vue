<template>
  <div class="member-service-page h-[89vh] overflow-y-auto bg-white">
    <div class="member-service-page__backdrop" />

    <div class="relative z-10 p-4 md:p-8">
      <section class="overflow-hidden rounded-[32px] border border-green-100 bg-white/78 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <div class="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
              Services membre
            </p>
            <h1 class="mt-4 text-4xl font-black text-black md:text-5xl">
              Espace membre Tsingy Marrakech
            </h1>
            <p class="mt-4 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
              Accedez rapidement a vos demandes de procuration, reclamations, depot de certificats et modifications de profil dans un espace harmonise avec la page d accueil.
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <div class="rounded-2xl border border-green-100 bg-green-50 px-5 py-4">
                <p class="text-xs uppercase tracking-[0.25em] text-green-700">Actions</p>
                <p class="mt-2 text-lg font-bold text-black">{{ services.length }} modules</p>
              </div>
              <div class="rounded-2xl border border-red-100 bg-red-50 px-5 py-4">
                <p class="text-xs uppercase tracking-[0.25em] text-red-600">Formulaires</p>
                <p class="mt-2 text-lg font-bold text-black">En fenetre modale</p>
              </div>
              <div class="rounded-2xl border border-gray-200 bg-white px-5 py-4">
                <p class="text-xs uppercase tracking-[0.25em] text-gray-500">Etat</p>
                <p class="mt-2 text-lg font-bold text-black">Pret a utiliser</p>
              </div>
            </div>
          </div>

          <div class="relative overflow-hidden rounded-[28px] border border-green-100 bg-gradient-to-br from-white via-green-50 to-red-50 p-5">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(239,68,68,0.16),_transparent_40%)]" />
            <div class="relative flex h-full flex-col justify-between gap-6">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                  Fonctionnement
                </p>
                <p class="mt-3 text-sm leading-7 text-gray-600">
                  Choisissez une action, ouvrez le formulaire dans une fenetre modale puis consultez vos demandes deja enregistrees dans les tableaux de suivi.
                </p>
              </div>

              <div class="rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                <p class="text-sm font-bold text-black">Module actif</p>
                <p class="mt-2 text-sm text-gray-600">
                  {{ activeService ? activeService.title : 'Selectionnez une action' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <button
          v-for="service in services"
          :key="service.key"
          class="service-card group overflow-hidden rounded-[24px] border border-white bg-white/85 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(22,163,74,0.15)]"
          @click="setActiveService(service.key)"
        >
          <div class="service-card__icon" :class="service.iconClass">
            <span :class="service.icon" class="text-3xl" />
          </div>
          <div class="px-6 pb-6">
            <p class="text-xl font-black text-black">{{ service.title }}</p>
            <p class="mt-3 text-sm leading-6 text-gray-600">
              {{ service.description }}
            </p>
            <div class="mt-5 flex items-center justify-between">
              <span class="rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                Ouvrir
              </span>
              <span class="text-2xl text-red-500">+</span>
            </div>
          </div>
        </button>
      </section>

      <section class="mt-8 grid gap-8 xl:grid-cols-2">
        <div class="rounded-[32px] border border-green-100 bg-white/72 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8">
          <div class="mb-6 flex items-end justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
                Procurations
              </p>
              <h2 class="mt-2 text-2xl font-black text-black md:text-3xl">
                Mes demandes recentes
              </h2>
            </div>
            <button class="member-primary-button" @click="openModal('procuration')">
              Nouvelle demande
            </button>
          </div>

          <div class="member-table-wrap">
            <table class="member-table">
              <thead>
                <tr>
                  <th>Objet</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Etat</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in procurationHistory" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.date }}</td>
                  <td>
                    <span class="status-chip" :class="item.status === 'Validee' ? 'status-chip--success' : 'status-chip--pending'">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="rounded-[32px] border border-green-100 bg-white/72 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8">
          <div class="mb-6 flex items-end justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
                Reclamations
              </p>
              <h2 class="mt-2 text-2xl font-black text-black md:text-3xl">
                Suivi des messages
              </h2>
            </div>
            <button class="member-primary-button" @click="openModal('reclamation')">
              Nouvelle reclamation
            </button>
          </div>

          <div class="member-table-wrap">
            <table class="member-table">
              <thead>
                <tr>
                  <th>Sujet</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Etat</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in reclamationHistory" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.date }}</td>
                  <td>
                    <span class="status-chip" :class="item.status === 'Traitee' ? 'status-chip--success' : 'status-chip--pending'">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>

    <div v-if="modalType" class="member-form-overlay">
      <div class="absolute inset-0 cursor-pointer" @click="closeModal" />

      <div class="member-form-panel">
        <div class="member-form-card">
          <button class="member-form-close" @click="closeModal">✕</button>

          <div class="mb-8">
            <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
              Formulaire
            </p>
            <h3 class="mt-3 text-4xl font-black text-black">
              {{ activeService.title }}
            </h3>
            <p class="mt-3 text-base leading-7 text-gray-600">
              {{ activeService.description }}
            </p>
          </div>

          <div v-if="modalType === 'procuration'" class="grid gap-5 sm:grid-cols-2">
            <div>
              <label class="member-label">Nom</label>
              <Input_
                id="procuration-last-name"
                v-model="forms.procuration.lastName"
                class="member-input"
                placeholder="Votre nom"
                type="text"
              />
            </div>
            <div>
              <label class="member-label">Prenom</label>
              <Input_
                id="procuration-first-name"
                v-model="forms.procuration.firstName"
                class="member-input"
                placeholder="Votre prenom"
                type="text"
              />
            </div>
            <div>
              <label class="member-label">Tel</label>
              <Input_
                id="procuration-phone"
                v-model="forms.procuration.phone"
                class="member-input"
                placeholder="Votre numero de telephone"
                type="text"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="member-label">Adresse</label>
              <Input_
                id="procuration-address"
                v-model="forms.procuration.address"
                class="member-input"
                placeholder="Votre adresse"
                type="text"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="member-label">N° matricule</label>
              <Input_
                id="procuration-matricule"
                v-model="forms.procuration.matricule"
                class="member-input"
                placeholder="Matricule AMCI"
                type="text"
              />
            </div>
            <div>
              <label class="member-label">N° CIN</label>
              <Input_
                id="procuration-cin"
                v-model="forms.procuration.cinNumber"
                class="member-input"
                placeholder="Ex: E034606W"
                type="text"
              />
            </div>
            <div>
              <label class="member-label">Nom du procureur</label>
              <Input_
                id="procuration-procurator-name"
                v-model="forms.procuration.procuratorName"
                class="member-input"
                placeholder="Nom et prenom du procureur"
                type="text"
              />
            </div>
            <div>
              <label class="member-label">CIN du procureur</label>
              <Input_
                id="procuration-procurator-cin"
                v-model="forms.procuration.procuratorCin"
                class="member-input"
                placeholder="Ex: A20X01417"
                type="text"
              />
            </div>
            <div>
              <label class="member-label">Date</label>
              <Input_
                id="procuration-date"
                v-model="forms.procuration.date"
                class="member-input"
                type="date"
              />
            </div>
          </div>

          <div v-else-if="modalType === 'reclamation'" class="grid gap-5">
            <div>
              <label class="member-label">Sujet</label>
              <Input_ id="reclamation-subject" v-model="forms.reclamation.subject" class="member-input" placeholder="Sujet de la reclamation" type="text" />
            </div>
            <div>
              <label class="member-label">Description</label>
              <textarea v-model="forms.reclamation.message" class="member-input min-h-[160px]" placeholder="Decrivez le probleme avec precision" />
            </div>
          </div>

          <div v-else-if="modalType === 'certificat'" class="grid gap-5">
            <div>
              <label class="member-label">Annee scolaire</label>
              <Input_ id="certificat-school-year" v-model="forms.certificat.schoolYear" class="member-input" placeholder="2025 - 2026" type="text" />
            </div>
            <div>
              <label class="member-label">Nom du document</label>
              <Input_ id="certificat-file-name" v-model="forms.certificat.fileName" class="member-input" placeholder="Certificat de scolarite" type="text" />
            </div>
            <div>
              <label class="member-label">Reference</label>
              <Input_ id="certificat-reference" v-model="forms.certificat.reference" class="member-input" placeholder="Reference ou commentaire" type="text" />
            </div>
          </div>

          <div v-else-if="modalType === 'modification'" class="grid gap-5 sm:grid-cols-2">
            <div>
              <label class="member-label">Prenom</label>
              <Input_ id="modification-first-name" v-model="forms.modification.firstName" class="member-input" type="text" />
            </div>
            <div>
              <label class="member-label">Nom</label>
              <Input_ id="modification-last-name" v-model="forms.modification.lastName" class="member-input" type="text" />
            </div>
            <div>
              <label class="member-label">Date de naissance</label>
              <Input_ id="modification-birth-date" v-model="forms.modification.birthDate" class="member-input" type="date" />
            </div>
            <div>
              <label class="member-label">Profession</label>
              <Select_
                id="modification-profession"
                v-model="forms.modification.profession"
                class="member-input"
                :options="professionOptions"
                placeholder="Choisir une profession"
              />
            </div>
            <div>
              <label class="member-label">Universite</label>
              <Input_ id="modification-university" v-model="forms.modification.university" class="member-input" type="text" />
            </div>
            <div>
              <label class="member-label">Filiere / Metier</label>
              <Input_ id="modification-track" v-model="forms.modification.track" class="member-input" type="text" />
            </div>
            <div>
              <label class="member-label">Numero passeport</label>
              <Input_ id="modification-passport" v-model="forms.modification.passport" class="member-input" type="text" />
            </div>
            <div>
              <label class="member-label">Arrivee au Maroc</label>
              <Input_ id="modification-arrival-date" v-model="forms.modification.arrivalDate" class="member-input" type="date" />
            </div>
            <div>
              <label class="member-label">Domicile</label>
              <Input_ id="modification-address" v-model="forms.modification.address" class="member-input" type="text" />
            </div>
            <div>
              <label class="member-label">Email</label>
              <Input_ id="modification-email" v-model="forms.modification.email" class="member-input" type="email" />
            </div>
            <div>
              <label class="member-label">Contact</label>
              <Input_ id="modification-contact" v-model="forms.modification.contact" class="member-input" type="text" />
            </div>
            <div>
              <label class="member-label">Reseaux sociaux</label>
              <Input_ id="modification-social" v-model="forms.modification.social" class="member-input" type="text" />
            </div>
          </div>

          <div class="mt-8 flex justify-end gap-3">
            <button class="member-secondary-button" @click="closeModal">
              Annuler
            </button>
            <button class="member-primary-button" @click="submitActiveForm">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="previewType === 'procuration'" class="member-form-overlay">
      <div class="absolute inset-0 cursor-pointer" @click="closePreview" />

      <div class="member-form-panel member-preview-panel">
        <div class="member-form-card member-preview-card">
          <button class="member-form-close" @click="closePreview">✕</button>

          <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
                Fiche generee
              </p>
              <h3 class="mt-3 text-3xl font-black text-black md:text-4xl">
                Procuration AMCI
              </h3>
              <p class="mt-3 max-w-2xl text-base leading-7 text-gray-600">
                Verifiez le contenu ci-dessous puis telechargez immediatement le document en PDF.
              </p>
            </div>

            <button class="member-primary-button" @click="downloadProcurationPdf">
              Telecharger le PDF
            </button>
          </div>

          <div class="procuration-preview">
            <div class="procuration-preview__meta">
              <p><strong>Nom :</strong> {{ forms.procuration.lastName }}</p>
              <p><strong>Prenom :</strong> {{ forms.procuration.firstName }}</p>
              <p><strong>Tel :</strong> {{ forms.procuration.phone }}</p>
              <p><strong>Adresse :</strong> {{ forms.procuration.address }}</p>
              <p><strong>N° matricule :</strong> {{ forms.procuration.matricule }}</p>
            </div>

            <div class="procuration-preview__letter">
              <p class="procuration-preview__line">À AMCI</p>
              <p class="procuration-preview__line"><strong>Motif :</strong> Procuration</p>
              <p class="procuration-preview__line">
                Je soussigné {{ procurationFullName }} titulaire de CIN numérotée {{ forms.procuration.cinNumber }} autorise
                {{ forms.procuration.procuratorName }} titulaire de CIN numérotée {{ forms.procuration.procuratorCin }} à se procurer à mon nom mon attestation de bourse auprès de vous.
              </p>
              <p class="procuration-preview__line">Je vous prie d’agréer mes salutations.</p>
              <p class="procuration-preview__line procuration-preview__line--signature">Marrakech, le {{ procurationFormattedDate }}.</p>
            </div>
          </div>

          <div class="mt-8 flex justify-end gap-3">
            <button class="member-secondary-button" @click="reopenProcurationForm">
              Modifier
            </button>
            <button class="member-primary-button" @click="downloadProcurationPdf">
              Telecharger le PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const services = [
  {
    key: 'procuration',
    title: 'Demande de procuration',
    description: 'Creez une nouvelle procuration et consultez l historique de vos demandes deja soumises.',
    icon: 'mdi mdi-file-document-outline',
    iconClass: 'service-card__icon--green',
  },
  {
    key: 'reclamation',
    title: 'Reclamation bourse',
    description: 'Envoyez un message detaille a propos de votre bourse et suivez son traitement.',
    icon: 'mdi mdi-alert-box-outline',
    iconClass: 'service-card__icon--red',
  },
  {
    key: 'certificat',
    title: 'Depot de certificat',
    description: 'Preparez le depot de votre certificat avec l annee scolaire et la reference du document.',
    icon: 'mdi mdi-folder-arrow-up-outline',
    iconClass: 'service-card__icon--blue',
  },
  {
    key: 'modification',
    title: 'Modifier mes infos',
    description: 'Mettez a jour vos informations personnelles et administratives dans un formulaire unique.',
    icon: 'mdi mdi-account-edit-outline',
    iconClass: 'service-card__icon--yellow',
  },
]

const activeKey = ref('procuration')
const modalType = ref('')
const previewType = ref('')
const professionOptions = [
  { label: 'Etudiant(e)', value: 'etudiant' },
  { label: 'Travailleur(euse)', value: 'travailleur' },
]

const procurationHistory = ref([
  { id: 1, title: 'Procuration AG 2026', description: 'Representation pour l assemblee generale.', date: '11/04/2026', status: 'En attente' },
  { id: 2, title: 'Retrait dossier', description: 'Autorisation de retrait administratif.', date: '02/04/2026', status: 'Validee' },
])

const reclamationHistory = ref([
  { id: 1, title: 'Bourse AMCI', description: 'Retard de versement du mois de mars.', date: '08/04/2026', status: 'En attente' },
  { id: 2, title: 'Regularisation', description: 'Correction d un dossier deja depose.', date: '29/03/2026', status: 'Traitee' },
])

const forms = reactive({
  procuration: {
    lastName: '',
    firstName: '',
    phone: '',
    address: '',
    matricule: '',
    cinNumber: '',
    procuratorName: '',
    procuratorCin: '',
    date: '',
  },
  reclamation: {
    subject: '',
    message: '',
  },
  certificat: {
    schoolYear: '',
    fileName: '',
    reference: '',
  },
  modification: {
    firstName: '',
    lastName: '',
    birthDate: '',
    profession: 'etudiant',
    university: '',
    track: '',
    passport: '',
    arrivalDate: '',
    address: '',
    email: '',
    contact: '',
    social: '',
  },
})

const activeService = computed(() => services.find(service => service.key === activeKey.value) ?? services[0])
const procurationFullName = computed(() => `${forms.procuration.lastName} ${forms.procuration.firstName}`.trim())
const procurationFormattedDate = computed(() => formatDisplayDate(forms.procuration.date))

function setActiveService(key) {
  activeKey.value = key
  openModal(key)
}

function openModal(type) {
  previewType.value = ''
  modalType.value = type
  activeKey.value = type
}

function closeModal() {
  modalType.value = ''
}

function closePreview() {
  previewType.value = ''
}

function reopenProcurationForm() {
  previewType.value = ''
  modalType.value = 'procuration'
}

function formatDisplayDate(value) {
  if (!value) {
    return new Date().toLocaleDateString('fr-FR')
  }

  return new Date(`${value}T00:00:00`).toLocaleDateString('fr-FR')
}

function getProcurationPdfLines() {
  return [
    'À l’AMCI',
    'Motif : Procuration',
    '',
    `Nom : ${forms.procuration.lastName}`,
    `Prenom : ${forms.procuration.firstName}`,
    `Tel : ${forms.procuration.phone}`,
    `Adresse : ${forms.procuration.address}`,
    `N° matricule : ${forms.procuration.matricule}`,
    '',
    `Je soussigné ${procurationFullName.value} titulaire de CIN numérotée ${forms.procuration.cinNumber} autorise ${forms.procuration.procuratorName} titulaire de CIN numérotée ${forms.procuration.procuratorCin} à se procurer à mon nom mon attestation de bourse auprès de vous.`,
    '',
    'Je vous prie d’agréer mes salutations.',
    '',
    `Marrakech, le ${procurationFormattedDate.value}.`,
  ]
}

function escapePdfText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
}

function wrapPdfText(value, maxLength = 88) {
  if (!value) {
    return ['']
  }

  const words = value.split(/\s+/)
  const lines = []
  let currentLine = ''

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word

    if (candidate.length <= maxLength) {
      currentLine = candidate
      continue
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    currentLine = word
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

function downloadProcurationPdf() {
  const pdfLines = ['Procuration AMCI', '', ...getProcurationPdfLines().flatMap(line => wrapPdfText(line))]
  const textOperations = []
  let cursorY = 800

  for (const line of pdfLines) {
    textOperations.push(`BT /F1 12 Tf 50 ${cursorY} Td (${escapePdfText(line)}) Tj ET`)
    cursorY -= line ? 18 : 10
  }

  const contentStream = textOperations.join('\n')
  const pdfObjects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    `5 0 obj << /Length ${contentStream.length} >> stream\n${contentStream}\nendstream endobj`,
  ]

  let pdfContent = '%PDF-1.4\n'
  const offsets = [0]

  for (const object of pdfObjects) {
    offsets.push(pdfContent.length)
    pdfContent += `${object}\n`
  }

  const xrefStart = pdfContent.length
  pdfContent += `xref\n0 ${pdfObjects.length + 1}\n`
  pdfContent += '0000000000 65535 f \n'

  for (let index = 1; index < offsets.length; index += 1) {
    pdfContent += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`
  }

  pdfContent += `trailer << /Size ${pdfObjects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

  const blob = new Blob([pdfContent], { type: 'application/pdf' })
  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = downloadUrl
  link.download = `procuration-${forms.procuration.lastName || 'amci'}.pdf`
  link.click()

  URL.revokeObjectURL(downloadUrl)
}

function submitActiveForm() {
  if (modalType.value !== 'procuration') {
    closeModal()
    return
  }

  const requiredValues = [
    forms.procuration.lastName,
    forms.procuration.firstName,
    forms.procuration.phone,
    forms.procuration.address,
    forms.procuration.matricule,
    forms.procuration.cinNumber,
    forms.procuration.procuratorName,
    forms.procuration.procuratorCin,
    forms.procuration.date,
  ]

  if (requiredValues.some(value => !String(value).trim())) {
    window.alert('Veuillez remplir tous les champs de la demande de procuration avant de continuer.')
    return
  }

  closeModal()
  previewType.value = 'procuration'
}
</script>

<style scoped>
.member-service-page {
  position: relative;
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.18), transparent 28%),
    radial-gradient(circle at bottom right, rgba(239, 68, 68, 0.14), transparent 22%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.97), rgba(240, 253, 244, 0.92));
}

.member-service-page__backdrop {
  position: absolute;
  inset: 0;
  background-image: url('/img/maki.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.08;
  mix-blend-mode: multiply;
}

.service-card {
  backdrop-filter: blur(12px);
}

.service-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 1.5rem 1.5rem 1rem;
  border-radius: 20px;
}

.service-card__icon--green {
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.service-card__icon--red {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.service-card__icon--blue {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

.service-card__icon--yellow {
  background: rgba(234, 179, 8, 0.12);
  color: #ca8a04;
}

.member-table-wrap {
  overflow-x: auto;
  scrollbar-gutter: stable;
}

.member-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.75rem;
}

.member-table th {
  padding: 0 1rem 0.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #15803d;
}

.member-table td {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.92);
  color: #374151;
  font-size: 0.92rem;
}

.member-table tbody tr td:first-child {
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  color: #111827;
  font-weight: 700;
}

.member-table tbody tr td:last-child {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0.4rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.status-chip--success {
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.status-chip--pending {
  background: rgba(234, 179, 8, 0.12);
  color: #b45309;
}

.member-form-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.member-form-panel {
  position: relative;
  width: min(980px, calc(100vw - 2rem));
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}

.member-form-card {
  position: relative;
  border: 1px solid rgba(220, 252, 231, 0.85);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.96);
  padding: 2rem;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.22);
}

.member-form-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.92);
  color: #111827;
  font-size: 1.25rem;
  font-weight: 700;
}

.member-label {
  display: block;
  margin-bottom: 0.65rem;
  color: #15803d;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.member-input {
  width: 100%;
  border: 1px solid #d1fae5;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  color: #111827;
  padding: 0.95rem 1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.member-input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
}

.member-primary-button,
.member-secondary-button {
  border-radius: 16px;
  font-weight: 700;
  padding: 0.9rem 1.1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.member-primary-button {
  background: linear-gradient(135deg, #22c55e, #166534);
  color: white;
  box-shadow: 0 12px 28px rgba(22, 163, 74, 0.22);
}

.member-preview-panel {
  width: min(900px, calc(100vw - 2rem));
}

.member-preview-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(240, 253, 244, 0.94));
}

.procuration-preview {
  border: 1px solid rgba(34, 197, 94, 0.18);
  border-radius: 24px;
  background: white;
  padding: 1.5rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.procuration-preview__meta {
  display: grid;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(209, 250, 229, 0.9);
  padding-bottom: 1rem;
  color: #374151;
}

.procuration-preview__letter {
  display: grid;
  gap: 1rem;
  padding-top: 1.5rem;
  color: #111827;
  line-height: 1.85;
}

.procuration-preview__line {
  font-size: 1rem;
}

.procuration-preview__line--signature {
  padding-top: 1rem;
  text-align: right;
}

.member-secondary-button {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e5e7eb;
  color: #111827;
}

@media (max-width: 1024px) {
  .member-form-panel {
    width: calc(100vw - 1rem);
    max-height: calc(100vh - 1rem);
  }

  .member-form-card {
    padding: 1.25rem;
  }

  .procuration-preview {
    padding: 1rem;
  }
}
</style>
