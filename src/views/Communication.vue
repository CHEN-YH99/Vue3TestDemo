<template>
    <!-- Communication -->
    <ShopDetil/>
    <button class="show-code-fab" style="background-color:red ;" @click="showCode = true" title="查看代码"></button>
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
    import { ref, computed } from 'vue';
    import ShopDetil from '@/components/ShopDetil.vue';
    import "@/assets/style/showcode.css"
    const showCode = ref(false)
    const copySuccess = ref(false)
    const sourceCode = `//父组件CommentForm
    <template>
  <div class="comment-form">
    <h3>发表评论</h3>
    <el-form :model="form" @submit.prevent="submitComment">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="评论内容">
        <el-input v-model="form.content" type="textarea" placeholder="请输入评论内容" />
      </el-form-item>

      <el-form-item label="评分">
        <el-rate v-model="form.rating" :max="5" show-score />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">提交评论</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['submit-comment']);

const form = ref({
  username: '',
  content: '',
  rating: 0,
});

const submitComment = () => {
  if (!form.value.username || !form.value.content || form.value.rating === 0) {
    alert('请填写完整信息！');
    return;
  }

  emit('submit-comment', {
    ...form.value,
    productId: props.product.id, // 可选：关联商品ID
  });

  // 重置表单
  form.value = {
    username: '',
    content: '',
    rating: 0,
  };
};
<\/script>

<style scoped>
.comment-form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fafafa;
}
</style>

//子组件ShopDetil
<template>
  <div class="shop-detail">
    <!-- 商品信息部分 -->
    <el-card shadow="hover">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <div class="price">价格：¥{{ product.price }}</div>
    </el-card>

    <!-- 评论表单 -->
    <CommentForm 
      :product="product" 
      @submit-comment="handleCommentSubmit" 
    />

    <!-- 评论列表 -->
    <el-card shadow="hover" class="comments">
      <h3>用户评论</h3>
      <el-alert v-if="comments.length === 0" title="暂无评论" type="info" show-icon />
      <div v-for="(comment, index) in comments" :key="index" class="comment-card">
        <p>
          <strong>{{ comment.username }}</strong> 
          评分：<el-rate v-model="comment.rating" disabled :colors="rateColors" />
        </p>
        <p>{{ comment.content }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import CommentForm from '@/components/CommentForm.vue';

export default {
  components: { CommentForm },
  data() {
    return {
      product: {
        name: '示例商品',
        description: '这是一个示例商品的描述。',
        price: 99.99,
      },
      comments: [],
      rateColors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'], // 强制星星颜色为黄色
    };
  },
  methods: {
    handleCommentSubmit(comment) {
      this.comments.push(comment);
    },
  },
};
<\/script>

<style scoped>
.shop-detail {
  max-width: 800px;
  margin: 20px auto;
}

.price {
  font-size: 18px;
  color: #f56c6c;
  margin: 10px 0;
}

.comments {
  margin-top: 20px;
}

.comment-card {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fff; /* 白色背景避免冲突 */
}

/* 强制星星颜色 */
.el-rate__icon {
  color: #F7BA2A !important;
  font-size: 16px; /* 调整大小（可选） */
}
</style> `;
    const copyCode = () => {
        navigator.clipboard.writeText(sourceCode).then(() => {
        copySuccess.value = true
        setTimeout(() => {
            copySuccess.value = false
        }, 1200)
    })
}
</script>

<style scoped>
    
</style>