import { ComponentPublicInstance } from 'vue';
import { describe, expect, it, beforeAll } from '@jest/globals';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';

import { Column } from 'src/interfaces';
import GridItem from './GridItem.vue';
import i18n from 'src/config/i18n';

installQuasarPlugin();

const StubParentComponent = {
  template: `
  <q-table
      :rows="rows"
      :columns="columns"
    >
    <template #body="props">
        <grid-item
          :table-props="props"
        />
      </template>
  </q-table>
`,
  components: {
    GridItem,
  },
  data: () => ({
    columns: [
      {
        name: 'name',
        align: 'left',
        label: 'Name',
        field: 'name',
        sortable: true,
      },
      {
        name: 'scored',
        align: 'left',
        label: 'Scored',
        field: 'scored',
        format: (value: number) => `${value}%`,
      },
    ] as Column<Record<string, unknown>>[],
    rows: [
      {
        id: '1',
        name: 'test',
        scored: 60,
      },
      {
        id: '2',
        name: '',
        scored: 20,
      },
    ],
  }),
  methods: {},
};

describe('GridItem.vue', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let rows: DOMWrapper<HTMLTableRowElement>[];

  beforeAll(() => {
    wrapper = mount(StubParentComponent, {
      global: {
        plugins: [i18n],
      },
    });
    rows = wrapper.findAll('tr.q-tr');
  });

  it('should display correctly', () => {
    expect(rows).toHaveLength(2);
  });
});
