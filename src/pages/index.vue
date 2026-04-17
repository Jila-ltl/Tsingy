<template>
  <div
    id="container"
    ref="pageRef"
    class="home-page h-screen overflow-y-auto overflow-x-hidden bg-stone-950 text-stone-50"
  >
    <section
      ref="heroSectionRef"
      class="hero-section relative isolate flex min-h-screen items-center overflow-hidden px-4 py-10 sm:px-6 md:px-10 lg:px-16"
    >
      <div class="hero-mesh"></div>
      <div class="hero-orb hero-orb--left"></div>
      <div class="hero-orb hero-orb--right"></div>
      <div class="hero-grid relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div class="max-w-2xl">
          <p
            ref="heroKickerRef"
            class="hero-kicker mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emerald-100 backdrop-blur-sm sm:mb-5 sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.35em]"
          >
            Tsingy Marrakech
          </p>

          <h1
            ref="heroTitleRef"
            class="max-w-3xl font-serif text-4xl font-semibold leading-[0.95] text-white sm:text-5xl md:text-7xl lg:text-[5.5rem]"
          >
            Tongasoa à Marrakech.
          </h1>

          <p
            ref="heroTextRef"
            class="mt-5 max-w-xl text-sm leading-7 text-stone-200 sm:text-base sm:leading-8 md:text-lg"
          >
            Une association pour rassembler, accueillir et faire rayonner la communauté malgache de Marrakech dans un cadre chaleureux, utile et vivant.
          </p>

          <div ref="heroActionsRef" class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              class="interactive-pill w-full rounded-full bg-emerald-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950 transition hover:bg-emerald-300 sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.24em]"
              type="button"
              @click="scrollToSection(aboutRef)"
            >
              Explorer
            </button>

            <button
              class="interactive-pill w-full rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/12 sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.24em]"
              type="button"
              @click="router.push('/auth/signup')"
            >
              Devenir membre
            </button>
          </div>
        </div>

        <div
          ref="heroVisualRef"
          class="hero-card interactive-card relative ml-auto w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-md sm:rounded-[2rem] sm:p-4"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-300/20 via-transparent to-amber-200/10"></div>
          <div class="floating-chip floating-chip--one">Solidarité</div>
          <div class="floating-chip floating-chip--two">Culture</div>
          <div class="floating-chip floating-chip--three">Marrakech</div>
          <img
            alt="Drapeau malgache illustrant la communauté Tsingy Marrakech"
            class="hero-flag relative z-10 mx-auto mt-6 w-[170px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] sm:mt-8 sm:w-[220px] md:w-[280px]"
            src="/img/flag.png"
          >
          <div class="relative z-10 mt-6 rounded-[1.25rem] border border-white/10 bg-stone-950/55 p-4 text-left sm:mt-8 sm:rounded-[1.5rem] sm:p-6">
            <p class="text-xs uppercase tracking-[0.32em] text-emerald-200/80">
              Communauté
            </p>
            <p class="mt-3 text-xl font-semibold text-white sm:text-2xl">
              Cultiver les liens, l’entraide et la présence malgache à Marrakech.
            </p>
            <div class="mt-6 grid grid-cols-1 gap-3 text-center text-stone-200 min-[420px]:grid-cols-3 sm:mt-8 sm:gap-4">
              <div class="stat-card rounded-2xl bg-white/5 px-3 py-4">
                <p class="text-2xl font-semibold text-white">+200</p>
                <p class="mt-1 text-xs uppercase tracking-[0.2em] text-stone-400">Membres</p>
              </div>
              <div class="stat-card rounded-2xl bg-white/5 px-3 py-4">
                <p class="text-2xl font-semibold text-white">12</p>
                <p class="mt-1 text-xs uppercase tracking-[0.2em] text-stone-400">Actions</p>
              </div>
              <div class="stat-card rounded-2xl bg-white/5 px-3 py-4">
                <p class="text-2xl font-semibold text-white">1</p>
                <p class="mt-1 text-xs uppercase tracking-[0.2em] text-stone-400">Famille</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        ref="scrollCueRef"
        class="scroll-cue absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-stone-200/80 sm:bottom-8 sm:text-xs sm:tracking-[0.35em]"
        type="button"
        @click="scrollToSection(aboutRef)"
      >
        <span class="block">Scroll down</span>
        <span class="scroll-cue__mouse mx-auto mt-3 flex h-14 w-8 items-start justify-center rounded-full border border-white/30 p-2">
          <span class="scroll-cue__dot block h-2.5 w-2.5 rounded-full bg-emerald-300"></span>
        </span>
      </button>

      <div class="hero-side-note absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rotate-180 text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-white/40 lg:block [writing-mode:vertical-rl]">
        Madagascar x Marrakech
      </div>
    </section>

    <section
      ref="aboutRef"
      class="reveal-section relative bg-[#f6f2eb] px-4 py-16 text-stone-900 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16"
    >
      <div class="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
        <div class="relative min-h-[250px] sm:min-h-[340px]">
          <img
            alt="Paysage symbolique de Madagascar"
            class="about-image-main h-[280px] w-full rounded-[1.5rem] object-cover shadow-[0_25px_70px_rgba(0,0,0,0.15)] sm:h-[420px] sm:rounded-[2rem]"
            src="/img/baobab.jpg"
          >
          <img
            alt="Photo de Marrakech"
            class="about-image-secondary absolute -bottom-6 right-0 h-[130px] w-[58%] rounded-[1rem] border-[5px] border-[#f6f2eb] object-cover shadow-[0_25px_70px_rgba(0,0,0,0.18)] sm:-bottom-10 sm:h-[220px] sm:w-[62%] sm:rounded-[1.5rem] sm:border-[8px]"
            src="/img/marrakech.jpg"
          >
        </div>

        <div class="interactive-card rounded-[1.5rem] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:rounded-[2rem] sm:p-8 md:p-12">
          <div class="section-glint"></div>
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Qui sommes-nous
          </p>
          <h2 class="mt-4 font-serif text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl md:text-5xl">
            Une présence malgache organisée, ouverte et solidaire.
          </h2>
          <p class="mt-6 text-base leading-8 text-stone-600">
            Tsingy Marrakech regroupe les ressortissants malgaches vivant à Marrakech afin de faciliter l’intégration, créer du lien et offrir un espace de partage utile au quotidien.
          </p>
          <p class="mt-4 text-base leading-8 text-stone-600">
            L’association valorise aussi la culture malgache à travers des activités, des rencontres conviviales et des actions solidaires sur les plans éducatif, professionnel et personnel.
          </p>
          <p class="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-stone-900">
            Bienvenue à vous.
          </p>
        </div>
      </div>
    </section>

    <section
      id="mot_sg"
      class="announcement-section reveal-section px-4 py-16 text-stone-900 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16"
    >
      <div class="announcement-shell interactive-card mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/10 px-5 py-5 text-stone-100 sm:rounded-[2.25rem] sm:px-8 sm:py-8 md:px-10 lg:px-12 lg:py-10">
        <div class="announcement-glow announcement-glow--emerald" />
        <div class="announcement-glow announcement-glow--amber" />

        <div class="announcement-ticker mb-6 overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-3 sm:mb-8">
          <div class="announcement-ticker__track">
            <span>Annonce</span>
            <span>Assemblée générale le 27 avril</span>
            <span>Inscriptions ouvertes pour les nouveaux membres</span>
            <span>Newsletter mensuelle Tsingy Marrakech</span>
            <span>Annonce</span>
            <span>Assemblée générale le 27 avril</span>
            <span>Inscriptions ouvertes pour les nouveaux membres</span>
            <span>Newsletter mensuelle Tsingy Marrakech</span>
          </div>
        </div>

        <div class="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div class="space-y-5">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Annonces & News
              </p>
              <h2 class="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                Le rythme de l’association, dans un bloc plus vivant et plus clair.
              </h2>
              <p class="mt-5 max-w-2xl text-base leading-8 text-stone-300">
                Retrouvez les informations importantes, les rendez-vous à venir et les actualités utiles de Tsingy Marrakech dans un espace pensé comme un mini tableau éditorial.
              </p>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <article class="news-card news-card--feature rounded-[1.5rem] p-5 sm:p-6">
                <div class="flex items-start justify-between gap-4">
                  <span class="news-badge">À la une</span>
                  <span class="news-date">27 AVR 2026</span>
                </div>
                <h3 class="mt-5 text-2xl font-semibold text-white">
                  Assemblée générale et rencontre communautaire
                </h3>
                <p class="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
                  Un moment pour faire le point sur les projets de l’association, accueillir les nouveaux arrivants et renforcer les liens entre membres.
                </p>
                <div class="mt-6 flex flex-wrap gap-3">
                  <span class="news-chip">Vie associative</span>
                  <span class="news-chip">Rencontre</span>
                  <span class="news-chip">Marrakech</span>
                </div>
              </article>

              <div class="grid gap-4">
                <article class="news-card rounded-[1.35rem] p-5">
                  <div class="flex items-center justify-between gap-4">
                    <span class="news-badge news-badge--soft">Info membres</span>
                    <span class="news-date">MAJ</span>
                  </div>
                  <p class="mt-4 text-lg font-semibold text-white">
                    Mise à jour des dossiers administratifs ouverte cette semaine.
                  </p>
                </article>

                <article class="news-card rounded-[1.35rem] p-5">
                  <div class="flex items-center justify-between gap-4">
                    <span class="news-badge news-badge--soft">Culture</span>
                    <span class="news-date">NOUVEAU</span>
                  </div>
                  <p class="mt-4 text-lg font-semibold text-white">
                    Une newsletter mensuelle arrive pour suivre les actions, événements et annonces importantes.
                  </p>
                </article>
              </div>
            </div>
          </div>

          <aside class="newsletter-panel rounded-[1.5rem] border border-white/10 p-5 sm:p-6 md:p-7">
            <div class="newsletter-orb" />
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
              Newsletter
            </p>
            <h3 class="mt-4 font-serif text-2xl font-semibold text-white sm:text-3xl">
              Recevez les nouvelles importantes sans rien manquer.
            </h3>
            <p class="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
              Un envoi simple, propre et utile: activités, annonces, dates clés et informations membres directement dans votre boîte mail.
            </p>

            <div class="mt-6 space-y-3">
              <label class="newsletter-label" for="newsletter-email">Adresse email</label>
              <input
                id="newsletter-email"
                class="newsletter-input w-full rounded-full border border-white/10 px-5 py-4 text-sm text-white outline-none"
                placeholder="exemple@tsingy.ma"
                type="email"
              >
              <label class="newsletter-label" for="newsletter-message">Votre message</label>
              <textarea
                id="newsletter-message"
                class="newsletter-textarea w-full border border-white/10 px-5 py-4 text-sm text-white outline-none"
                placeholder="Ajoutez un message, une suggestion ou une demande..."
                rows="4"
              />
              <button
                class="newsletter-button w-full rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-stone-950"
                type="button"
                @click="router.push('/auth/signup')"
              >
                Envoyer
              </button>
            </div>

            <div class="mt-6 grid gap-3 text-sm text-stone-300">
              <div class="newsletter-point">
                <span class="newsletter-dot" />
                <span>Un résumé clair des annonces de l’association</span>
              </div>
              <div class="newsletter-point">
                <span class="newsletter-dot" />
                <span>Les événements et rendez-vous importants en avant</span>
              </div>
              <div class="newsletter-point">
                <span class="newsletter-dot" />
                <span>Une direction visuelle moderne, cohérente avec l’accueil</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section
      id="faire_un_don"
      class="donation-section reveal-section px-4 py-16 text-stone-100 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16"
    >
      <div class="donation-shell interactive-card mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/10 p-5 sm:rounded-[2.25rem] sm:p-8 md:p-10 lg:p-12">
        <div class="donation-ring donation-ring--one" />
        <div class="donation-ring donation-ring--two" />

        <div class="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
              Faire un don
            </p>
            <h2 class="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Soutenir les actions de Tsingy Marrakech, concrètement.
            </h2>
            <p class="mt-5 max-w-2xl text-base leading-8 text-stone-300">
              Vos dons permettent d’accompagner les membres, de soutenir les activités culturelles et solidaires, et de financer les actions utiles à la communauté malgache de Marrakech.
            </p>

            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <article class="donation-stat rounded-[1.35rem] p-5">
                <p class="donation-stat__label">Solidarité</p>
                <p class="mt-3 text-2xl font-semibold text-white">Aide directe</p>
              </article>
              <article class="donation-stat rounded-[1.35rem] p-5">
                <p class="donation-stat__label">Événements</p>
                <p class="mt-3 text-2xl font-semibold text-white">Vie associative</p>
              </article>
              <article class="donation-stat rounded-[1.35rem] p-5">
                <p class="donation-stat__label">Impact</p>
                <p class="mt-3 text-2xl font-semibold text-white">Actions utiles</p>
              </article>
            </div>
          </div>

          <aside class="donation-panel rounded-[1.5rem] border border-white/10 p-5 sm:p-6 md:p-7">
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
              Contribution
            </p>
            <h3 class="mt-4 font-serif text-2xl font-semibold text-white sm:text-3xl">
              Choisissez une manière simple de participer.
            </h3>

            <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <button class="donation-amount" type="button">50 DH</button>
              <button class="donation-amount" type="button">100 DH</button>
              <button class="donation-amount" type="button">200 DH</button>
              <button class="donation-amount" type="button">Libre</button>
            </div>

            <p class="mt-6 text-sm leading-7 text-stone-300 sm:text-base">
              Vous pouvez contribuer ponctuellement ou nous contacter pour mettre en place un soutien plus régulier selon vos possibilités.
            </p>

            <div class="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                class="donation-button donation-button--primary w-full rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em]"
                type="button"
                @click="router.push('/auth/signup')"
              >
                Je contribue
              </button>
              <button
                class="donation-button donation-button--secondary w-full rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em]"
                type="button"
                @click="router.push('/users/membre')"
              >
                En savoir plus
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section
      id="pres_bureau"
      class="reveal-section bg-stone-100 px-4 py-16 text-stone-900 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16"
    >
      <div class="mx-auto max-w-7xl">
        <div class="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
              Bureau
            </p>
            <h2 class="mt-3 font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
              Les membres du bureau
            </h2>
          </div>
          <p class="max-w-xl text-base leading-8 text-stone-600">
            Une équipe engagée pour faire avancer l’association, coordonner les actions et maintenir un lien durable entre les membres.
          </p>
        </div>

        <div class="interactive-card overflow-hidden rounded-[1.5rem] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:rounded-[2rem] sm:p-6 md:p-8">
          <MyCarousel />
        </div>
      </div>
    </section>

    <section
      id="espace_membre"
      class="reveal-section bg-[#f6f2eb] px-4 py-16 text-stone-900 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16"
    >
      <div class="mx-auto max-w-6xl">
        <div class="text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
            Espace membre
          </p>
          <h2 class="mt-3 font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
            Rejoindre ou retrouver son espace
          </h2>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <article class="interactive-card rounded-[1.5rem] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:rounded-[2rem] sm:p-10">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
              Nouveau membre
            </p>
            <h3 class="mt-4 text-2xl font-semibold text-stone-900 sm:text-3xl">
              Vous êtes malgache à Marrakech ?
            </h3>
            <p class="mt-4 text-base leading-8 text-stone-600">
              Rejoignez la communauté et accédez à un espace pensé pour les membres de l’association.
            </p>
            <button
              class="mt-8 w-full rounded-full bg-emerald-700 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-800 sm:w-auto sm:tracking-[0.24em]"
              type="button"
              @click="router.push('/auth/signup')"
            >
              Inscription
            </button>
          </article>

          <article class="interactive-card rounded-[1.5rem] bg-stone-950 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:rounded-[2rem] sm:p-10">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
              Déjà membre
            </p>
            <h3 class="mt-4 text-2xl font-semibold sm:text-3xl">
              Mettre à jour vos informations
            </h3>
            <p class="mt-4 text-base leading-8 text-stone-300">
              Connectez-vous pour retrouver vos coordonnées, accéder à vos informations et rester à jour.
            </p>
            <button
              class="mt-8 w-full rounded-full border border-white/15 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/16 sm:w-auto sm:tracking-[0.24em]"
              type="button"
              @click="router.push('/auth/signin')"
            >
              Se connecter
            </button>
          </article>
        </div>
      </div>
    </section>

    <footer
      id="contact"
      class="reveal-section bg-black px-4 py-16 text-white sm:px-6 sm:py-20 md:px-10 lg:px-16"
    >
      <div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <h2 class="font-serif text-2xl font-semibold sm:text-3xl">
            Tsingy Marrakech
          </h2>
          <p class="mt-4 max-w-sm text-stone-400">
            Tongasoa à Marrakech. Un point d’ancrage pour accueillir, connecter et soutenir la communauté malgache.
          </p>
        </div>

        <div>
          <h2 class="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
            Contact
          </h2>
          <p class="mt-4 text-stone-400">Téléphone : +212 XXX XXX XXX</p>
          <p class="mt-2 text-stone-400">Email : contact@tsingy.ma</p>
          <p class="mt-2 text-stone-400">Marrakech, Maroc</p>
        </div>

        <div>
          <h2 class="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
            Réseaux sociaux
          </h2>
          <div class="mt-5 flex gap-6 text-2xl">
            <a
              class="transition hover:text-blue-500"
              href="https://www.facebook.com/share/1ARtb33t9U/"
              target="_blank"
            >
              <i class="mdi mdi-facebook"></i>
            </a>
            <a
              class="transition hover:text-pink-500"
              href="https://www.instagram.com/tsingymarrakech?igsh=MnBoZHp6NDBtcHU2"
              target="_blank"
            >
              <i class="mdi mdi-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="mx-auto mt-14 max-w-6xl border-t border-white/10 pt-6 text-center text-sm text-stone-500">
        © 2026 Tsingy Marrakech — Tous droits réservés
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MyCarousel from '../components/Carousel.vue'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()

