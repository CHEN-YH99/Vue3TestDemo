<template>
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Box /></el-icon>
              <span>基本案例</span>
            </template>
            <el-menu-item-group title="">
              <el-menu-item index="1-1" @click="$router.push('/countNum')">计数器</el-menu-item>
              <el-menu-item index="1-2" @click="$router.push('/TaskList')">任务清单</el-menu-item>
              <el-menu-item index="1-3">动态样式切换</el-menu-item>
              <el-menu-item index="1-4">条件渲染登录面板</el-menu-item>
              <el-menu-item index="1-5">表单双向绑定</el-menu-item>
              <el-menu-item index="1-6">自定义数据通信</el-menu-item>
              <el-menu-item index="1-8">插槽</el-menu-item>
              <el-menu-item index="1-9">生命周期钩子</el-menu-item>
              <el-menu-item index="1-10">侦听器状态跟踪</el-menu-item>
              <el-menu-item index="1-11">组合式函数复用</el-menu-item>
              <el-menu-item index="1-12">Teleport 传送门</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>路由案例</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><document /></el-icon>
            <span>VueX</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  
  <script lang="ts" setup>
  import {
    Document,
    Menu as IconMenu,
    Box,
    Setting,
  } from '@element-plus/icons-vue'
  
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>