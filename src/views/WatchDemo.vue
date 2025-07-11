<template>
  <div class="watch-demo-container">
    <h1>用户活动监控面板</h1>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <el-button type="primary" @click="logAction('点击')">模拟点击</el-button>
      <el-button type="success" @click="logAction('输入')">模拟输入</el-button>
      <el-button type="warning" @click="logAction('提交')">模拟提交</el-button>
    </div>

    <!-- 警报系统 -->
    <div v-if="alert.active" class="alert-message">
      <el-alert title="警告" type="error" :closable="false">
        操作频率过高：{{ activityFrequency.toFixed(2) }} 次/分钟（阈值：{{ threshold }}）
      </el-alert>
    </div>

    <!-- 统计信息 -->
    <div class="stats">
      <el-card shadow="hover">
        <template #header>
          <span>操作统计</span>
        </template>
        <div v-for="(count, action) in actionCounts" :key="action" class="stat-item">
          {{ action }}: {{ count }} 次
        </div>
        <div class="stat-item">总操作次数: {{ totalActions }} 次</div>
        <div class="stat-item">当前频率: {{ activityFrequency.toFixed(2) }} 次/分钟</div>
      </el-card>
    </div>

    <!-- 操作日志 -->
    <div class="logs">
      <el-card shadow="hover">
        <template #header>
          <span>操作日志</span>
        </template>
        <div v-for="(log, index) in actionLogs" :key="index" class="log-item">
          [{{ log.timestamp }}] {{ log.action }}
        </div>
      </el-card>
    </div>

    <!-- 柱状图（CSS模拟） -->
    <div class="chart">
      <el-card shadow="hover">
        <template #header>
          <span>操作类型分布</span>
        </template>
        <div class="bars">
          <div
            v-for="(count, action) in actionCounts"
            :key="action"
            class="bar"
            :style="{ height: `${(count / totalActions) * 200}px` }"
            :title="`${action}: ${count}次`"
          >
            {{ action }}
          </div>
        </div>
      </el-card>
    </div>
  </div>

  <!-- 查看代码 -->
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
import { ref, watch, watchEffect, computed } from 'vue';
import { ElButton, ElAlert, ElCard } from 'element-plus';
import '@/assets/style/showcode.css';

// 查看代码功能
const showCode = ref(false);
const copySuccess = ref(false);

// 响应式状态（用户活动监控）
const actionLogs = ref([]);
const actionCounts = ref({ 点击: 0, 输入: 0, 提交: 0 });
const activityFrequency = ref(0);
const alert = ref({ active: false, message: '' });
const threshold = 5;

// 计算属性
const totalActions = computed(() => 
  Object.values(actionCounts.value).reduce((sum, count) => sum + count, 0)
);

// 方法
const logAction = (action) => {
  const timestamp = new Date().toLocaleTimeString();
  actionLogs.value.push({ action, timestamp });
  actionCounts.value[action] += 1;
};

// 侦听器
watchEffect(() => {
  if (actionLogs.value.length > 0) {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    const recentActions = actionLogs.value.filter(
      log => new Date(`1970/01/01 ${log.timestamp}`) >= oneMinuteAgo
    );
    activityFrequency.value = recentActions.length;
  }
});

watch(activityFrequency, (newFrequency) => {
  if (newFrequency > threshold) {
    alert.value = {
      active: true,
      message: `操作频率过高：${newFrequency.toFixed(2)} 次/分钟`,
    };
  } else {
    alert.value.active = false;
  }
});

// 代码展示功能（转义后的完整代码）
const sourceCode = `<template>
  <!-- 模板内容与当前组件一致，已省略以节省空间 -->
</template>

<script setup>
import { ref, watch, watchEffect, computed } from 'vue';
import { ElButton, ElAlert, ElCard } from 'element-plus';

// 响应式状态
const actionLogs = ref([]);
const actionCounts = ref({ 点击: 0, 输入: 0, 提交: 0 });
const activityFrequency = ref(0);
const alert = ref({ active: false, message: '' });
const threshold = 5;

// 计算属性
const totalActions = computed(() => 
  Object.values(actionCounts.value).reduce((sum, count) => sum + count, 0)
);

// 方法
const logAction = (action) => {
  const timestamp = new Date().toLocaleTimeString();
  actionLogs.value.push({ action, timestamp });
  actionCounts.value[action] += 1;
};

// 侦听器
watchEffect(() => {
  if (actionLogs.value.length > 0) {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    const recentActions = actionLogs.value.filter(
      log => new Date(\`1970/01/01 \${log.timestamp}\`) >= oneMinuteAgo
    );
    activityFrequency.value = recentActions.length;
  }
});

watch(activityFrequency, (newFrequency) => {
  if (newFrequency > threshold) {
    alert.value = {
      active: true,
      message: \`操作频率过高：\${newFrequency.toFixed(2)} 次/分钟\`,
    };
  } else {
    alert.value.active = false;
  }
});
<\\/script>

<style scoped lang="scss">
/* 样式内容与当前组件一致，已省略 */
</style>`;

// 复制代码
const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true;
    setTimeout(() => copySuccess.value = false, 1200);
  });
};
</script>

<style scoped lang="scss">
.watch-demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;

  .action-buttons {
    margin: 20px 0;
    display: flex;
    gap: 10px;
  }

  .alert-message {
    margin: 20px 0;
  }

  .stats, .logs, .chart {
    margin: 20px 0;
  }

  .stat-item, .log-item {
    margin: 8px 0;
    padding: 4px;
    border-bottom: 1px solid #eee;
  }

  .bars {
    display: flex;
    height: 200px;
    align-items: flex-end;
    gap: 20px;
    padding: 10px;
  }

  .bar {
    flex: 1;
    background: #42b983;
    color: white;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 5px;
    border-radius: 4px 4px 0 0;
    transition: height 0.3s ease;
  }
}
</style>