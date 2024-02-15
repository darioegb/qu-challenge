<template>
  <q-toolbar class="bg-primary text-white navbar">
    <h1>{{ translate('globals.title') }}</h1>
    <div>
      <q-icon v-if="online" name="wifi" left size="sm" />
      <q-icon v-else name="wifi_off" left size="sm" />
      <q-select
        v-model="lang"
        :options="langOptions"
        outlined
        dense
        borderless
        emit-value
        map-options
        options-dense
      />
    </div>
  </q-toolbar>
</template>

<script setup lang="ts">
import { QuasarLanguage, useQuasar } from 'quasar';
import { computed, ref, watch } from 'vue';
import languages from 'quasar/lang/index.json';
import { useI18n } from 'vue-i18n';
import { useOnline } from 'src/composables';

const appLanguages = languages.filter(({ isoName }) =>
  ['es', 'en-US'].includes(isoName),
);
const $q = useQuasar();
const lang = ref(localStorage.getItem('lang') || $q.lang.isoName);
const { t: translate, locale } = useI18n({ useScope: 'global' });
const { online } = useOnline();

const langOptions = computed(() =>
  appLanguages.map(({ isoName }) => ({
    label: translate(`globals.locales.${isoName.substring(0, 2)}`),
    value: isoName,
  })),
);

watch(lang, async (val) => {
  // dynamic import, so loading on demand only
  const lang = (await import('quasar/lang/' + val)) as {
    default: QuasarLanguage;
  };
  locale.value = val;
  $q.lang.set(lang.default);
  localStorage.setItem('lang', val);
});
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 1.5rem;
    line-height: 1.5rem;
    padding: 0 16px;
  }
  div {
    display: flex;
    align-items: center;
  }
  :deep(.q-field__native),
  :deep(.q-field__append) {
    color: white;
  }
}
</style>
