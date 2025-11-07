<template>
  <div class="nexttick-demo">
    <h2>Vue 3 nextTick 示例</h2>
    
    <div class="demo-section">
      <h3>示例 1：DOM 更新后的操作</h3>
      <p>计数器：{{ count }}</p>
      <button @click="incrementCount">增加计数</button>
      <p ref="domRef">DOM 更新前：这个文本不会立即改变</p>
      <button @click="updateDOM">更新 DOM 并获取内容</button>
    </div>
    
    <div class="demo-section">
      <h3>示例 2：多个 DOM 更新</h3>
      <button @click="batchUpdate">批量更新 DOM</button>
      <div ref="batchContainer" class="batch-container">
        <p v-for="(item, index) in listItems" :key="index" :class="{ updated: item.updated }">
          {{ item.text }}
        </p>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>示例 3：组件 ref 访问</h3>
      <button @click="toggleChildComponent">切换子组件</button>
      <div v-if="showChildComponent">
        <ChildComponent ref="childRef" />
        <button @click="accessChildMethod">调用子组件方法</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, defineComponent } from 'vue'

// 示例1相关变量
const count = ref(0)
const domRef = ref(null)

// 示例2相关变量
const batchContainer = ref(null)
const listItems = ref([])

// 示例3相关变量
const showChildComponent = ref(false)
const childRef = ref(null)

// 示例1：DOM 更新后的操作
const incrementCount = () => {
  count.value++
  console.log('count 更新后立即获取DOM内容:', domRef.value?.textContent)
  
  nextTick(() => {
    console.log('nextTick回调中获取DOM内容:', domRef.value?.textContent)
    domRef.value.textContent = `DOM 更新后：计数器现在是 ${count.value}`
  })
}

const updateDOM = () => {
  // 修改DOM引用的内容
  domRef.value.textContent = 'DOM 正在更新...'
  
  nextTick(() => {
    domRef.value.textContent = 'DOM 已更新完成！'
    domRef.value.style.color = 'green'
  })
}

// 示例2：批量DOM更新
const batchUpdate = () => {
  // 清空列表
  listItems.value = []
  
  // 批量添加多个项目
  for (let i = 1; i <= 5; i++) {
    listItems.value.push({
      text: `项目 ${i}`,
      updated: false
    })
  }
  
  // 直接访问DOM，此时可能还没有更新
  console.log('批量更新后立即访问DOM:', batchContainer.value?.children.length)
  
  nextTick(() => {
    console.log('nextTick中访问DOM:', batchContainer.value?.children.length)
    
    // 标记所有项目为已更新
    listItems.value.forEach(item => {
      item.updated = true
    })
  })
}

// 示例3：组件ref访问
const toggleChildComponent = () => {
  showChildComponent.value = !showChildComponent.value
  
  if (showChildComponent.value) {
    nextTick(() => {
      console.log('子组件已挂载:', childRef.value)
    })
  }
}

const accessChildMethod = () => {
  nextTick(() => {
    if (childRef.value) {
      childRef.value.showMessage()
    }
  })
}

// 子组件
const ChildComponent = defineComponent({
  setup() {
    const showMessage = () => {
      alert('这是来自子组件的消息！')
    }
    
    return {
      showMessage
    }
  },
  template: `
    <div class="child-component">
      <p>这是子组件</p>
    </div>
  `
})
</script>

<style scoped>
.nexttick-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: #f9f9f9;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

p {
  margin: 10px 0;
}

.batch-container p {
  padding: 8px;
  margin: 5px 0;
  background-color: #f1f1f1;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.batch-container p.updated {
  background-color: #e8f5e9;
  border-left: 4px solid #4CAF50;
  padding-left: 12px;
}

.child-component {
  padding: 15px;
  margin-top: 10px;
  background-color: #e3f2fd;
  border-radius: 4px;
  border: 1px dashed #2196F3;
}
</style>