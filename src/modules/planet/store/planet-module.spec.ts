import { describe, expect, it, jest } from '@jest/globals';
import { DEFAULT_PAGE_CONFIG } from 'src/globals';
import { PlanetState } from 'src/modules/planet/interfaces';

const mockFn = jest.fn();

import createVuexStore from 'src/testing/mock-store';
import { planetsState } from 'src/testing/test-planet-state';

jest.mock('axios', () => ({
  get: mockFn,
  post: mockFn,
  put: mockFn,
  delete: mockFn,
}));

describe('planet-module', () => {
  const initialState: PlanetState = {
    planets: [],
  };
  const pageConfig = { ...DEFAULT_PAGE_CONFIG };

  it('should return initial state', () => {
    const store = createVuexStore(initialState);
    const { planets } = store.state.planets;
    expect(planets).toEqual([]);
  });

  it('should set setPlanets with getPlanets action', async () => {
    mockFn.mockReturnValueOnce({
      data: { results: planetsState.planets, count: 2 },
    } as never);
    const store = createVuexStore(initialState);
    const count = (await store.dispatch('planets/getPlanets', {
      pagination: pageConfig,
      filter: 'ala',
    })) as number;
    expect(store.state.planets.planets.length).toBe(2);
    expect(count).toBe(2);
  });

  it('should set setPlanets with getPlanets action without data when error occurred', async () => {
    mockFn.mockRejectedValueOnce(new Error('Async Error'));
    const store = createVuexStore(initialState);
    await store.dispatch('planets/getPlanets', {
      pagination: pageConfig,
    });
    expect(store.state.planets.planets.length).toBe(0);
  });
});
