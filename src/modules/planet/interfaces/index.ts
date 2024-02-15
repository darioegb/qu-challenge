import { ComputedRef } from 'vue';

import { RequestGrid } from 'src/interfaces';

export interface Planet {
  name: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
}

export interface PlanetState {
  planets: Planet[];
}

export interface PlanetResponse {
  planets: ComputedRef<Planet[]>;
  getPlanets: (requestGrid: RequestGrid<Planet>) => Promise<number | undefined>;
}
