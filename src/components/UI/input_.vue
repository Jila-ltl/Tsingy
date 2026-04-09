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
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  outline: none;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.65);
}

.custom-input:focus {
  border-color: #c5a059;
}
</style>
