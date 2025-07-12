<template>
  <div>
    <el-button type="primary" @click="openModal">打开模态框</el-button>
    <ModalDialog
      ref="modalRef"
      title="自定义标题"
      content="这是模态框的内容"
      @confirm="handleConfirm"
      @close="handleClose"
    >
      <template #content>
        <div>通过插槽自定义的内容</div>
      </template>
      <template #footer>
        <el-button @click="closeModal">关闭</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </template>
    </ModalDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalDialog from '@/components/ModalDialog.vue';

const modalRef = ref();

const openModal = () => {
  modalRef.value.openModal();
};

const closeModal = () => {
  modalRef.value.closeModal();
};

const handleConfirm = () => {
  console.log('确认操作');
};

const handleClose = () => {
  console.log('模态框已关闭');
};

const submitForm = () => {
  console.log('提交表单');
  closeModal();
};
</script>

<style scoped lang="scss">
/* 父组件样式 */
</style>