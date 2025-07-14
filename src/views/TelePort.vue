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
  <!-- 查看代码 -->
  <button class="show-code-fab" style="background-color:red ;" @click="showCode = true" title="查看代码"></button>
  <div v-if="showCode" class="code-modal">
      <div class="code-modal-content">
          <button class="close-btn" @click="showCode = false">×</button>
          <button class="copy-btn" @click="copyCode" title="复制代码">复制</button>
          <transition name="fade">
              <div v-if="copySuccess" class="copy-success-tip">复制成功</div>
          </transition>
          <pre><code>{{ sourceCode }}</code></pre>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalDialog from '@/components/ModalDialog.vue';
//查看代码，复制代码
import '@/assets/style/showcode.css'
const showCode = ref(false)
const copySuccess = ref(false)
const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}
const sourceCode = `<template>
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
  <!-- 查看代码 -->
  <button class="show-code-fab" style="background-color:red ;" @click="showCode = true" title="查看代码"></button>
  <div v-if="showCode" class="code-modal">
      <div class="code-modal-content">
          <button class="close-btn" @click="showCode = false">×</button>
          <button class="copy-btn" @click="copyCode" title="复制代码">复制</button>
          <transition name="fade">
              <div v-if="copySuccess" class="copy-success-tip">复制成功</div>
          </transition>
          <pre><code>{{ sourceCode }}</code></pre>
      </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ModalDialog from '@/components/ModalDialog.vue';
//查看代码，复制代码
import '@/assets/style/showcode.css'
const showCode = ref(false)
const copySuccess = ref(false)
const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}
  //其他代码
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
<\/script>

<style scoped lang="scss">
/* 父组件样式 */
</style>`;
//其他代码
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