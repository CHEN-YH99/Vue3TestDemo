<template>
    <div class="chart">
      <h2>活动图表</h2>
      <div class="bars">
        <div 
          v-for="(value, index) in data" 
          :key="index" 
          class="bar" 
          :style="{ height: `${value}px` }"
        ></div>
      </div>
      <button @click="triggerError">触发错误</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    data: {
      type: Array,
      required: true,
    },
  });
  
  const emit = defineEmits(['trigger-error']);
  
  // 模拟错误
  const triggerError = () => {
    try {
      throw new Error('来自 ActivityChart 的模拟错误！');
    } catch (err) {
      emit('trigger-error', err);
    }
  };
  </script>
  
  <style scoped>
  .chart {
    margin: 20px 0;
  }
  .bars {
    display: flex;
    gap: 10px;
    align-items: flex-end;
    height: 200px;
    margin-bottom: 20px;
  }
  .bar {
    width: 30px;
    background: #42b983;
    transition: height 0.3s ease;
  }
  button {
    padding: 8px 16px;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>