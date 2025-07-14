<template>
  <div class="counter-app">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>Vuex 计数器演示</h2>
        </div>
      </template>

      <!-- 计数显示区 -->
      <div class="display-section">
        <el-statistic title="当前计数" :value="count" />
        <el-statistic title="双倍计数" :value="doubleCount" />
        <el-statistic title="奇偶性" :value="isEven" />
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <el-button type="primary" @click="increment" round>增加 (+1)</el-button>
        <el-button type="danger" @click="decrement" round>减少 (-1)</el-button>
        <el-button @click="reset" round>重置 (0)</el-button>
        <el-button type="warning" @click="asyncIncrement" :loading="asyncLoading" round>
          异步增加 (延迟+1)
        </el-button>
      </div>

      <!-- 历史记录 -->
      <el-divider />
      <h3>最近5条操作记录</h3>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in recentHistory"
          :key="index"
          :timestamp="formatTime(item.time)"
        >
          {{ getActionName(item.type) }}
        </el-timeline-item>
      </el-timeline>

      <!-- Vuex状态展示 -->
      <el-divider />
      <h3>Vuex状态树</h3>
      <el-descriptions border>
        <el-descriptions-item label="state.count">{{ count }}</el-descriptions-item>
        <el-descriptions-item label="getters.doubleCount">{{ doubleCount }}</el-descriptions-item>
        <el-descriptions-item label="getters.isEven">{{ isEven }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      asyncLoading: false
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'isEven', 'recentHistory'])
  },
  methods: {
    ...mapMutations(['INCREMENT', 'DECREMENT', 'RESET']),
    ...mapActions(['asyncIncrement']),
    
    increment() {
      this.INCREMENT()
    },
    decrement() {
      this.DECREMENT()
    },
    reset() {
      this.RESET()
    },
    async asyncIncrementWrapper() {
      this.asyncLoading = true
      await this.asyncIncrement()
      this.asyncLoading = false
    },
    formatTime(time) {
      return new Date(time).toLocaleTimeString()
    },
    getActionName(type) {
      const actions = {
        INCREMENT: '增加计数',
        DECREMENT: '减少计数',
        RESET: '重置计数'
      }
      return actions[type] || '未知操作'
    }
  }
}
</script>

<style scoped>
.counter-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.display-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}
</style>
