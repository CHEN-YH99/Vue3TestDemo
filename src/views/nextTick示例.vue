<template>
  <div class="nexttick-demo">
    <h2>Vue nextTick 示例</h2>
    
    <!-- 基础示例 -->
    <div class="demo-section">
      <h3>基础示例：DOM更新后获取元素</h3>
      <p>计数器: {{ counter }}</p>
      <button @click="increaseCounter">增加计数</button>
      <div ref="counterElement" class="counter-element">元素高度: {{ elementHeight }}px</div>
    </div>
    
    <!-- 表单示例 -->
    <div class="demo-section">
      <h3>表单示例：输入框自动聚焦</h3>
      <button @click="showInput = !showInput">{{ showInput ? '隐藏' : '显示' }}输入框</button>
      <div v-if="showInput">
        <input ref="inputElement" type="text" v-model="inputValue" placeholder="请输入内容" />
      </div>
    </div>
    
    <!-- 列表示例 -->
    <div class="demo-section">
      <h3>列表示例：动态添加项目后滚动到底部</h3>
      <button @click="addItem">添加项目</button>
      <ul ref="listElement" class="item-list">
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
    </div>
    
    <!-- 自定义组件示例 -->
    <div class="demo-section">
      <h3>自定义组件示例：与子组件通信</h3>
      <button @click="updateChildData">更新子组件数据</button>
      <ChildComponent ref="childComponent" :data="childData" />
    </div>
    
    <!-- 日志输出 -->
    <div class="demo-section">
      <h3>执行顺序日志</h3>
      <button @click="testExecutionOrder">测试执行顺序</button>
      <div class="logs">
        <div v-for="(log, index) in logs" :key="index" class="log-entry">{{ log }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import ChildComponent from './子组件示例.vue'

// 基础示例数据
const counter = ref(0)
const counterElement = ref(null)
const elementHeight = ref(0)

// 表单示例数据
const showInput = ref(false)
const inputValue = ref('')
const inputElement = ref(null)

// 列表示例数据
const items = ref(['项目 1', '项目 2'])
const listElement = ref(null)

// 自定义组件示例数据
const childData = ref('初始数据')
const childComponent = ref(null)

// 日志数据
const logs = ref([])

// 添加日志
const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  logs.value.push(`[${timestamp}] ${message}`)
}

// 基础示例：增加计数器并获取元素高度
const increaseCounter = () => {
  counter.value++
  addLog(`1. 计数器增加: ${counter.value}`)
  
  // 直接获取元素高度 - 此时DOM尚未更新
  if (counterElement.value) {
    const heightBefore = counterElement.value.offsetHeight
    addLog(`2. 直接获取高度: ${heightBefore}px`)
  }
  
  // 使用nextTick获取元素高度 - 此时DOM已更新
  nextTick(() => {
    if (counterElement.value) {
      const heightAfter = counterElement.value.offsetHeight
      elementHeight.value = heightAfter
      addLog(`3. nextTick后获取高度: ${heightAfter}px`)
    }
  })
  
  // 同步代码会在nextTick回调之前执行
  addLog(`4. 同步代码执行`)
}

// 表单示例：显示输入框并自动聚焦
const toggleShowInput = async () => {
  showInput.value = !showInput.value
  addLog(`1. 切换显示状态: ${showInput.value}`)
  
  if (showInput.value) {
    // 直接尝试聚焦 - 此时输入框可能还未渲染到DOM
    if (inputElement.value) {
      inputElement.value.focus()
      addLog(`2. 直接聚焦成功`)
    } else {
      addLog(`2. 直接聚焦失败，元素不存在`)
    }
    
    // 使用nextTick确保DOM更新后再聚焦
    await nextTick()
    if (inputElement.value) {
      inputElement.value.focus()
      addLog(`3. nextTick后聚焦成功`)
    }
  }
}

// 列表示例：添加项目并滚动到底部
const addItem = () => {
  const newItem = `项目 ${items.value.length + 1}`
  items.value.push(newItem)
  addLog(`1. 添加项目: ${newItem}`)
  
  // 直接尝试滚动 - 可能还未渲染
  if (listElement.value) {
    const isAtBottomBefore = listElement.value.scrollTop + listElement.value.clientHeight >= 
                            listElement.value.scrollHeight - 10
    addLog(`2. 直接检查是否在底部: ${isAtBottomBefore}`)
  }
  
  // 使用nextTick确保新项目渲染后再滚动
  nextTick(() => {
    if (listElement.value) {
      listElement.value.scrollTop = listElement.value.scrollHeight
      addLog(`3. nextTick后滚动到底部`)
    }
  })
}

// 自定义组件示例：更新子组件数据并调用子组件方法
const updateChildData = () => {
  const newData = `更新数据 ${Date.now()}`
  childData.value = newData
  addLog(`1. 更新子组件数据: ${newData}`)
  
  // 直接尝试调用子组件方法 - 子组件可能还未更新
  if (childComponent.value) {
    const result = childComponent.value.getData()
    addLog(`2. 直接获取子组件数据: ${result}`)
  }
  
  // 使用nextTick确保子组件更新后再调用其方法
  nextTick(() => {
    if (childComponent.value) {
      const result = childComponent.value.getData()
      addLog(`3. nextTick后获取子组件数据: ${result}`)
      childComponent.value.doSomething()
      addLog(`4. 调用子组件方法`)
    }
  })
}

// 测试执行顺序
const testExecutionOrder = () => {
  logs.value = [] // 清空日志
  
  addLog('开始测试执行顺序')
  
  // 1. 修改数据
  counter.value++
  addLog('1. 修改counter数据')
  
  // 2. 同步代码
  addLog('2. 执行同步代码')
  
  // 3. 使用nextTick
  nextTick(() => {
    addLog('4. 第一个nextTick回调')
  })
  
  // 4. 再次修改数据
  counter.value++
  addLog('5. 再次修改counter数据')
  
  // 5. 使用nextTick
  nextTick(() => {
    addLog('6. 第二个nextTick回调')
  })
  
  // 6. 同步代码
  addLog('7. 执行同步代码')
  
  // 7. 使用Promise微任务
  Promise.resolve().then(() => {
    addLog('8. Promise微任务')
  })
  
  // 8. 使用setTimeout宏任务
  setTimeout(() => {
    addLog('9. setTimeout宏任务')
  }, 0)
}
</script>

<style scoped>
.nexttick-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h3 {
  color: #42b983;
  margin-top: 0;
}

.counter-element {
  margin-top: 10px;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
}

input[type="text"] {
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

.item-list {
  max-height: 150px;
  overflow-y: auto;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.item-list li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.item-list li:last-child {
  border-bottom: none;
}

.logs {
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.log-entry {
  font-size: 12px;
  padding: 2px 0;
  border-bottom: 1px solid #eee;
  color: #555;
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
  margin-right: 10px;
  margin-bottom: 10px;
}

button:hover {
  background-color: #369870;
}
</style>