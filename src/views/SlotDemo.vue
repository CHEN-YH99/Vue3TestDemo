<template>
    <div class="demo">
      <h1>卡片组件插槽演示</h1>
      <Card variant="primary" width="300px">
        <template #header>
          <span>标题插槽</span>
        </template>
        <p>这是卡片的主要内容，通过默认插槽插入。</p>
        <template #actions>
          <button>确定</button>
          <button>取消</button>
        </template>
      </Card>
  
      <Card variant="success" width="400px" height="200px">
        <template #header>
          <span>另一个标题</span>
        </template>
        <p>这是另一个卡片的内容。</p>
        <template #actions>
          <button>保存</button>
        </template>
      </Card>
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
  import Card from '../components/Card.vue';
  import { ref } from 'vue';
  import '@/assets/style/showcode.css';
  // 查看代码
  const showCode = ref(false)
  const copySuccess = ref(false)

const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}
const sourceCode = `//父组件SlotDemo
<template>
    <div class="demo">
      <h1>卡片组件插槽演示</h1>
      <Card variant="primary" width="300px">
        <template #header>
          <span>标题插槽</span>
        </template>
        <p>这是卡片的主要内容，通过默认插槽插入。</p>
        <template #actions>
          <button>确定</button>
          <button>取消</button>
        </template>
      </Card>
  
      <Card variant="success" width="400px" height="200px">
        <template #header>
          <span>另一个标题</span>
        </template>
        <p>这是另一个卡片的内容。</p>
        <template #actions>
          <button>保存</button>
        </template>
      </Card>
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
  import Card from '../components/Card.vue';
  import { ref } from 'vue';
  import '@/assets/style/showcode.css';
  // 查看代码
  const showCode = ref(false)
  const copySuccess = ref(false)

const copyCode = () => {
  navigator.clipboard.writeText(sourceCode).then(() => {
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1200)
  })
}
  <\/script>
  
  <style scoped lang="scss">
  .demo {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>
  
  //子组件Card
  <template>
     <div 
    class="card" 
    :class="variant ? \`card--\${variant}\` : ''" 
    :style="{ width, height }"
  >
      <div v-if="$slots.header" class="card__header">
        <slot name="header"></slot>
      </div>
      <div class="card__content">
        <slot></slot>
      </div>
      <div v-if="$slots.actions" class="card__actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'auto',
    },
    variant: {
      type: String,
      default: '',
      validator: (value) => ['primary', 'success', 'warning', 'danger'].includes(value),
    },
  });
  <\/script>
  
  <style scoped lang="scss">
  .card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    background: #fff;
  
    &__header {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 12px;
    }
  
    &__content {
      margin-bottom: 12px;
    }
  
    &__actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
  
    &--primary {
      border-left: 4px solid #3490dc;
    }
  
    &--success {
      border-left: 4px solid #38c172;
    }
  
    &--warning {
      border-left: 4px solid #ffed4a;
    }
  
    &--danger {
      border-left: 4px solid #e3342f;
    }
  }
  </style>`;
  </script>
  
  <style scoped lang="scss">
  .demo {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>