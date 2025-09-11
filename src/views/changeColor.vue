<script setup>
import { ref, computed } from 'vue'

// 响应式状态
const red = ref(128)
const green = ref(128)
const blue = ref(128)

// 计算属性
const hexColor = computed(() => {
  const r = red.value.toString(16).padStart(2, '0')
  const g = green.value.toString(16).padStart(2, '0')
  const b = blue.value.toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
})

const rgbColor = computed(() => {
  return `rgb(${red.value}, ${green.value}, ${blue.value})`
})

// 方法
function randomColor() {
  red.value = Math.floor(Math.random() * 256)
  green.value = Math.floor(Math.random() * 256)
  blue.value = Math.floor(Math.random() * 256)
}
</script>
<template>
  <div class="color-picker">
    <h2>颜色选择器</h2>
    
    <div class="color-preview" :style="{ backgroundColor: rgbColor }"></div>
    
    <div class="color-values">
      <p>HEX: {{ hexColor }}</p>
      <p>RGB: {{ rgbColor }}</p>
    </div>
    
    <div class="color-sliders">
      <div class="slider-group">
        <label>红 (R):</label>
        <input 
          type="range" 
          v-model.number="red" 
          min="0" 
          max="255"
        >
        <span>{{ red }}</span>
      </div>
      
      <div class="slider-group">
        <label>绿 (G):</label>
        <input 
          type="range" 
          v-model.number="green" 
          min="0" 
          max="255"
        >
        <span>{{ green }}</span>
      </div>
      
      <div class="slider-group">
        <label>蓝 (B):</label>
        <input 
          type="range" 
          v-model.number="blue" 
          min="0" 
          max="255"
        >
        <span>{{ blue }}</span>
      </div>
    </div>
    
    <button @click="randomColor" class="random-btn">随机颜色</button>
  </div>
</template>
<style scoped>
.color-picker {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

.color-preview {
  height: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
}

.color-values {
  margin-bottom: 20px;
  font-family: monospace;
}

.slider-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

label {
  width: 60px;
}

input[type="range"] {
  flex: 1;
  margin: 0 10px;
}

.random-btn {
  background-color: #673ab7;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
}
</style>

