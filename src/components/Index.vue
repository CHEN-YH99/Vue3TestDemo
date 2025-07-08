<template>
  
    <div class="common-layout">
      <el-container>
        <el-header class="e-header">
          <Header/>
        </el-header>
        <el-container>
          <el-aside >
            <el-scrollbar height="100vh">
              <navigator/>
            </el-scrollbar>   
          </el-aside>
          <el-main>
            <div class="lottie-fixed">
              <DotLottieVue style="height: 200px; width: 200px" autoplay loop src="https://lottie.host/b84dcd50-1368-472f-87c8-0ce28b3f82c9/GwN3SfULhd.lottie" />
            </div>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<script setup lang="ts">
import Header from './Header.vue';
import navigator from './navigator.vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
</script>

<style scoped lang="scss">
  .e-header{
    background-color: #545c64;
    color: #fff;
    text-align: center;
  }
  .lottie-fixed {
    position: absolute;
    right: 20px;
    bottom: 0;
    z-index: 10;
    padding: 16px;
    pointer-events: none;
  }
</style>
