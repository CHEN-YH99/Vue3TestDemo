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
</script>

<style scoped>
.comment-form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fafafa;
}
</style>