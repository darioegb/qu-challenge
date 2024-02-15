import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { mount, flushPromises } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';

import i18n from 'src/config/i18n';
import { Planet } from 'src/modules/planet/interfaces';
import { PageConfig } from 'src/interfaces';

// must define this above the `PlanetGrid` import, otherwise the ReferenceError is raised.
const mockGetFn = jest.fn(() => undefined);

import PlanetGrid from './PlanetGrid.vue';
import { storeKey } from 'src/store';
import createVuexStore from 'src/testing/mock-store';
import { planetsState } from 'src/testing/test-planet-state';

installQuasarPlugin();
jest.mock('axios', () => ({
  get: mockGetFn,
}));

describe('PlanetGrid.vue', () => {
  const initialState = {
    planets: [],
  };
  const store = createVuexStore(initialState);
  const response = {
    data: { results: planetsState.planets, count: 2 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = mount(PlanetGrid, {
      global: {
        plugins: [i18n, [store, storeKey]],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('initially fetches and displays planets', async () => {
    mockGetFn.mockResolvedValueOnce(response as never);

    const wrapper = mount(PlanetGrid, {
      global: {
        plugins: [i18n, [store, storeKey]],
      },
    });
    expect(mockGetFn).toHaveBeenCalled();
    await flushPromises();
    const tableRows = wrapper.findAll('.q-table tbody tr');
    expect(tableRows.length).toBe(2);
  });

  it('should change filter value when the input value is changed', async () => {
    mockGetFn.mockResolvedValueOnce(response as never);
    const wrapper = mount(PlanetGrid, {
      global: {
        plugins: [i18n, [store, storeKey]],
      },
    });
    const filter = 'ala';
    const input = wrapper.find('input');
    await input.setValue(filter);
    expect((wrapper.vm as unknown as { filter: unknown }).filter).toBe(filter);
    expect(wrapper.emitted('change')).toHaveLength(1);
  });

  it("should'n render PlanetGrid when error ocurred", () => {
    mockGetFn.mockRejectedValueOnce('Error');
    const wrapper = mount(PlanetGrid, {
      global: {
        plugins: [i18n, [store, storeKey]],
      },
    });
    const { count } = wrapper.vm as unknown as {
      count?: number;
      pagination: PageConfig<Planet>;
    };
    expect(count).toBeUndefined();
  });
});
