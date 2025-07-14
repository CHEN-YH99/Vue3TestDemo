<template>
  <div class="login-container">
    <el-card class="login-card">
      <h3>系统登录</h3>
      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading">登录</el-button>
      </el-form>
      <div class="footer">
        <el-button type="link" @click="$router.push('/register')">前往注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);
const form = ref({
  username: '',
  password: ''
});
const errorMessage = ref('');

// 页面加载时自动填充最后一次注册的用户名
onMounted(() => {
  const lastUsername = localStorage.getItem('lastRegisteredUsername');
  if (lastUsername) {
    form.value.username = lastUsername;
  }
});

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    ElMessage.error('请输入用户名和密码');
    return;
  }

  loading.value = true;
  try {
    const result = await authStore.login(form.value.username, form.value.password);
    if (result.success) {
      ElMessage.success('登录成功');
      router.push('/');
    } else {
      errorMessage.value = result.message;
    }
  } catch (error) {
    ElMessage.error('登录失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}
.login-card {
  width: 400px;
  text-align: center;
}
.footer {
  margin-top: 20px;
  text-align: center;
}
</style>