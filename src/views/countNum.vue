<template>
    <div class="countNum">
        <button :disabled="count <= 0" @click="decrement">-</button>
        <transition-group 
            :name="isIncreasing ? 'count-roll-up' : 'count-roll-down'" 
            tag="span" 
            class="count-display"
        >
            <span :key="count" class="count-number">{{ count }}</span>
        </transition-group>
        <button :disabled="count >= 10" @click="increment">+</button>
        <button class="show-code-fab" @click="showCode = true" title="查看代码"></button>
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
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const isIncreasing = ref(false)
const showCode = ref(false)
const copySuccess = ref(false)

const increment = () => {
  if (count.value < 10) {
    isIncreasing.value = true
    count.value++
  }
}

const decrement = () => {
  if (count.value > 0) {
    isIncreasing.value = false
    count.value--
  }
}

const sourceCode = `<template>
  <div class="countNum">
    <button :disabled="count <= 0" @click="decrement">-</button>
    <transition-group 
      :name="isIncreasing ? 'count-roll-up' : 'count-roll-down'" 
      tag="span" 
      class="count-display"
    >
      <span :key="count" class="count-number">{{ count }}</span>
    </transition-group>
    <button :disabled="count >= 10" @click="increment">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const isIncreasing = ref(false)

const increment = () => {
  if (count.value < 10) {
    isIncreasing.value = true
    count.value++
  }
}

const decrement = () => {
  if (count.value > 0) {
    isIncreasing.value = false
    count.value--
  }
}
<\/script>

<style scoped>
.count-display {
  display: inline-block;
  position: relative;
  height: 40px;
  overflow: hidden;
}

.count-number {
  display: block;
  font-size: 28px;
  text-align: center;
  min-width: 40px;
}

.count-roll-up-enter-active,
.count-roll-up-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.count-roll-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.count-roll-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.count-roll-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.count-roll-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.count-roll-down-enter-active,
.count-roll-down-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.count-roll-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.count-roll-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.count-roll-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.count-roll-down-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>`

const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}
</script>

<style scoped lang="scss">
.countNum {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7fa;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  gap: 24px;
  padding: 32px 0;
  position: relative;

  button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: #409eff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    box-shadow: 0 1px 4px rgba(64,158,255,0.15);

    &:disabled {
      background: #dcdfe6;
      color: #aaa;
      cursor: not-allowed;
      box-shadow: none;
    }
    &:not(:disabled):hover {
      background: #66b1ff;
    }
  }

  span {
    min-width: 40px;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: #333;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    padding: 8px 0;
  }
}

.show-code-fab {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  // background: #e3e9ef;
  color: #fff;
  border: none;
  box-shadow: 0 4px 16px rgba(64,158,255,0.18);
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10000;
  transition: background 0.2s, box-shadow 0.2s;
}
.show-code-fab::before {
  content: '<>';
  font-family: monospace;
  font-size: 28px;
}
.show-code-fab:hover {
  background: #66b1ff;
}
.show-code-fab[title]:hover::after {
  content: attr(title);
  position: absolute;
  right: 70px;
  bottom: 16px;
  background: #333;
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0.95;
}

.code-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  .code-modal-content {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    min-width: 400px;
    max-width: 90vw;
    max-height: 80vh;
    overflow: auto;
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
    position: relative;
    .close-btn {
      position: absolute;
      top: 12px;
      right: 18px;
      background: transparent;
      color: #909399;
      border: none;
      border-radius: 50%;
      font-size: 24px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      &:hover {
        background: #f2f6fc;
        color: #f56c6c;
      }
    }
    .copy-btn {
      position: absolute;
      top: 16px;
      right: 60px;
      background: #409eff;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 2px 8px;
      cursor: pointer;
      font-size: 11px;
      min-width: 36px;
      min-height: 22px;
      display: flex;
      align-items: center;
      gap: 2px;
      transition: background 0.2s;
      box-shadow: 0 1px 4px rgba(64,158,255,0.10);
      z-index: 2;
      &:hover {
        background: #66b1ff;
      }
    }
    .copy-icon {
      font-size: 13px;
      margin-right: 2px;
    }
    .copy-text {
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .copy-success-tip {
      position: absolute;
      top: 0;
      right: 110px;
      background: #67c23a;
      color: #fff;
      border-radius: 4px;
      padding: 2px 10px;
      font-size: 12px;
      z-index: 10001;
      box-shadow: 0 1px 4px rgba(103,194,58,0.10);
      pointer-events: none;
      opacity: 0.95;
    }
    pre {
      background: #272822;
      color: #f8f8f2;
      padding: 16px;
      border-radius: 8px;
      font-size: 13px;
      overflow-x: auto;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.count-display {
  display: inline-block;
  position: relative;
  height: 40px;
  overflow: hidden;
}

.count-number {
  display: block;
  font-size: 28px;
  text-align: center;
  min-width: 40px;
}

/* 增加时的动画（向上滚动） */
.count-roll-up-enter-active,
.count-roll-up-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.count-roll-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.count-roll-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.count-roll-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.count-roll-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* 减少时的动画（向下滚动） */
.count-roll-down-enter-active,
.count-roll-down-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.count-roll-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.count-roll-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.count-roll-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.count-roll-down-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
