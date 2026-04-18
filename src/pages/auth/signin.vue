<template>
  <div id="bg_img" class="flex h-[100vh] w-full flex-row items-center justify-center">
    <div id="container" class="flex flex-row sm:w-[80vw]">
      <div class="signin-form-panel sm:w-[50%] pa-12 border-x-2">
        <div class="mb-10 ml-48">
          <span class="text-white text-3xl font-bold">Login</span>
        </div>

        <div class="signin-fields">
          <div v-for="(item, i) in user_form" :key="i" class="field-group">
            <label class="field-label" :for="item.id">
              {{ item.title }}
            </label>
            <Input_
              :id="item.id"
              v-model="item.field"
              :placeholder="item.title"
              :type="item.type"
            />
          </div>
        </div>

        <p v-if="appStore.error" class="signin-error">
          {{ appStore.error }}
        </p>

        <div class="flex flex-col">
          <v-btn
            class="flex-grow-1"
            height="48"
            :loading="appStore.loading"
            variant="tonal"
            @click="load"
          >
            Se Connecter
          </v-btn>

        </div>
      </div>
      <div class="flex flex-col justify-center sm:px-24 sm:w-[50%]">
        <div class="justify-end ml-32">
          <v-icon size="100">mdi-account-circle</v-icon>
        </div>
        <div class="justify-center">
          <span class=" text-400 text-3xl font-bold ml-10">Pas encore membre?</span>
        </div>
        <div class=" flex-col justify-center">
          <span class=" text-400 text-3l ml-10">Inscrivez-vous sur notre espace membre</span>
        </div>
        <div>
          <v-btn
            class="flex-grow-1 ml-32"
            height="48"
            variant="tonal"
            @click="inscription_rout"
          >
            S'inscrire
          </v-btn>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

  import {
    ref,
  } from 'vue'

  import { useRouter } from 'vue-router'
  import { useAppStore } from '@/stores/app'

  const router = useRouter()
  const appStore = useAppStore()
  const user_form = ref(
    [{
       id: 'signin-email',
       field: '',
       title: 'Email adress',
       type: 'email',
       icon: 'mdi-email',

     },
     {
       id: 'signin-password',
       field: '',
       title: 'Password',
       type: 'password',
       icon: 'mdi-lock',

     },
    ],
  )

  async function load () {
    try {
      const user = await appStore.login({
        email: user_form.value[0].field,
        password: user_form.value[1].field,
      })

      await router.push(user.role === 'BUREAU' || user.role === 'ADMIN' ? '/bureau/accueil' : '/users/membre')
    } catch {
      return
    }
  }
  function inscription_rout () {
    router.push('/auth/signup')
  }
</script>

<style scoped>
#bg_img {
  background-image: url('/img/img1.png');
    background-size: cover;
}

#container {
    box-shadow: 0px 2px 10px 1px rgba(71,71 ,71, 0.52);
    background-image: linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    height: 60%;
    width: 60%;
    border-radius: 20px;
}

.signin-form-panel {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.signin-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.field-label {
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.signin-error {
  border: 1px solid rgba(248, 113, 113, 0.35);
  border-radius: 14px;
  background: rgba(127, 29, 29, 0.45);
  color: white;
  padding: 0.85rem 1rem;
}

</style>
