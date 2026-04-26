<template>
  <v-dialog
    class="member-modal"
    max-width="720"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card
      v-if="member"
      class="overflow-hidden rounded-xl bg-white"
    >
      <div class="grid gap-6 bg-white p-6 text-slate-900 md:grid-cols-[240px_1fr]">
        <div class="flex flex-col items-center gap-4">
          <img
            :alt="`Photo de ${fullName}`"
            class="h-56 w-full rounded-lg object-cover shadow-lg"
            :src="member.photo || member.imageUrl || '/img/member.png'"
          >
          <v-chip
            color="red"
            variant="tonal"
          >
            Membre selectionne
          </v-chip>
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-green-700">
              Detail du membre
            </p>
            <h2 class="text-3xl font-bold text-black">
              {{ fullName }}
            </h2>
          </div>

          <p class="rounded-lg border border-red-100 bg-red-50 p-4 text-sm leading-6 text-black">
            {{ description }}
          </p>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-lg border border-green-200 bg-green-50 p-4">
              <p class="text-xs uppercase tracking-[0.25em] text-green-700">
                Nom
              </p>
              <p class="mt-2 text-base font-bold text-black">
                {{ member.nom }}
              </p>
            </div>

            <div class="rounded-lg border border-green-200 bg-green-50 p-4">
              <p class="text-xs uppercase tracking-[0.25em] text-green-700">
                Prenom
              </p>
              <p class="mt-2 text-base font-bold text-black">
                {{ member.prenom }}
              </p>
            </div>

            <div class="rounded-lg border border-green-200 bg-green-50 p-4">
              <p class="text-xs uppercase tracking-[0.25em] text-green-700">
                Domicile
              </p>
              <p class="mt-2 text-base font-bold text-black">
                {{ member.domicile || member.domicile_a_marrakech || member.address || 'Non renseigne' }}
              </p>
            </div>

            <div class="rounded-lg border border-green-200 bg-green-50 p-4">
              <p class="text-xs uppercase tracking-[0.25em] text-green-700">
                Ecole
              </p>
              <p class="mt-2 text-base font-bold text-black">
                {{ member.ecole || member.univ || member.school || 'Non renseigne' }}
              </p>
            </div>
          </div>

          <div class="flex justify-end">
            <v-btn
              color="red"
              variant="flat"
              @click="emit('update:modelValue', false)"
            >
              Fermer
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    member: {
      type: Object,
      default: null,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const fullName = computed(() => {
    if (!props.member) {
      return ''
    }

    return [props.member.prenom, props.member.nom].filter(Boolean).join(' ')
  })

  const description = computed(() => {
    if (!props.member) {
      return ''
    }

    const school = props.member.ecole || props.member.univ || props.member.school || 'une structure non renseignee'
    const domicile = props.member.domicile || props.member.domicile_a_marrakech || props.member.address || 'un lieu non renseigne'

    return `${fullName.value} est un membre rattache a ${school} et reside a ${domicile}.`
  })
</script>

<style scoped>
:deep(.member-modal.v-overlay) {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

:deep(.member-modal .v-overlay__scrim) {
  background: rgba(0, 0, 0, 1);
  backdrop-filter: blur(100px);
}
</style>
