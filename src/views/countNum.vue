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
    </div>
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
import { ref } from 'vue'
import "@/assets/style/showcode.css"
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
