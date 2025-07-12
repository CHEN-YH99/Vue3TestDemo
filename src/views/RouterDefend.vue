<template>
  <div class="auth-container">
    <!-- 未登录状态 -->
    <el-card v-if="!authStore.isLoggedIn" class="login-card">
      <template #header>
        <h3>用户登录</h3>
      </template>
      <el-form :model="loginForm" @submit.prevent="handleLogin">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form>
    </el-card>

    <!-- 已登录状态 -->
    <el-card v-else class="user-card">
      <div class="user-info">
        <el-avatar :size="60" :src="`https://robohash.org/${authStore.user?.username}`" />
        <h3>欢迎，{{ authStore.user?.username }}！</h3>
        <p>角色：{{ authStore.user?.role === 'admin' ? '管理员' : '普通用户' }}</p>
        <el-button type="danger" @click="authStore.logout()">退出登录</el-button>
      </div>

      <!-- 权限控制内容 -->
      <div v-if="authStore.hasRole('admin')" class="admin-content">
        <el-alert type="success" title="管理员专属区域" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { ElMessage } from 'element-plus';

const authStore = useAuthStore();

const loginForm = ref({
  username: '',
  password: '',
});

const handleLogin = async () => {
  try {
    await authStore.login(loginForm.value.username, loginForm.value.password);
  } catch (error) {
    ElMessage.error('登录失败');
  }
};
</script>

<style scoped lang="scss">
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;

  .login-card,
  .user-card {
    width: 400px;
    text-align: center;

    .user-info {
      padding: 20px;

      h3 {
        margin: 15px 0;
      }
    }

    .admin-content {
      margin-top: 20px;
    }
  }
}
</style>