const pageRef = ref(null)
const aboutRef = ref(null)
const heroSectionRef = ref(null)
const heroKickerRef = ref(null)
const heroTitleRef = ref(null)
const heroTextRef = ref(null)
const heroActionsRef = ref(null)
const heroVisualRef = ref(null)
const scrollCueRef = ref(null)

let animationContext
const cleanupCallbacks = []

const scrollToSection = sectionRef => {
  sectionRef?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  animationContext = gsap.context(() => {
    const scroller = pageRef.value
    const revealSections = gsap.utils.toArray('.reveal-section')
    const interactiveCards = gsap.utils.toArray('.interactive-card')
    const pills = gsap.utils.toArray('.interactive-pill')

    gsap.set(
      [
        heroKickerRef.value,
        heroTitleRef.value,
        heroTextRef.value,
        heroActionsRef.value,
        heroVisualRef.value,
        scrollCueRef.value,
      ],
      { autoAlpha: 0 },
    )

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

    heroTimeline
      .fromTo(heroKickerRef.value, { y: 28 }, { autoAlpha: 1, duration: 0.6, y: 0 })
      .fromTo(heroTitleRef.value, { y: 54 }, { autoAlpha: 1, duration: 0.95, y: 0 }, '-=0.2')
      .fromTo(heroTextRef.value, { y: 32 }, { autoAlpha: 1, duration: 0.75, y: 0 }, '-=0.45')
      .fromTo(heroActionsRef.value, { y: 26 }, { autoAlpha: 1, duration: 0.7, y: 0 }, '-=0.4')
      .fromTo(
        heroVisualRef.value,
        { autoAlpha: 0, rotate: -4, scale: 0.92, y: 40 },
        { autoAlpha: 1, duration: 1.1, rotate: 0, scale: 1, y: 0 },
        '-=0.85',
      )
      .fromTo(scrollCueRef.value, { y: -8 }, { autoAlpha: 1, duration: 0.55, y: 0 }, '-=0.35')

    gsap.to('.hero-flag', {
      duration: 4.5,
      ease: 'sine.inOut',
      repeat: -1,
      rotation: 2,
      transformOrigin: '50% 20%',
      y: -12,
      yoyo: true,
    })

    gsap.to('.hero-orb--left', {
      duration: 7,
      ease: 'sine.inOut',
      repeat: -1,
      x: 30,
      y: -18,
      yoyo: true,
    })

    gsap.to('.hero-orb--right', {
      duration: 8,
      ease: 'sine.inOut',
      repeat: -1,
      x: -25,
      y: 24,
      yoyo: true,
    })

    gsap.to('.floating-chip--one', {
      duration: 4.4,
      ease: 'sine.inOut',
      repeat: -1,
      rotation: -4,
      y: -10,
      yoyo: true,
    })

    gsap.to('.floating-chip--two', {
      duration: 5.2,
      ease: 'sine.inOut',
      repeat: -1,
      rotation: 3,
      x: 8,
      y: 12,
      yoyo: true,
    })

    gsap.to('.floating-chip--three', {
      duration: 4.8,
      ease: 'sine.inOut',
      repeat: -1,
      rotation: 5,
      x: -6,
      y: -8,
      yoyo: true,
    })

    gsap.to('.scroll-cue__dot', {
      duration: 1.15,
      ease: 'power1.inOut',
      opacity: 0.35,
      repeat: -1,
      y: 18,
      yoyo: true,
    })

    gsap.to('.about-image-secondary', {
      ease: 'none',
      scrollTrigger: {
        end: 'bottom top',
        scroller,
        scrub: true,
        start: 'top bottom',
        trigger: aboutRef.value,
      },
      y: -45,
    })

    gsap.to('.about-image-main', {
      ease: 'none',
      scale: 1.08,
      scrollTrigger: {
        end: 'bottom top',
        scroller,
        scrub: true,
        start: 'top bottom',
        trigger: aboutRef.value,
      },
      y: -20,
    })

    gsap.to('.hero-grid', {
      ease: 'none',
      scrollTrigger: {
        end: 'bottom top',
        scroller,
        scrub: true,
        start: 'top top',
        trigger: heroSectionRef.value,
      },
      y: 90,
    })

    gsap.to('.hero-mesh', {
      ease: 'none',
      opacity: 0.2,
      scrollTrigger: {
        end: 'bottom top',
        scroller,
        scrub: true,
        start: 'top top',
        trigger: heroSectionRef.value,
      },
      scale: 1.08,
    })

    gsap.to(scrollCueRef.value, {
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: {
        end: '40% top',
        scroller,
        scrub: true,
        start: 'top top',
        trigger: heroSectionRef.value,
      },
      y: 40,
    })

    revealSections.forEach(section => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 80, scale: 0.98 },
        {
          autoAlpha: 1,
          duration: 1,
          ease: 'power3.out',
          scale: 1,
          scrollTrigger: {
            scroller,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
            trigger: section,
          },
          y: 0,
        },
      )
    })

    interactiveCards.forEach(card => {
      const onMove = event => {
        const bounds = card.getBoundingClientRect()
        const offsetX = event.clientX - bounds.left
        const offsetY = event.clientY - bounds.top
        const rotateY = ((offsetX / bounds.width) - 0.5) * 10
        const rotateX = -((offsetY / bounds.height) - 0.5) * 10

        gsap.to(card, {
          duration: 0.35,
          ease: 'power2.out',
          rotateX,
          rotateY,
          transformPerspective: 900,
          x: rotateY * 0.6,
          y: rotateX * -0.6,
        })
      }

      const onLeave = () => {
        gsap.to(card, {
          duration: 0.45,
          ease: 'power3.out',
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
        })
      }

      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      cleanupCallbacks.push(() => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    pills.forEach(pill => {
      const onEnter = () => {
        gsap.to(pill, {
          duration: 0.3,
          ease: 'power2.out',
          scale: 1.04,
          y: -3,
        })
      }

      const onLeave = () => {
        gsap.to(pill, {
          duration: 0.3,
          ease: 'power2.out',
          scale: 1,
          y: 0,
        })
      }

      pill.addEventListener('mouseenter', onEnter)
      pill.addEventListener('mouseleave', onLeave)
      cleanupCallbacks.push(() => {
        pill.removeEventListener('mouseenter', onEnter)
        pill.removeEventListener('mouseleave', onLeave)
      })
    })
  }, pageRef.value)
})

