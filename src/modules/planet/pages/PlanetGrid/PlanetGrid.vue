<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      :title="translate('planets.title')"
      :rows="rows"
      :rows-per-page-options="ROWS_PER_PAGE_CONFIG"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      :filter="filter"
      @request="onRequest"
    >
      <template #header="props">
        <grid-table-head :table-props="props" />
      </template>
      <template #body="props">
        <grid-item :table-props="props" />
      </template>
      <template #top-right>
        <grid-top @change="handleFilterChange" />
      </template>
      <template #no-data>
        <empty-grid :filter="filter" />
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { DEFAULT_PAGE_CONFIG, ROWS_PER_PAGE_CONFIG } from 'src/globals';
import { Column, PageConfig, RequestGrid } from 'src/interfaces';
import { Planet } from 'src/modules/planet/interfaces';
import { GridTableHead, GridItem, GridTop, EmptyGrid } from 'src/components';
import { usePlanet } from 'src/modules/planet/composables';

const { t: translate } = useI18n({ useScope: 'global' });

const { planets, getPlanets } = usePlanet();
const rows = ref<Planet[]>([]);
const filter = ref<string>('');
const pagination = ref<PageConfig<Planet>>(DEFAULT_PAGE_CONFIG);
const columns: ComputedRef<Column<Planet>[]> = computed(() => [
  {
    name: 'name',
    align: 'left',
    label: translate('planets.grid.columns.name'),
    field: 'name',
    sortable: true,
  },
  {
    name: 'diameter',
    align: 'left',
    label: translate('planets.grid.columns.diameter'),
    field: 'diameter',
    sortable: true,
  },
  {
    name: 'climate',
    label: translate('planets.grid.columns.climate'),
    field: 'climate',
  },
  {
    name: 'gravity',
    label: translate('planets.grid.columns.gravity'),
    field: 'gravity',
  },
  {
    name: 'terrain',
    label: translate('planets.grid.columns.terrain'),
    field: 'terrain',
  },
  {
    name: 'population',
    align: 'center',
    label: translate('planets.grid.columns.population'),
    field: 'population',
  },
]);

onMounted(async () => {
  await onRequest({ pagination: pagination.value });
});

const handleFilterChange = (value: unknown) => (filter.value = value as string);

const onRequest = async (props: unknown) => {
  const { pagination: newPagination, filter: newFilter } =
    props as RequestGrid<Planet>;
  const { page, rowsPerPage, sortBy, descending } = newPagination;
  const count = await getPlanets({
    pagination: newPagination,
    filter: newFilter,
  });

  if (!count) return;

  rows.value = planets.value;
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;
};
</script>
