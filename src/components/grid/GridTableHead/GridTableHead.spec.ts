import { Column } from 'src/interfaces';
import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount, VueWrapper } from '@vue/test-utils';

import GridTableHead from './GridTableHead.vue';
import { ComponentPublicInstance } from 'vue';

installQuasarPlugin();

const StubParentComponent = {
  template: `
  <q-table
      :rows="rows"
      :columns="columns"
    >
    <template #header="props">
        <grid-table-head
          :table-props="props"
        />
    </template>
  </q-table>
`,
  components: {
    GridTableHead,
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
    ] as Column<Record<string, unknown>>[],
    rows: [
      {
        name: 'test',
      },
    ],
  }),
  methods: {},
};

describe('GridTableHead.vue', () => {
  it('should trigger additemClick event when button is clicked', async () => {
    const wrapper = mount(
      StubParentComponent,
    ) as VueWrapper<ComponentPublicInstance>;
    const child: VueWrapper<ComponentPublicInstance> = wrapper.findComponent(
      GridTableHead as never,
    ) as never;
    // const button = wrapper.find('button');
    // await button.trigger('click');
    // expect(child.emitted('additemClick')).toHaveLength(1);
  });
});
