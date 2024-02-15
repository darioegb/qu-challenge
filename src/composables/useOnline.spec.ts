import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

import useOnline from './useOnline';

const StubComponent = {
  template: `
  {{online ? 'Online' : 'Offline'}}
`,
  setup() {
    const { online } = useOnline();
    return {
      online,
    };
  },
};

describe('useOnline', () => {
  it('should return true when internet connection is on', () => {
    const wrapper = shallowMount(StubComponent);
    expect(wrapper.html()).toMatch('Online');
  });
});
