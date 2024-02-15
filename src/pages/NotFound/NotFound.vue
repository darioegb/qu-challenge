<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <h1>{{ translate('pageNotFound.title') }}</h1>

      <div class="text-h2">
        {{ translate('pageNotFound.subtitle') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        to="/"
        :label="translate('globals.buttons.backHome')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t: translate } = useI18n({ useScope: 'global' });
</script>

<style lang="scss" scoped>
h1 {
  font-size: 30vh;
}
.text-h2 {
  opacity: 0.4;
}
</style>
