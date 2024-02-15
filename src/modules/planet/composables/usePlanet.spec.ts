import { describe, expect, it, jest } from '@jest/globals';
import { DEFAULT_PAGE_CONFIG } from 'src/globals';
import { PlanetState } from 'src/modules/planet/interfaces';

// must define this above the `usePlanet` import, otherwise the ReferenceError is raised.
const mockFn = jest.fn();
const mockUseStoreFn = jest.fn(() => undefined);

import { usePlanet } from '.';

jest.mock('vuex', () => ({
  useStore: mockUseStoreFn,
}));

describe('usePlanet', () => {
  const pageConfig = { ...DEFAULT_PAGE_CONFIG };

  const setState = (planetsState?: PlanetState) => {
    mockUseStoreFn.mockReturnValueOnce({
      state: {
        planets: planetsState
          ? planetsState
          : {
              planets: [],
            },
      },
      commit: mockFn,
      dispatch: mockFn,
    } as never);
  };

  it('should return initial state', () => {
    setState();
    const { planets } = usePlanet();
    expect(planets.value).toEqual([]);
  });

  it('should set setPlanets with getPlanets action', async () => {
    const requestGrid = {
      pagination: pageConfig,
      filter: 'man',
    };
    setState();
    const { getPlanets } = usePlanet();

    await getPlanets(requestGrid);
    expect(mockFn).toHaveBeenCalledWith('planets/getPlanets', requestGrid);
  });
});
