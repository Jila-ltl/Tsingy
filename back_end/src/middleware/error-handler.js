function getFriendlyErrorMessage (error) {
  const sourceMessage = error?.message || ''

  if (sourceMessage.includes('Environment variable not found: DATABASE_URL')) {
    return 'Le service est temporairement indisponible car la base de donnees n est pas configuree correctement.'
  }

  if (sourceMessage.includes('Can\'t reach database server')) {
    return 'Impossible de se connecter a la base de donnees pour le moment. Veuillez reessayer un peu plus tard.'
  }

  if (sourceMessage.includes('prisma.') || error?.name?.includes('Prisma')) {
    return 'Une erreur technique est survenue lors du traitement de votre demande. Veuillez reessayer plus tard.'
  }

  if (sourceMessage.includes('Internal server error')) {
    return 'Une erreur interne est survenue. Veuillez reessayer plus tard.'
  }

  return error?.message || 'Une erreur inattendue est survenue.'
}

function getFrenchFieldLabel (fieldName) {
  const labels = {
    address: 'adresse',
    arrivalDate: 'date d arrivee au Maroc',
    birthDate: 'date de naissance',
    domicileAtMarrakech: 'domicile',
    email: 'adresse email',
    facebookName: 'profil Facebook',
    firstName: 'prenom',
    lastName: 'nom',
    matricule: 'matricule AMCI',
    passportNumber: 'numero de passeport',
    password: 'mot de passe',
    phone: 'numero de telephone',
    professionType: 'profession',
    residenceCardNumber: 'carte de sejour',
    school: 'universite ou structure',
    track: 'filiere ou domaine',
  }

  return labels[fieldName] || fieldName
}

function getFrenchValidationMessage (fieldName, rawMessage) {
  const label = getFrenchFieldLabel(fieldName)

  if (!rawMessage) {
    return `Le champ ${label} est invalide.`
  }

  if (rawMessage.includes('Invalid email')) {
    return 'L adresse email n est pas valide.'
  }

  if (rawMessage.includes('at least 6 character')) {
    return 'Le mot de passe doit contenir au moins 6 caracteres.'
  }

  if (rawMessage.includes('String must contain at least 1 character')) {
    return `Le champ ${label} est obligatoire.`
  }

  return `Le champ ${label} est invalide.`
}

function formatZodFieldErrors (error) {
  const fieldErrors = error.flatten ? error.flatten().fieldErrors : {}
  const formattedMessages = Object.entries(fieldErrors)
    .flatMap(([fieldName, messages]) => (messages || []).map(message => getFrenchValidationMessage(fieldName, message)))

  return {
    fieldErrors,
    message: formattedMessages.length > 0 ? formattedMessages.join(' ') : 'Certaines informations sont invalides.',
  }
}

export function errorHandler (error, _req, res, _next) {
  if (error.name === 'ZodError') {
    const validation = formatZodFieldErrors(error)

    return res.status(400).json({
      error: validation.message,
      fields: {
        fieldErrors: validation.fieldErrors,
      },
    })
  }

  const status = error.status || 500

  res.status(status).json({
    error: getFriendlyErrorMessage(error),
  })
}
