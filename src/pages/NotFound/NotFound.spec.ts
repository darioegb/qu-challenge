import { describe, expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';

import NotFound from './NotFound.vue';
import i18n from 'src/config/i18n';

installQuasarPlugin();

describe('NotFound.vue', () => {
  it('should render', () => {
    const wrapper = mount(NotFound, {
      global: {
        plugins: [i18n],
      },
    });
    expect(wrapper.find('h1').text()).toMatch('404');
    expect(wrapper.find('.text-h2').text()).toMatch('Oops. Nothing here...');
  });
});
