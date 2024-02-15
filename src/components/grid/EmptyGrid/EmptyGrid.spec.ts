import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

import EmptyGrid from './EmptyGrid.vue';
import i18n from 'src/config/i18n';

describe('EmptyGrid.vue', () => {
  it('renders props.filter when passed', () => {
    const filter = 'test';
    const wrapper = shallowMount(EmptyGrid, {
      global: {
        stubs: {
          QIcon: true,
        },
        plugins: [i18n],
      },
      props: { filter },
    });
    expect(wrapper.text()).toMatch(`No data matching the filter ${filter}`);
  });
});
