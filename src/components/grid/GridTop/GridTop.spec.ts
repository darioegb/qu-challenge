import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';

import GridTop from './GridTop.vue';
import i18n from 'src/config/i18n';

installQuasarPlugin();

describe('GridTop.vue', () => {
  it('should trigger change filter event when input changed', async () => {
    const filter = 'ala';
    const wrapper = mount(GridTop, {
      global: {
        plugins: [i18n],
      },
    });
    await wrapper.find('input').setValue(filter);
    expect(wrapper.emitted('change')).toHaveLength(1);
    await wrapper.find('input').setValue('');
    expect(wrapper.emitted('change')).toHaveLength(2);
  });
});
