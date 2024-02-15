import { mount } from '@vue/test-utils';
import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import { storeKey } from './store';
import routes from './router/routes';
import i18n from './config/i18n';
import createVuexStore from './testing/mock-store';

installQuasarPlugin();

describe('App', () => {
  const initialState = {
    planets: [],
  };
  const store = createVuexStore(initialState);
  const router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });

  it('renders props.filter when passed', async () => {
    void router.push('/');
    await router.isReady();
    const wrapper = mount(App, {
      global: {
        plugins: [i18n, [store, storeKey], router],
      },
    });
    expect(wrapper.html()).toContain('QU challenge');
  });
});