onUnmounted(() => {
  cleanupCallbacks.forEach(cleanup => cleanup())
  cleanupCallbacks.length = 0
  animationContext?.revert()
})
</script>

<style scoped>
#container {
  scroll-behavior: smooth;
}

.hero-section {
  background:
    linear-gradient(135deg, rgba(7, 10, 8, 0.72), rgba(15, 23, 42, 0.68)),
    url('/img/img_group.jpeg') center / cover no-repeat;
}

.hero-mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 82%);
  opacity: 0.5;
  pointer-events: none;
}

.hero-card {
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
}

.floating-chip {
  position: absolute;
  z-index: 20;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  color: rgb(255 255 255 / 0.92);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  padding: 0.7rem 1rem;
  text-transform: uppercase;
}

.floating-chip--one {
  left: 1rem;
  top: 1.25rem;
}

.floating-chip--two {
  right: 1rem;
  top: 30%;
}

.floating-chip--three {
  bottom: 1.25rem;
  left: 8%;
}

.interactive-card {
  position: relative;
  transform-style: preserve-3d;
  transition: box-shadow 250ms ease;
  will-change: transform;
}

.interactive-card:hover {
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.18);
}

.interactive-pill {
  will-change: transform;
}

.stat-card {
  backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.section-glint {
  position: absolute;
  right: -2.5rem;
  top: -2.5rem;
  width: 10rem;
  height: 10rem;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0) 70%);
  pointer-events: none;
}

