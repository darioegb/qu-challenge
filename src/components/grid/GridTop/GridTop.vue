<template>
  <q-input
    clearable
    outlined
    dense
    debounce="500"
    v-model="filter"
    :label="translate('globals.grid.filterInput.label')"
    :placeholder="translate('globals.grid.filterInput.placeholder')"
    @update:model-value="onChange"
  >
    <template #append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits<{
  (event: 'change', value: unknown): void;
}>();

const { t: translate } = useI18n({ useScope: 'global' });
const filter = ref<string>('');
const onChange = (value: unknown) =>
  (String(value).length > 2 || String(value).length === 0) &&
  emit('change', value);
</script>
