import { EventListenerHandler } from 'src/interfaces';
import { onMounted, onUnmounted } from 'vue';

export const useEventListener = (
  target: EventListenerHandler,
  event: string | string[],
  callback: (event?: unknown) => void,
) => {
  onMounted(() => {
    Array.isArray(event)
      ? event.forEach((item) => target.addEventListener(item, callback))
      : target.addEventListener(event, callback);
  });
  onUnmounted(() => {
    Array.isArray(event)
      ? event.forEach((item) => target.removeEventListener(item, callback))
      : target.removeEventListener(event, callback);
  });
};

export default useEventListener;