.hero-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(0);
  pointer-events: none;
}

.hero-orb--left {
  top: 10%;
  left: -8rem;
  width: 22rem;
  height: 22rem;
  background: radial-gradient(circle, rgba(74, 222, 128, 0.34) 0%, rgba(74, 222, 128, 0) 70%);
}

.hero-orb--right {
  right: -8rem;
  bottom: 8%;
  width: 24rem;
  height: 24rem;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.24) 0%, rgba(251, 191, 36, 0) 70%);
}

.scroll-cue {
  letter-spacing: 0.35em;
}

.scroll-cue__mouse {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
}

.announcement-section {
  background:
    radial-gradient(circle at top left, rgba(16, 185, 129, 0.12), transparent 28%),
    radial-gradient(circle at bottom right, rgba(245, 158, 11, 0.12), transparent 26%),
    linear-gradient(180deg, #08110f 0%, #111827 52%, #0b1220 100%);
}

.announcement-shell {
  position: relative;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03)),
    rgba(7, 10, 18, 0.92);
  box-shadow: 0 32px 90px rgba(2, 6, 23, 0.42);
  backdrop-filter: blur(18px);
}

.announcement-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(18px);
  opacity: 0.55;
  pointer-events: none;
}

.announcement-glow--emerald {
  top: -3rem;
  left: -2rem;
  width: 14rem;
  height: 14rem;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.34) 0%, rgba(16, 185, 129, 0) 72%);
  animation: pulseFloat 7s ease-in-out infinite;
}

