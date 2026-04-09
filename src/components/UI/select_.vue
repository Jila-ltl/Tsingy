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
      v-for="option in options"
      :key="option"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script setup>
  defineProps({
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

  function onChange (event) {
    emit('update:modelValue', event.target.value)
  }
</script>

<style scoped>
.custom-input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    color: white;
    outline: none;
}

.custom-select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c5a059'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.5em;
    padding-right: 2.5rem;
    cursor: pointer;
}

.custom-select option {
    background-color: #1f1f1f;
    color: white;
}

.custom-input:focus {
    border-color: #c5a059;
}
</style>
