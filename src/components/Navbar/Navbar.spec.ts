import { describe, expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';

import Navbar from './Navbar.vue';
import i18n from 'src/config/i18n';
import { QSelect } from 'quasar';

installQuasarPlugin();

describe('Navbar.vue', () => {
  const title = 'QU challenge';

  it('should render', () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [i18n],
      },
    });
    expect(wrapper.find('h1').text()).toMatch(title);
  });

  it('should set locale when change select', async () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [i18n],
      },
    });
    const select = wrapper.findComponent(QSelect);
    await select.setValue('es');
    expect(wrapper.html()).toContain('Spanish');
  });
});
