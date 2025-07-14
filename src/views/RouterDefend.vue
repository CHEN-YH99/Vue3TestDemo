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
  <!-- 查看代码 -->
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

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { ElMessage } from 'element-plus';
//查看代码，复制代码
import '@/assets/style/showcode.css'
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
const sourceCode = `<template>
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
        <el-avatar :size="60" :src="\`https://robohash.org/\${authStore.user?.username}\`" />
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
  <!-- 查看代码 -->
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
<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { ElMessage } from 'element-plus';
//查看代码，复制代码
import '@/assets/style/showcode.css'
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
  //其他代码
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
<\/script>

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
</style>`;

//其他代码
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