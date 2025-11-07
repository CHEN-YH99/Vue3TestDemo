<template>
  <p>我是测试子组件：我向父组件传输：</p>
  <input type="text" v-model="inputvalue"/>
  <button @click="handleSend">向父组件发送数据</button>
</template>

<script setup>
  import { defineOptions,ref } from 'vue'
  defineOptions({
    name: 'TestChild'
  })

  // 向父组件发送数据
  const emit = defineEmits(['test'])
  const inputvalue = ref('')
  const handleSend = () => {
    emit('test', inputvalue.value)
  }
 
</script>

<style scoped>
  
</style>