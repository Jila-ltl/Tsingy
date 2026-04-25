<template>
  <header
    ref="headerRef"
    class="header-shell px-4 py-3 sm:px-6 lg:px-8"
    :class="mobileMenuOpen ? 'header-shell--menu-open' : ''"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4">
      <button
        class="brand-block flex min-w-0 items-center gap-3 text-left"
        type="button"
        @click="redirectTo('/')"
      >
        <img alt="logo" class="h-11 w-auto shrink-0" src="/img/logo.png">
        <span class="min-w-0">
          <span class="block truncate text-sm font-semibold tracking-[0.2em] text-white sm:text-base">
            Tsingy Marrakech
          </span>
          <span class="hidden text-xs uppercase tracking-[0.3em] text-white/50 sm:block">
            Association Et Communaute
          </span>
        </span>
      </button>

      <nav class="hidden items-center gap-2 lg:flex">
        <button
          v-for="item in menuList"
          :key="item.url"
          class="header-link"
          :class="isRouteActive(item.url) ? 'header-link--active' : ''"
          type="button"
          @click="redirectTo(item.url)"
        >
          <span class="text-xl" :class="item.ico" />
          <span>{{ item.label }}</span>
        </button>

        <button class="login-button ml-2" type="button" @click="login()">
          Se connecter
        </button>
      </nav>

      <button
        :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
        :aria-label="mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        class="menu-toggle inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
        type="button"
        @click="toggleMobileMenu"
      >
        <span :class="mobileMenuOpen ? 'mdi mdi-close text-2xl' : 'mdi mdi-menu text-2xl'" />
      </button>
    </div>

    <Teleport to="body">
      <Transition name="mobile-menu">
        <div
          v-if="mobileMenuOpen"
          class="mobile-overlay lg:hidden"
          :style="{ top: `${headerHeight}px` }"
          @click.self="closeMobileMenu"
        >
          <nav class="mobile-panel">
            <div class="mobile-panel__intro">
              <p class="mobile-panel__eyebrow">Navigation</p>
              <p class="mobile-panel__title">Explorez Tsingy rapidement</p>
            </div>

            <button
              v-for="item in menuList"
              :key="item.url"
              class="mobile-link"
              :class="isRouteActive(item.url) ? 'mobile-link--active' : ''"
              type="button"
              @click="redirectTo(item.url)"
            >
              <span class="mobile-link__content">
                <span class="text-2xl" :class="item.ico" />
                <span>{{ item.label }}</span>
              </span>
              <span class="mdi mdi-arrow-right text-lg text-white/40" />
            </button>

            <button class="login-button w-full justify-center" type="button" @click="login()">
              Se connecter
            </button>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup>
  import {
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
  } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  const headerRef = ref(null)
  const headerHeight = ref(72)
  const mobileMenuOpen = ref(false)

  const menuList = ref([
    {
      label: 'Accueil',
      url: '/',
      ico: 'mdi mdi-home',
    },
    {
      label: 'Blog',
      url: '/bureau/accueil',
      ico: 'mdi mdi-ticket-account',
    },
    {
      label: 'Contact',
      url: '/users/membre',
      ico: 'mdi mdi-account-group',
    },

  ])

  function isRouteActive (url) {
    return route.path === url
  }

  function closeMobileMenu () {
    mobileMenuOpen.value = false
  }

  function syncHeaderHeight () {
    headerHeight.value = headerRef.value?.offsetHeight || 72
  }

  function handleResize () {
    syncHeaderHeight()

    if (window.innerWidth >= 1024) {
      closeMobileMenu()
    }
  }

  function toggleMobileMenu () {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  function redirectTo (path) {
    closeMobileMenu()
    router.push(path)
  }

  function login () {
    closeMobileMenu()
    router.push('/auth/signin')
  }

  watch(mobileMenuOpen, isOpen => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })

  watch(() => route.fullPath, () => {
    closeMobileMenu()
  })

  onMounted(async () => {
    await nextTick()
    syncHeaderHeight()
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    document.body.style.overflow = ''
    window.removeEventListener('resize', handleResize)
  })

</script>

<style scoped>
.header-shell {
  position: sticky;
  top: 0;
  z-index: 40;
  overflow: visible;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.18), transparent 26%),
    linear-gradient(135deg, rgba(8, 8, 8, 0.98), rgba(20, 20, 20, 0.96));
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);
}

.header-shell--menu-open {
  z-index: 60;
}

.brand-block {
  position: relative;
  transition: transform 0.25s ease;
}

.brand-block:hover {
  transform: translateY(-1px);
}

.header-link,
.mobile-link,
.login-button {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  border-radius: 9999px;
  transition: transform 0.24s ease, border-color 0.24s ease, background-color 0.24s ease, color 0.24s ease, box-shadow 0.24s ease;
}

.header-link {
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.7rem 1rem;
  color: rgba(255, 255, 255, 0.82);
}

.header-link:hover,
.mobile-link:hover {
  transform: translateY(-2px);
  border-color: rgba(74, 222, 128, 0.45);
  background: rgba(34, 197, 94, 0.16);
  color: #ffffff;
}

.header-link--active,
.mobile-link--active {
  border-color: rgba(74, 222, 128, 0.55);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.26), rgba(22, 163, 74, 0.12));
  box-shadow: 0 12px 24px rgba(34, 197, 94, 0.18);
  color: #ffffff;
}

.login-button {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: linear-gradient(135deg, #22c55e, #166534);
  color: #ffffff;
  padding: 0.75rem 1.2rem;
  font-weight: 600;
  box-shadow: 0 12px 24px rgba(34, 197, 94, 0.2);
}

.login-button:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #16a34a, #14532d);
  box-shadow: 0 16px 30px rgba(34, 197, 94, 0.22);
}

.mobile-overlay {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 80;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0.75rem 1rem 1rem;
  background: rgba(2, 6, 10, 0.56);
  backdrop-filter: blur(12px);
}

.mobile-panel {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
  max-width: 42rem;
  max-height: calc(100dvh - 96px);
  justify-content: flex-start;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03)),
    rgba(8, 8, 8, 0.96);
  padding: 1rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
}

.mobile-panel__intro {
  padding: 0.35rem 0.2rem 0.6rem;
}

.mobile-panel__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.42);
}

.mobile-panel__title {
  margin: 0.4rem 0 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: #ffffff;
}

.mobile-link {
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem;
  color: #ffffff;
}

.mobile-link__content {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
}

.menu-toggle {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  transition: transform 0.24s ease, border-color 0.24s ease, background-color 0.24s ease;
}

.menu-toggle:hover {
  transform: translateY(-1px);
  border-color: rgba(74, 222, 128, 0.45);
  background: rgba(34, 197, 94, 0.16);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.24s ease, transform 0.24s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 640px) {
  .header-shell {
    padding-bottom: 0.9rem;
  }

  .mobile-overlay {
    padding: 0.65rem 0.75rem 0.75rem;
  }

  .mobile-panel {
    border-radius: 1.35rem;
    padding: 0.9rem;
  }

  .mobile-link,
  .login-button {
    width: 100%;
  }

  .mobile-link {
    padding: 0.95rem;
  }
}
</style>
