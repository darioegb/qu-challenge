/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Meta, StoryFn } from '@storybook/vue3';

import GridItem from './GridItem.vue';

export default {
  title: 'Components/Grid/GridItem',
  component: GridItem,
  argTypes: {
    tableProps: {
      description: 'Row & Columns values',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'GridItem is row grid',
      },
      source: {
        code: '<grid-item :table-props="props" />',
        language: 'html',
      },
    },
  },
} as Meta<typeof GridItem>;

const Template: StoryFn<typeof GridItem> = ({
  tableProps: { row, cols },
}: Record<string, Record<string, unknown>>) => ({
  components: { GridItem },
  setup() {
    const rows = [row];
    const columns = [...(cols as unknown[])];
    return {
      rows,
      columns,
    };
  },
  template: `<q-table :rows="rows" :columns="columns" hide-header
  hide-bottom>
    <template #body="props">
      <GridItem
        :table-props="props"
       />
    </template>
  </q-table>`,
});

export const Default = Template.bind({});

Default.args = {
  tableProps: {
    row: { name: 'Test' },
    cols: [{ name: 'name', field: 'name', label: 'Name' }],
  },
};

export const RowFormat = Template.bind({});
RowFormat.args = {
  tableProps: {
    row: { amount: 10 },
    cols: [
      {
        name: 'amount',
        field: 'amount',
        label: 'Amount',
        format: (value: number): string => `${value}$`,
      },
    ],
  },
};
