/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Meta, StoryFn } from '@storybook/vue3';

import GridItem from './GridItem.vue';

export default {
  title: 'Components/Grid/GridItem',
  component: GridItem,
  argTypes: {
    onViewItemClicked: {
      action: 'viewitemClick',
      table: {
        disable: true,
      },
    },
    onEditItemClicked: {
      action: 'edititemClick',
      table: {
        disable: true,
      },
    },
    onDeleteItemClicked: {
      action: 'deleteitemClick',
      table: {
        disable: true,
      },
    },
    tableProps: {
      description: 'Row & Columns values',
    },
    viewitemClick: {
      description: 'Fired when view button is clicked',
      control: false,
    },
    edititemClick: {
      description: 'Fired when edit button is clicked',
      control: false,
    },
    deleteitemClick: {
      description: 'Fired when delete button is clicked',
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'GridItem is row grid',
      },
      source: {
        code: `
        <grid-item
          :table-props="props"
          @viewitem-click="handlerAddOrEditOrView"
          @edititem-click="handlerAddOrEditOrView"
          @deleteitem-click="handlerDelete"
        />`,
        language: 'html',
      },
    },
  },
} as Meta<typeof GridItem>;

const Template: StoryFn<typeof GridItem> = ({
  tableProps: { row, cols },
  onViewItemClicked,
  onEditItemClicked,
  onDeleteItemClicked,
}: Record<string, Record<string, unknown>>) => ({
  components: { GridItem },
  setup() {
    const rows = [row];
    const columns = [...(cols as unknown[])];
    const handlers = {
      viewitemClick: onViewItemClicked,
      edititemClick: onEditItemClicked,
      deleteitemClick: onDeleteItemClicked,
    };
    return {
      handlers,
      rows,
      columns,
    };
  },
  template: `<q-table :rows="rows" :columns="columns" hide-header
  hide-bottom>
    <template #body="props">
      <GridItem
        :table-props="props"
        v-on="handlers"
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

export const RowImg = Template.bind({});
RowImg.args = {
  tableProps: {
    row: {
      picture: 'https://webkit.org/demos/srcset/image-src.png',
    },

    cols: [
      { name: 'picture', field: 'picture', label: 'Picture', isImg: true },
    ],
  },
};

export const RowImgEmpty = Template.bind({});
RowImgEmpty.args = {
  tableProps: {
    row: {
      picture: null,
    },

    cols: [
      { name: 'picture', field: 'picture', label: 'Picture', isImg: true },
    ],
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
