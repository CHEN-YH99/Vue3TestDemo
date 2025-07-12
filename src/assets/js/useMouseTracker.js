import { ref, onMounted, onUnmounted } from 'vue';

export function useMouseTracker() {
  const x = ref(0);
  const y = ref(0);

  const updateMousePosition = (event) => {
    x.value = event.clientX;
    y.value = event.clientY;
  };

  const resetPosition = () => {
    x.value = 0;
    y.value = 0;
  };

  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition);
  });

  return { x, y, resetPosition };
}