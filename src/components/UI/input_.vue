<template>
  <input
    :id="id"
    class="custom-input"
    :placeholder="placeholder"
    :type="type"
    :value="modelValue"
    @input="onInput"
  >
</template>

<script setup>
  defineProps({
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['update:modelValue'])

  function onInput (event) {
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

.custom-input::placeholder {
  color: #6b7280;
}

.custom-input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
  background: #ffffff;
}
</style>
