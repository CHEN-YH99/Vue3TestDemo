<script setup>
import TestChild from './测试文件子组件.vue'
import { ref } from 'vue'

const tabs = [
  { id: 1, label: '首页', content: '这是首页内容。' },
  { id: 2, label: '关于', content: '这是关于页面。' },
  { id: 3, label: '联系', content: '这是联系页面。' }
]

// 初始化默认选项卡
const activeTab = ref(1)

// 切换选项卡
const changeTab = (tabId) => {
  activeTab.value = tabId
  console.log(tabId); 
}

// 接收子组件传递的数据
const receiveData = ref('')
const handlereceiveData = (data) => {
  receiveData.value = data
  console.log('接收子组件数据:', data);
}

</script>

<template>
  <div class="tabs-container">
    <div class="tabs-header">
      <button 
        v-for="tab in tabs" 
        :key="tab.id" 
        @click="changeTab(tab.id)" 
        :class="{ active: activeTab === tab.id }"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div class="tabs-body">
      <div v-for="tab in tabs" :key="tab.id" v-show="activeTab === tab.id" class="tab-content">
        {{ tab.content }}
      </div>
    </div>
  </div>
  
  <p v-if="receiveData">接收到的数据：{{ receiveData }}</p >
  <p v-else>目前没有接收到数据</p>
  <TestChild  @test="handlereceiveData"/>
</template>

<style scoped>
.tabs-container {
  max-width: 500px;
  margin: 0 auto;
  font-family: sans-serif;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.tabs-header button {
  padding: 10px 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.tabs-header button.active {
  border-bottom: 2px solid #42b983;
  color: #42b983;
}

.tab-content {
  padding: 20px;
  line-height: 1.6;
}
</style>

