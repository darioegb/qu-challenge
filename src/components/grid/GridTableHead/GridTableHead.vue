<template>
  <q-tr :props="tableProps">
    <q-th v-for="col in tableProps.cols" :key="col.name" :props="tableProps">
      {{ col.label }}
    </q-th>
  </q-tr>
</template>

<script setup lang="ts">
import { Column } from 'src/interfaces';

defineProps<{
  tableProps: { cols: Column<unknown>[] };
}>();
</script>
