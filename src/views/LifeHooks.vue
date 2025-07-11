<template>
    <div class="life-hooks-container">
      <div class="dashboard">
        <h1>活动面板</h1>
        <div v-if="error" class="error-message">
          Error: {{ error.message }}
        </div>
        <ActivityChart 
          :data="chartData" 
          @trigger-error="handleError" 
        />
        <button @click="toggleData">更新数据</button>
      </div>
    </div>
    <button class="show-code-fab" style="background-color: red;" @click="showCode = true" title="查看代码"></button>
    <div v-if="showCode" class="code-modal">
        <div class="code-modal-content">
            <button class="close-btn" @click="showCode = false">×</button>
            <button class="copy-btn" @click="copyCode" title="复制代码">复制</button>
            <transition name="fade">
                <div v-if="copySuccess" class="copy-success-tip">复制成功</div>
            </transition>
            <pre><code>{{ sourceCode }}</code></pre>
        </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted, onUnmounted, onUpdated, onErrorCaptured } from 'vue';
  import ActivityChart from '@/components/ActivityChart.vue';
  import '@/assets/style/showcode.css'
  //查看代码
  const showCode = ref(false)
  const copySuccess = ref(false)

// 模板代码,查看代码
const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}
const sourceCode = `//父组件LifeHooks
<template>
    <div class="life-hooks-container">
      <div class="dashboard">
        <h1>活动面板</h1>
        <div v-if="error" class="error-message">
          Error: {{ error.message }}
        </div>
        <ActivityChart 
          :data="chartData" 
          @trigger-error="handleError" 
        />
        <button @click="toggleData">更新数据</button>
      </div>
    </div>
    <button class="show-code-fab" style="background-color: red;" @click="showCode = true" title="查看代码"></button>
    <div v-if="showCode" class="code-modal">
        <div class="code-modal-content">
            <button class="close-btn" @click="showCode = false">×</button>
            <button class="copy-btn" @click="copyCode" title="复制代码">复制</button>
            <transition name="fade">
                <div v-if="copySuccess" class="copy-success-tip">复制成功</div>
            </transition>
            <pre><code>{{ sourceCode }}</code></pre>
        </div>
    </div>
</template>
<script setup>
  import { ref, onMounted, onUnmounted, onUpdated, onErrorCaptured } from 'vue';
  import ActivityChart from '@/components/ActivityChart.vue';
  //查看代码
  const showCode = ref(false)
  const copySuccess = ref(false)

// 模板代码,查看代码
const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}
  //其他
  const chartData = ref([10, 20, 30, 40, 50]);
  const error = ref(null);
  let timer = null;
  
  // 模拟数据更新
  const updateData = () => {
    chartData.value = chartData.value.map(() => Math.floor(Math.random() * 50) + 10);
  };
  
  // 切换数据
  const toggleData = () => {
    updateData();
  };
  
  // 捕获子组件错误
  const handleError = (err) => {
    error.value = err;
  };
  
  // 生命周期钩子
  onMounted(() => {
    console.log('组件挂载');
    timer = setInterval(updateData, 3000); // 每3秒更新数据
  });
  
  onUnmounted(() => {
    console.log('组件已卸载');
    clearInterval(timer);
  });
  
  onUpdated(() => {
    console.log('组件实时更新数据:', chartData.value);
  });
  
  onErrorCaptured((err) => {
    console.error('捕获错误:', err);
    error.value = err;
    return false; // 阻止错误继续向上传播
  });
  <\/script> 
  <style scoped>
  .life-hooks-container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
    height: 100vh;           /* 占满整个视口高度 */
    margin: 0 auto;          /* 水平居中备用（如果父容器有宽度限制） */
    text-align: center;      /* 文本居中 */
  }
  .dashboard {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .error-message {
    color: red;
    margin: 10px 0;
  }
  button {
    margin-top: 20px;
    padding: 8px 16px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  
  //子组件ActivityChart
  <template>
    <div class="chart">
      <h2>活动图表</h2>
      <div class="bars">
        <div 
        v-for="(value, index) in data" 
        :key="index" 
        class="bar" 
        :style="{ height: \`\${value}px\` }"  <!-- 转义模板字符串 -->
      ></div>
      </div>
      <button @click="triggerError">触发错误</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    data: {
      type: Array,
      required: true,
    },
  });
  
  const emit = defineEmits(['trigger-error']);
  
  // 模拟错误
  const triggerError = () => {
    try {
      throw new Error('来自 ActivityChart 的模拟错误！');
    } catch (err) {
      emit('trigger-error', err);
    }
  };
<\/script>
  
<style scoped>
  .chart {
    margin: 20px 0;
  }
  .bars {
    display: flex;
    gap: 10px;
    align-items: flex-end;
    height: 200px;
    margin-bottom: 20px;
  }
  .bar {
    width: 30px;
    background: #42b983;
    transition: height 0.3s ease;
  }
  button {
    padding: 8px 16px;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>`
  //其他
  const chartData = ref([10, 20, 30, 40, 50]);
  const error = ref(null);
  let timer = null;
  
  // 模拟数据更新
  const updateData = () => {
    chartData.value = chartData.value.map(() => Math.floor(Math.random() * 50) + 10);
  };
  
  // 切换数据
  const toggleData = () => {
    updateData();
  };
  
  // 捕获子组件错误
  const handleError = (err) => {
    error.value = err;
  };
  
  // 生命周期钩子
  onMounted(() => {
    console.log('组件挂载');
    timer = setInterval(updateData, 3000); // 每3秒更新数据
  });
  
  onUnmounted(() => {
    console.log('组件已卸载');
    clearInterval(timer);
  });
  
  onUpdated(() => {
    console.log('组件实时更新数据:', chartData.value);
  });
  
  onErrorCaptured((err) => {
    console.error('捕获错误:', err);
    error.value = err;
    return false; // 阻止错误继续向上传播
  });
</script>
  
<style scoped>
  .life-hooks-container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;     /* 垂直居中 */
    height: 100vh;           /* 占满整个视口高度 */
    margin: 0 auto;          /* 水平居中备用（如果父容器有宽度限制） */
    text-align: center;      /* 文本居中 */
  }
  .dashboard {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .error-message {
    color: red;
    margin: 10px 0;
  }
  button {
    margin-top: 20px;
    padding: 8px 16px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>