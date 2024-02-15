<template>
  <q-layout>
    <q-header elevated>
      <navbar />
    </q-header>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { Navbar } from 'src/components';
</script>
