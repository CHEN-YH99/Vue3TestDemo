<template>
    <div>
      <el-card class="tracker-card">
        <div>鼠标坐标：X = {{ x }}, Y = {{ y }}</div>
        <el-button @click="resetPosition" type="primary">重置坐标</el-button>
      </el-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useMouseTracker } from '@/assets/js/useMouseTracker';
  
  const { x, y, resetPosition } = useMouseTracker();
  </script>
  
  <style scoped lang="scss">
  .tracker-card {
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
  }
  </style>