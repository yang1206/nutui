<template>
  <nut-input-number v-model="val" disabled />
</template>
<script setup lang="ts">
import { ref } from 'vue';
const val = ref(1);
</script>
