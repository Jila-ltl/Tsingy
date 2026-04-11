<template>
  <select
    :id="id"
    class="custom-input custom-select"
    :value="modelValue"
    @change="onChange"
  >
    <option disabled value="">
      {{ placeholder || 'Choisir une option...' }}
    </option>
    <option
      v-for="option in normalizedOptions"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Choisir une option...',
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const normalizedOptions = computed(() => {
    return props.options.map(option => {
      if (typeof option === 'object' && option !== null) {
        return {
          label: option.label,
          value: option.value,
        }
      }

      return {
        label: option,
        value: option,
      }
    })
  })

  function onChange (event) {
    emit('update:modelValue', event.target.value)
  }
</script>

<style scoped>
.custom-input {
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid #d1fae5;
  background: rgba(255, 255, 255, 0.92);
  color: #111827;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.custom-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2315803d'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5em;
  padding-right: 2.5rem;
  cursor: pointer;
}

.custom-select option {
  background-color: #ffffff;
  color: #111827;
}

.custom-input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
  background: #ffffff;
}
</style>
