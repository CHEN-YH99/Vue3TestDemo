<template>
  <div class="child-component">
    <h4>子组件</h4>
    <p>接收到的数据: {{ data }}</p>
    <p>内部状态: {{ internalState }}</p>
    <button @click="updateInternalState">更新内部状态</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  data: {
    type: String,
    default: ''
  }
})

const internalState = ref('初始内部状态')

// 监听props变化
watch(() => props.data, (newVal) => {
  console.log('子组件检测到数据变化:', newVal)
  internalState.value = `响应父组件更新: ${newVal}`
})

// 更新内部状态
const updateInternalState = () => {
  internalState.value = `手动更新: ${new Date().toLocaleTimeString()}`
}

// 暴露给父组件的方法
const getData = () => {
  return `数据: ${props.data}, 状态: ${internalState.value}`
}

const doSomething = () => {
  console.log('子组件执行某些操作')
  internalState.value = `执行操作后: ${new Date().toLocaleTimeString()}`
}

// 暴露方法给父组件
defineExpose({
  getData,
  doSomething
})
</script>

<style scoped>
.child-component {
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #e3f2fd;
}

button {
  margin-top: 10px;
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1565c0;
}
</style>