.announcement-glow--amber {
  right: -3rem;
  bottom: -2rem;
  width: 16rem;
  height: 16rem;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.28) 0%, rgba(251, 191, 36, 0) 72%);
  animation: pulseFloat 8.5s ease-in-out infinite reverse;
}

.announcement-ticker {
  position: relative;
}

.announcement-ticker__track {
  display: flex;
  gap: 2.5rem;
  width: max-content;
  color: rgba(240, 253, 250, 0.88);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  animation: tickerSlide 24s linear infinite;
}

.news-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));
  backdrop-filter: blur(14px);
}

.news-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.08) 48%, transparent 100%);
  transform: translateX(-120%);
  animation: sheen 6s ease-in-out infinite;
}

.news-card--feature {
  min-height: 100%;
  background:
    linear-gradient(160deg, rgba(5, 150, 105, 0.24), rgba(15, 23, 42, 0.6) 58%),
    rgba(10, 15, 26, 0.95);
}

.news-badge,
.news-date,
.news-chip,
.newsletter-label,
.newsletter-point,
.newsletter-button,
.newsletter-input {
  position: relative;
  z-index: 1;
}

.news-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.18);
  color: #d1fae5;
  padding: 0.5rem 0.85rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.news-badge--soft {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.84);
}

.news-date {
  color: rgba(255, 255, 255, 0.54);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.news-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.82);
  padding: 0.5rem 0.9rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.newsletter-panel {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04)),
    rgba(12, 18, 29, 0.92);
  backdrop-filter: blur(14px);
}

