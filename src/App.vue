<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAxiosLoader } from './composables';

useAxiosLoader();
</script>
