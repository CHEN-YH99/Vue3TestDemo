<template>
  <div>
    <el-card class="tracker-card">
      <div>鼠标坐标:X = {{ x }}, Y = {{ y }}</div>
      <el-button @click="resetPosition" type="primary">重置坐标</el-button>
    </el-card>
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
  import { useMouseTracker } from '@/assets/js/useMouseTracker';
  //查看代码，复制代码
import { ref } from 'vue'
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
    <el-card class="tracker-card">
      <div>鼠标坐标:X = {{ x }}, Y = {{ y }}</div>
      <el-button @click="resetPosition" type="primary">重置坐标</el-button>
    </el-card>
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
  import { useMouseTracker } from '@/assets/js/useMouseTracker';
  //查看代码，复制代码
import { ref } from 'vue'
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
  const { x, y, resetPosition } = useMouseTracker();
<\/script>
  
  <style scoped lang="scss">
  .tracker-card {
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
  }
  </style>`;
//其他代码
  const { x, y, resetPosition } = useMouseTracker();
  </script>
  
  <style scoped lang="scss">
  .tracker-card {
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
  }
  </style>