.newsletter-orb {
  position: absolute;
  top: -3rem;
  right: -2rem;
  width: 10rem;
  height: 10rem;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(251, 191, 36, 0) 72%);
  animation: pulseFloat 6.5s ease-in-out infinite;
}

.newsletter-label {
  display: block;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.newsletter-input {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
}

.newsletter-textarea {
  border-radius: 1.35rem;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  resize: vertical;
  min-height: 7.5rem;
  transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
}

.newsletter-input:focus {
  border-color: rgba(16, 185, 129, 0.65);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
  transform: translateY(-1px);
}

.newsletter-textarea:focus {
  border-color: rgba(16, 185, 129, 0.65);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
  transform: translateY(-1px);
}

.newsletter-button {
  background: linear-gradient(135deg, #fde68a 0%, #34d399 100%);
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.newsletter-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(52, 211, 153, 0.2);
}

.newsletter-point {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.newsletter-dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #34d399 0%, #fde68a 100%);
  box-shadow: 0 0 18px rgba(52, 211, 153, 0.45);
  flex: 0 0 auto;
}

.donation-section {
  background:
    radial-gradient(circle at top right, rgba(251, 191, 36, 0.1), transparent 30%),
    radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.12), transparent 34%),
    linear-gradient(180deg, #08121d 0%, #0f172a 100%);
}

.donation-shell {
  position: relative;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04)),
    rgba(8, 15, 27, 0.94);
  box-shadow: 0 34px 90px rgba(2, 6, 23, 0.42);
  backdrop-filter: blur(18px);
}

