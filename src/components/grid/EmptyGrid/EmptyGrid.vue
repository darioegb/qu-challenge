<template>
  <q-icon name="warning" size="sm" class="q-mr-sm" />
  {{ translate('globals.grid.noMatchingDataText', { value: filter }) }}
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{
  filter: string;
}>();

const { t: translate } = useI18n({ useScope: 'global' });
</script>
