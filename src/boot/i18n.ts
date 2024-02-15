import { Plugin } from 'vue';
import { boot } from 'quasar/wrappers';

import i18n from 'src/config/i18n';

export default boot(({ app }) => {
  app.use(i18n as Plugin);
});