.donation-ring {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  pointer-events: none;
}

.donation-ring--one {
  top: -4rem;
  right: -3rem;
  width: 14rem;
  height: 14rem;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(251, 191, 36, 0) 72%);
  animation: pulseFloat 8s ease-in-out infinite;
}

.donation-ring--two {
  left: -5rem;
  bottom: -5rem;
  width: 18rem;
  height: 18rem;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0) 72%);
  animation: pulseFloat 9.5s ease-in-out infinite reverse;
}

.donation-stat,
.donation-panel,
.donation-button,
.donation-amount {
  position: relative;
  z-index: 1;
}

.donation-stat {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  backdrop-filter: blur(12px);
}

.donation-stat__label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.donation-panel {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03)),
    rgba(14, 22, 38, 0.94);
  backdrop-filter: blur(14px);
}

.donation-amount {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  color: white;
  padding: 0.95rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
}

.donation-amount:hover {
  transform: translateY(-2px);
  border-color: rgba(52, 211, 153, 0.5);
  background: rgba(52, 211, 153, 0.12);
}

.donation-button {
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
}

.donation-button:hover {
  transform: translateY(-2px);
}

.donation-button--primary {
  background: linear-gradient(135deg, #fde68a 0%, #34d399 100%);
  color: #0f172a;
  box-shadow: 0 18px 40px rgba(52, 211, 153, 0.18);
}

.donation-button--secondary {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

@keyframes tickerSlide {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes pulseFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(0, -12px, 0) scale(1.06);
  }
}

@keyframes sheen {
  0%,
  100% {
    transform: translateX(-120%);
  }

  45%,
  55% {
    transform: translateX(120%);
  }
}

@media (max-width: 768px) {
  .floating-chip {
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    padding: 0.55rem 0.8rem;
  }

  .floating-chip--two,
  .hero-side-note {
    display: none;
  }

  .hero-section {
    padding-bottom: 7rem;
  }

  .hero-orb--left,
  .hero-orb--right {
    width: 14rem;
    height: 14rem;
  }

  .announcement-ticker__track {
    gap: 1.6rem;
    font-size: 0.68rem;
    letter-spacing: 0.18em;
  }
}
</style>
