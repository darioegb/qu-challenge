import EmptyGrid from './EmptyGrid.vue';

import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Grid/EmptyGrid',
  component: EmptyGrid,
  argTypes: {
    filter: {
      description: 'Input filter value',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'EmptyGrid is text with empty grid message',
      },
      source: {
        code: '<empty-grid :filter="filter" />',
        language: 'html',
      },
    },
  },
} as Meta<typeof EmptyGrid>;

const Template: StoryFn<typeof EmptyGrid> = (args) => ({
  components: { EmptyGrid },
  setup() {
    return { args };
  },
  template: '<EmptyGrid v-bind="args" />',
});

export const Default = Template.bind({});

Default.args = {
  filter: '',
};
