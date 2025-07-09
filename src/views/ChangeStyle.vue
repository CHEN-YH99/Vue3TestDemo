<template>
  <div :class="{ 'dark-mode': isDark }" class="light-switch-container">
    <!-- 胶粒状开关按钮 -->
    <div class="toggle-switch" @click="toggleDarkMode">
      <div class="slider" :class="{ 'slider-on': isDark }">
        <span class="slider-text">{{ isDark ? '关灯' : '开灯' }}</span>
      </div>
    </div>
    <p>当前模式：{{ isDark ? '暗黑模式' : '明亮模式' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDark = ref(false); // 默认是明亮模式

const toggleDarkMode = () => {
  isDark.value = !isDark.value; // 切换状态
};
</script>

<style scoped>
.light-switch-container {
  height: 100vh;
  padding: 20px;
  text-align: center;
  transition: background-color 0.5s, color 0.5s;
}

/* 明亮模式样式 */
.light-switch-container {
  background-color: #ffffff;
  color: #333;
}

/* 暗黑模式样式 */
.light-switch-container.dark-mode {
  background-color: #1a1a1a;
  color: #f0f0f0;
}

/* 胶粒状开关按钮样式 */
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
}

.toggle-switch:hover {
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
}

.slider-on {
  transform: translateX(46px); /* 滑动到右侧 */
  background-color: #000800; /* 开启状态颜色 */
}

.slider-text {
  font-size: 12px;
  font-weight: bold;
  color: #333;
}

.slider-on .slider-text {
  color: white; /* 开启状态文字颜色 */
}
</style>