import { BaseLayout } from 'src/layouts';

export default {
  name: 'planets',
  component: BaseLayout,
  children: [
    {
      path: '',
      name: 'PlanetGrid',
      component: (): Promise<unknown> =>
        import('src/modules/planet/pages/PlanetGrid/PlanetGrid.vue'),
    },
  ],
};
