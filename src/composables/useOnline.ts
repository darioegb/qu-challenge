import { ref } from 'vue';
import { useEventListener } from './useEventListener';

export const useOnline = () => {
  const online = ref(navigator.onLine);

  const checkNetworkStatus = () => (online.value = navigator.onLine);

  useEventListener(window, ['online', 'offline'], checkNetworkStatus);

  return { online };
};

export default useOnline;
