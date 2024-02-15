import Navbar from './Navbar.vue';

import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    docs: {
      description: {
        component:
          'Navbar is top navbar using angular material. It display status connection and combobox to change language',
      },
      source: {
        code: '<navbar />',
        language: 'html',
      },
    },
  },
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args) => ({
  components: { Navbar },
  setup() {
    return { args };
  },
  template: '<Navbar v-bind="args" />',
});

export const Default = Template.bind({});
