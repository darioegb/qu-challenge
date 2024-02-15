<template>
  <q-tr :props="tableProps">
    <q-td v-for="col in tableProps.cols" :key="col.name" :props="tableProps">
      <span>
        {{ getRowValue(col, tableProps.row) }}
      </span>
    </q-td>
  </q-tr>
</template>

<script setup lang="ts">
import { Column } from 'src/interfaces';

defineProps<{
  tableProps: { cols: Column<unknown>[]; row: Record<string, unknown> };
}>();

const getRowValue = (
  { format, name }: Column<unknown>,
  row: Record<string, unknown>,
): unknown => (format ? format(row[name]) : row[name] || '-');
</script>
