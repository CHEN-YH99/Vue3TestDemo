<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <el-dialog
            v-model="isOpen"
            :title="title"
            :width="width"
            :close-on-click-modal="false"
            :show-close="false"
            @close="closeModal"
          >
            <slot name="content">
              <div class="modal-content">
                {{ content }}
              </div>
            </slot>

            <template #footer>
              <slot name="footer">
                <el-button @click="closeModal">取消</el-button>
                <el-button type="primary" @click="confirmAction">确认</el-button>
              </slot>
            </template>
          </el-dialog>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ElDialog, ElButton } from 'element-plus';

const props = defineProps({
  title: {
    type: String,
    default: '提示',
  },
  content: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '50%',
  },
});

const emit = defineEmits(['confirm', 'close']);

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
  emit('close');
};

const confirmAction = () => {
  emit('confirm');
  closeModal();
};

// 键盘 ESC 关闭
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

defineExpose({ openModal, closeModal });
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  width: v-bind('props.width');
  max-width: 90%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
