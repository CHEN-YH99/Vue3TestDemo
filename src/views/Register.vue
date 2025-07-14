<template>
  <div class="register-container">
    <el-card class="register-card">
      <h3>用户注册</h3>
      <el-form :model="form" :rules="rules" @submit.prevent="handleRegister">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="4-16位字母或数字" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="至少6位字符" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" show-password />
        </el-form-item>
        <el-button type="link" native-type="submit" :loading="loading">注册</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { ElMessage } from 'element-plus';

const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);
const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{4,16}$/, message: '用户名需为4-16位字母或数字' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: (_, value, callback) => {
      if (value !== form.value.password) {
        callback(new Error('两次输入的密码不一致！'));
      } else {
        callback();
      }
    }, trigger: 'blur' }
  ]
};

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致！');
    return;
  }

  loading.value = true;
  try {
    const result = await authStore.register(form.value.username, form.value.password);
    if (result.success) {
      ElMessage.success('注册成功');
      router.push('/login');
    } else {
      ElMessage.error(result.message);
    }
  } catch (error) {
    ElMessage.error('注册失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}
.register-card {
  width: 400px;
  text-align: center;
}
</style>
