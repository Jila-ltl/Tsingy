<template>
  <div class="select-shell custom-input">
    <span class="select-shell__value" :class="modelValue ? '' : 'select-shell__value--placeholder'">
      {{ selectedLabel }}
    </span>
    <select
      :id="id"
      class="custom-select"
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
  </div>
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

  const selectedLabel = computed(() => {
    if (!props.modelValue) {
      return props.placeholder || 'Choisir une option...'
    }

    const selectedOption = normalizedOptions.value.find(option => option.value === props.modelValue)

    return selectedOption?.label || props.modelValue
  })

  function onChange (event) {
    emit('update:modelValue', event.target.value)
  }
</script>

<style scoped>
.select-shell {
  position: relative;
  color: inherit;
}

.select-shell::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 1rem;
  width: 0.8rem;
  height: 0.5rem;
  background-color: var(--select-arrow-color, #15803d);
  pointer-events: none;
  transform: translateY(-50%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.select-shell__value {
  position: absolute;
  top: 50%;
  left: 14px;
  right: 3rem;
  z-index: 1;
  overflow: hidden;
  color: currentColor;
  line-height: 1.2;
  pointer-events: none;
  text-overflow: ellipsis;
  transform: translateY(-50%);
  white-space: nowrap;
}

.select-shell__value--placeholder {
  opacity: 0.72;
}

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
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  border: 0;
  outline: none;
  background: transparent;
  color: transparent;
  opacity: 0.01;
  cursor: pointer;
}

.custom-select::-ms-expand {
  display: none;
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
