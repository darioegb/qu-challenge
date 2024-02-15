/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Meta, StoryFn } from '@storybook/vue3';

import GridTableHead from './GridTableHead.vue';

export default {
  title: 'Components/Grid/GridTableHead',
  component: GridTableHead,
  argTypes: {
    tableProps: {
      description: 'Columns values',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'GridTableHead is header row grid with add button',
      },
      source: {
        code: '<grid-table-head :table-props="props" />',
        language: 'html',
      },
    },
  },
} as Meta<typeof GridTableHead>;

const Template: StoryFn<typeof GridTableHead> = ({
  tableProps: { cols },
}: Record<string, Record<string, unknown>>) => ({
  components: { GridTableHead },
  setup() {
    const columns = [...(cols as unknown[])];
    return {
      columns,
    };
  },
  template: `<q-table :columns="columns" hide-bottom>
    <template #header="props">
      <GridTableHead
        :table-props="props"
       />
    </template>
  </q-table>`,
});

export const Default = Template.bind({});

Default.args = {
  tableProps: {
    cols: [
      { name: 'name', field: 'name', label: 'Name' },
      { name: 'email', field: 'email', label: 'Email' },
    ],
  },
};
