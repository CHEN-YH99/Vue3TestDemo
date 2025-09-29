<template>
  <div class="array-operations-container">
    <h2 class="title">数组操作演示 (Filter, Concat, Slice)</h2>
    
    <div class="fruit-list-container">
      <h3>原始数组：</h3>
      <transition-group name="list" tag="ul" class="fruit-list">
        <li 
          v-for="(item, index) in originalList" 
          :key="`${item}-${index}`"
          class="fruit-item original-item"
        >
          {{ item }}
        </li>
      </transition-group>
    </div>
    
    <div class="result-container" v-if="resultList.length > 0">
      <h3>操作结果：</h3>
      <transition-group name="list" tag="ul" class="fruit-list result-list">
        <li 
          v-for="(item, index) in resultList" 
          :key="`${item}-${index}`"
          class="fruit-item result-item"
        >
          {{ item }}
        </li>
      </transition-group>
    </div>
    
    <div class="controls">
      <el-dropdown 
        split-button 
        type="success" 
        @click="handleClick" 
        @command="handleCommand"
        class="array-dropdown"
      >
        {{ currentMethod }}
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="filter">filter - 筛选包含"苹"的元素</el-dropdown-item>
            <el-dropdown-item command="concat">concat - 连接新数组["橙子", "柚子"]</el-dropdown-item>
            <el-dropdown-item command="slice">slice - 提取索引1到2的元素</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    
    <div class="method-explanation" v-if="methodExplanation[currentMethod]">
      <h3>方法说明：</h3>
      <p>{{ methodExplanation[currentMethod].description }}</p>
      <pre><code>{{ methodExplanation[currentMethod].example }}</code></pre>
    </div>
    
    <div class="info-panel">
      <p>当前方法: <strong>{{ currentMethod }}</strong></p>
      <p>原始数组长度: <strong>{{ originalList.length }}</strong></p>
      <p v-if="resultList.length > 0">结果数组长度: <strong>{{ resultList.length }}</strong></p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ArrayOperations',
};
</script>
<script setup lang="ts">
import { ref, reactive } from 'vue'

const originalList = ref(["苹果","香蕉","雪梨"])
const resultList = ref<string[]>([])
const currentMethod = ref("filter")

// 方法说明
const methodExplanation = reactive({
  filter: {
    description: "filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。",
    example: 'const result = ["苹果","香蕉","雪梨"].filter(item => item.includes("苹"));\n// 结果: ["苹果"]'
  },
  concat: {
    description: "concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。",
    example: 'const result = ["苹果","香蕉","雪梨"].concat(["橙子", "柚子"]);\n// 结果: ["苹果", "香蕉", "雪梨", "橙子", "柚子"]'
  },
  slice: {
    description: "slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。",
    example: 'const result = ["苹果","香蕉","雪梨"].slice(1, 2);\n// 结果: ["香蕉"]'
  }
})

// 切换处理方法
const handleCommand = (command: string) => {
  currentMethod.value = command
  resultList.value = [] // 清空之前的结果
}

// 处理点击
const handleClick = () => {
  console.log(currentMethod.value);
  
  // 添加动画效果
  const resultContainer = document.querySelector('.result-container');
  if (resultContainer instanceof HTMLElement) {
    resultContainer.classList.remove('animate');
    void resultContainer.offsetWidth; // 触发重排
    resultContainer.classList.add('animate');
  }
  
  switch (currentMethod.value) {
    case "filter":
      // 筛选出包含"苹"的元素
      resultList.value = originalList.value.filter(item => item.includes("苹"))
      break;
    case "concat":
      // 连接新数组
      resultList.value = originalList.value.concat(["橙子", "柚子"])
      break;
    case "slice":
      // 提取索引1到2的元素（不包括2）
      resultList.value = originalList.value.slice(1, 2)
      break;
    default:
      break;
  }
}
</script>

<style scoped lang="scss">
.array-operations-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.title {
  text-align: center;
  color: #67c23a;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
}

.fruit-list-container, .result-container {
  background: #f5f7fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &.animate {
    animation: highlight 0.5s ease;
  }
  
  h3 {
    color: #606266;
    margin-bottom: 15px;
    font-size: 18px;
  }
}

.result-container {
  background: #f0f9ff;
  border: 1px solid #b3e1ff;
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
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
    transition: all 0.3s ease;
  }
  
  &:hover::before {
    background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
  }
}

.original-item {
  background: linear-gradient(135deg, #67c23a, #95d475);
  box-shadow: 0 2px 6px rgba(103, 194, 58, 0.3);
}

.result-item {
  background: linear-gradient(135deg, #409eff, #79bbff);
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.3);
}

.controls {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  
  .array-dropdown {
    width: 400px;
  }
}

.method-explanation {
  background: #fdf6ec;
  border: 1px solid #fde2e2;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  
  h3 {
    color: #e6a23c;
    margin-bottom: 10px;
  }
  
  p {
    color: #606266;
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  pre {
    background: #303133;
    color: #e8eaed;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 14px;
    line-height: 1.5;
  }
}

.info-panel {
  background: #f0f9ff;
  border: 1px solid #b3e1ff;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  
  p {
    margin: 8px 0;
    color: #606266;
    
    strong {
      color: #67c23a;
    }
  }
}

// 动画定义
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

@keyframes highlight {
  0% { transform: scale(1); box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); }
  50% { transform: scale(1.02); box-shadow: 0 4px 20px 0 rgba(64, 158, 255, 0.4); }
  100% { transform: scale(1); box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); }
}

// 响应式设计
@media (max-width: 768px) {
  .array-operations-container {
    padding: 15px;
  }
  
  .controls .array-dropdown {
    width: 100%;
  }
  
  .fruit-item {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  .method-explanation pre {
    font-size: 12px;
  }
}
</style>