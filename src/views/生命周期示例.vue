<template>
  <div class="lifecycle-demo">
    <h2>Vue生命周期示例</h2>
    <p>状态: {{ status }}</p>
    <p>计数器: {{ counter }}</p>
    <button @click="increment">增加计数</button>
    <div ref="chartContainer" class="chart-container"></div>
    
    <div class="logs">
      <h3>生命周期日志:</h3>
      <div v-for="(log, index) in logs" :key="index" class="log-entry">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

// 状态变量
const status = ref('初始化中...')
const counter = ref(0)
const chartContainer = ref(null)
const logs = ref([])
let timer = null
let resizeObserver = null

// 添加日志
const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  logs.value.push(`[${timestamp}] ${message}`)
  console.log(`[${timestamp}] ${message}`)
}

// 增加计数
const increment = () => {
  counter.value++
}

// onBeforeMount - 组件挂载前
onBeforeMount(() => {
  addLog('onBeforeMount: 组件即将挂载到DOM')
  // 在这里可以进行预加载数据的操作
  status.value = '准备挂载...'
})

// onMounted - 组件挂载后
onMounted(() => {
  addLog('onMounted: 组件已挂载到DOM')
  status.value = '已挂载'
  
  // 1. 访问DOM元素
  if (chartContainer.value) {
    // 模拟创建图表
    const chart = document.createElement('div')
    chart.style.width = '100px'
    chart.style.height = '100px'
    chart.style.backgroundColor = '#42b983'
    chart.style.borderRadius = '50%'
    chart.textContent = '图表'
    chart.style.color = 'white'
    chart.style.display = 'flex'
    chart.style.alignItems = 'center'
    chart.style.justifyContent = 'center'
    chartContainer.value.appendChild(chart)
    
    addLog('DOM操作: 创建了模拟图表')
  }
  
  // 2. 发送网络请求获取数据
  setTimeout(() => {
    addLog('网络请求: 模拟数据加载完成')
    status.value = '数据加载完成'
  }, 1000)
  
  // 3. 设置定时器
  timer = setInterval(() => {
    addLog('定时器: 每隔3秒触发一次')
  }, 3000)
  
  // 4. 添加事件监听器
  window.addEventListener('resize', handleResize)
  addLog('事件监听: 已添加窗口大小变化监听器')
  
  // 5. 使用ResizeObserver监听元素大小变化
  if (window.ResizeObserver && chartContainer.value) {
    resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        addLog(`ResizeObserver: 元素大小变化为 ${width}x${height}`)
      }
    })
    resizeObserver.observe(chartContainer.value)
    addLog('ResizeObserver: 已添加元素大小监听器')
  }
})

// onBeforeUpdate - 组件更新前
onBeforeUpdate(() => {
  addLog('onBeforeUpdate: 组件即将更新DOM')
})

// onUpdated - 组件更新后
onUpdated(() => {
  addLog('onUpdated: 组件DOM已更新')
  // 这里可以执行依赖于更新后DOM的操作
})

// onBeforeUnmount - 组件卸载前
onBeforeUnmount(() => {
  addLog('onBeforeUnmount: 组件即将卸载')
  
  // 1. 清除定时器
  if (timer) {
    clearInterval(timer)
    timer = null
    addLog('清理: 已清除定时器')
  }
  
  // 2. 移除事件监听器
  window.removeEventListener('resize', handleResize)
  addLog('清理: 已移除事件监听器')
  
  // 3. 取消未完成的网络请求（如果有）
  // 这里只是示例，实际中需要存储请求引用并取消
  addLog('清理: 已取消未完成的网络请求')
  
  // 4. 销毁第三方库实例
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
    addLog('清理: 已断开ResizeObserver连接')
  }
})

// onUnmounted - 组件卸载后
onUnmounted(() => {
  addLog('onUnmounted: 组件已卸载')
  status.value = '已卸载'
})

// 处理窗口大小变化
const handleResize = () => {
  addLog('事件: 窗口大小变化')
}
</script>

<style scoped>
.lifecycle-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.chart-container {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
}

.logs {
  margin-top: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  background-color: #f9f9f9;
  max-height: 300px;
  overflow-y: auto;
}

.log-entry {
  padding: 5px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.log-entry:last-child {
  border-bottom: none;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
}

button:hover {
  background-color: #369870;
}
</style>