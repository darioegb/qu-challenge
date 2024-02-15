/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Meta, StoryFn } from '@storybook/vue3';

import GridTop from './GridTop.vue';

export default {
  title: 'Components/Grid/GridTop',
  component: GridTop,
  argTypes: {
    onChange: {
      action: 'change',
      table: {
        disable: true,
      },
    },
    change: {
      description: 'Fired when typewrite on input search',
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'GridTop is a top right column of the first row of the grid above the GridTableHead that contain an input search',
      },
      source: {
        code: '<grid-top @change="handleFilterChange" />',
        language: 'html',
      },
    },
  },
} as Meta<typeof GridTop>;

const Template: StoryFn<typeof GridTop> = ({
  onChange,
}: Record<string, unknown>) => ({
  components: { GridTop },
  setup() {
    return {
      onChange,
    };
  },
  template: `<q-table hide-bottom>
    <template #top-right>
      <grid-top @change="onChange" />
    </template>
  </q-table>`,
});

export const Default = Template.bind({});
