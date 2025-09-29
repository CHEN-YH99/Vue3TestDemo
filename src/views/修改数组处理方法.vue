<template>
  <div class="array-handler-container">
    <h2 class="title">数组处理演示</h2>
    
    <div class="fruit-list-container">
      <h3>当前数组元素：</h3>
      <transition-group name="list" tag="ul" class="fruit-list">
        <li 
          v-for="(item, index) in fruitlist" 
          :key="`${item}-${index}`"
          class="fruit-item"
          :class="{ 'entering': isAdding, 'leaving': isRemoving }"
        >
          {{ item }}
        </li>
      </transition-group>
    </div>
    
    <div class="controls">
      响应式更改数组处理方式：
      <el-dropdown 
        split-button 
        type="primary" 
        @click="handleClick" 
        @command="handleCommand"
        class="array-dropdown"
      >
        {{ handleButton }}
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="push">push往数组后面添加</el-dropdown-item>
            <el-dropdown-item command="pop">pop删除数组最后一个</el-dropdown-item>
            <el-dropdown-item command="shift">shift删除数组最前一个</el-dropdown-item>
            <el-dropdown-item command="unshift" divided>unshift往数组最前面添加</el-dropdown-item>
            <el-dropdown-item command="splice">splice替换数组第二个</el-dropdown-item>
            <el-dropdown-item command="sort">sort数组排序</el-dropdown-item>
            <el-dropdown-item command="reverse">reverse数组倒序</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="info-panel">
      <p>当前操作: <strong>{{ handleButton }}</strong></p>
      <p>数组长度: <strong>{{ fruitlist.length }}</strong></p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArrayHandle',
};
</script>
<script setup lang="ts">
import { ref } from 'vue'
const fruitlist = ref(["苹果","香蕉","雪梨"])
// 默认第一个处理按钮
const handleButton = ref("push")

// 动画状态控制
const isAdding = ref(false)
const isRemoving = ref(false)

// 切换处理按钮
const handleCommand = (command:string) => {
  handleButton.value = command
}

// 处理点击
const handleClick = () => {
  // 根据处理按钮执行对应的方法
  console.log(handleButton.value);
  
  // 设置动画状态
  if (['push', 'unshift'].includes(handleButton.value)) {
    isAdding.value = true
    setTimeout(() => { isAdding.value = false }, 300)
  } else if (['pop', 'shift'].includes(handleButton.value)) {
    isRemoving.value = true
    setTimeout(() => { isRemoving.value = false }, 300)
  }
  
  switch (handleButton.value) {
    case "push":
      fruitlist.value.push("葡萄")
      break;
    case "pop":
      fruitlist.value.pop()
      break;
    case "shift":
      fruitlist.value.shift()
      break;
    case "unshift":
      fruitlist.value.unshift("西瓜")
      break;
    case "splice":
      fruitlist.value.splice(1,1,"葡萄")
      break;
    case "sort":
      fruitlist.value.sort()
      break;
    case "reverse":
      fruitlist.value.reverse()
      break;
    default:
      break;
  }
}
</script>

<style scoped lang="scss">
.array-handler-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.title {
  text-align: center;
  color: #409eff;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
}

.fruit-list-container {
  background: #f5f7fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  
  h3 {
    color: #606266;
    margin-bottom: 15px;
    font-size: 18px;
  }
}

.fruit-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.fruit-item {
  background: linear-gradient(135deg, #409eff, #64b5f6);
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.3);
  transition: all 0.3s ease;
  
  &.entering {
    animation: pulse 0.3s ease;
  }
  
  &.leaving {
    animation: fadeOut 0.3s ease;
  }
}

.controls {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  
  .array-dropdown {
    width: 300px;
  }
}

.info-panel {
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  
  p {
    margin: 8px 0;
    color: #606266;
    
    strong {
      color: #409eff;
    }
  }
}

// 动画定义
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes fadeOut {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.8); }
}

// 响应式设计
@media (max-width: 768px) {
  .array-handler-container {
    padding: 15px;
  }
  
  .controls .array-dropdown {
    width: 100%;
  }
  
  .fruit-item {
    padding: 8px 16px;
  }
}
</style>