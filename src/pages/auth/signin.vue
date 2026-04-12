<template>
  <div id="bg_img" class="flex h-full w-full flex-row items-center justify-center">
    <div class=" signing-shell items-center justify-center p-10 gap-10">
        <div class="mb-10 flex flex-col gap-3 items-center justify-center p-5">
          <div class="logo-tsingy"></div>
          <span class="text-white text-3xl font-bold font-sans">Connexion membre</span>
          <p>Tsingy Marrakech</p>
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

        <div class="flex flex-col mt-5">
          <v-btn
            class="flex-grow-1"
            height="48"
            :loading="loading"
            variant="tonal"
            @click="load()"
          >
            Se Connecter
          </v-btn>

        </div>
    </div>

      <!-- <div class="flex flex-col justify-center sm:px-24 sm:w-[50%]">
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
            :loading="loading"
            variant="tonal"
            @click="inscription_rout()"
          >
            S'inscrire
          </v-btn>
        </div>
      </div> -->


  </div>
</template>

<script setup>

  import {
    ref,
  } from 'vue'

  import { useRouter } from 'vue-router'

  const router = useRouter()
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

  const loading = ref(false)
  function load () {
    loading.value = true
    setTimeout(() => (loading.value = false), 3000)
    setTimeout(() => (
      router.push('/users/membre')), 3200)
  }
  function inscription_rout () {
    router.push('signup')
  }
</script>

<style scoped>
.signing-shell {
    width: min(700px, 92vw);
  height: min(700px, 82vh);
    gap: 2rem;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    background-image: linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  overflow: hidden;
}
.logo-tsingy {
    width: 80px;
    height: 80px;
    margin: auto;
    background-image: url("/img/logo.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

#bg_img {
    background-image: url("../../../public/img/img1.png");
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

</style>
