<template>
  <div :class="{ 'dark-mode': isDark }" class="light-switch-container">
    <!-- 胶粒状开关按钮 -->
    <div class="toggle-switch" @click="toggleDarkMode">
      <div class="slider" :class="{ 'slider-on': isDark }">
        <el-icon v-if="isDark" class="slider-icon"><Moon /></el-icon>
        <el-icon v-else class="slider-icon"><Sunny /></el-icon>
      </div>
    </div>
    <p>当前模式：{{ isDark ? '暗黑模式' : '明亮模式' }}</p>
  </div>
  <button class="show-code-fab" style="background-color: red;" @click="showCode = true" title="查看代码"></button>
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

<script setup>
import { ref } from 'vue';
import { Moon, Sunny } from '@element-plus/icons-vue';
import '@/assets/style/showcode.css'
const isDark = ref(false);
const showCode = ref(false)
const copySuccess = ref(false)

// 模板代码,查看代码
const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}
const sourceCode = `<template>
  <div :class="{ 'dark-mode': isDark }" class="light-switch-container">
    <!-- 胶粒状开关按钮 -->
    <div class="toggle-switch" @click="toggleDarkMode">
      <div class="slider" :class="{ 'slider-on': isDark }">
        <el-icon v-if="isDark" class="slider-icon"><Moon /></el-icon>
        <el-icon v-else class="slider-icon"><Sunny /></el-icon>
      </div>
    </div>
    <p>当前模式：{{ isDark ? '暗黑模式' : '明亮模式' }}</p>
  </div>
  <button class="show-code-fab" style="background-color: red;" @click="showCode = true" title="查看代码"></button>
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
<script setup>
import { ref } from 'vue';
import { Moon, Sunny } from '@element-plus/icons-vue';
import '@/assets/style/showcode.css'
const isDark = ref(false);
const showCode = ref(false)
const copySuccess = ref(false)

// 模板代码,查看代码
const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}//样式切换
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
};
<\/script>

<style scoped lang="scss">
.light-switch-container {
  height: 100vh;
  padding: 20px;
  text-align: center;
  transition: background-color 0.5s, color 0.5s;
  background-color: #ffffff;
  color: #333;

  &.dark-mode {
    background-color: #1a1a1a;
    color: #f0f0f0;
  }
}

.toggle-switch {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d0d0d0;
  }

  .slider {
    position: absolute;
    width: 50px;
    height: 36px;
    background-color: white;
    border-radius: 18px;
    top: 2px;
    left: 2px;
    transition: transform 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    &.slider-on {
      transform: translateX(46px);
      background-color: #000800;

      .slider-icon {
        color: white;
      }
    }

    .slider-icon {
      font-size: 16px;
      color: #333;
    }
  }
}
</style>`;
//样式切换
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
};
</script>

<style scoped lang="scss">
.light-switch-container {
  height: 100vh;
  padding: 20px;
  text-align: center;
  transition: background-color 0.5s, color 0.5s;
  background-color: #ffffff;
  color: #333;

  &.dark-mode {
    background-color: #1a1a1a;
    color: #f0f0f0;
  }
}

.toggle-switch {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d0d0d0;
  }

  .slider {
    position: absolute;
    width: 50px;
    height: 36px;
    background-color: white;
    border-radius: 18px;
    top: 2px;
    left: 2px;
    transition: transform 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    &.slider-on {
      transform: translateX(46px);
      background-color: #000800;

      .slider-icon {
        color: white;
      }
    }

    .slider-icon {
      font-size: 16px;
      color: #333;
    }
  }
}
</style>