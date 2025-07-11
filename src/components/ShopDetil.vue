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
</script>

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
</style>