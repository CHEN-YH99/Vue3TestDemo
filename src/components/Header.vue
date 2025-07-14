<template>
  <div class="header-container">
    <p>vue3小案例</p>
    <div class="avatar-wrapper">
      <el-popover placement="bottom-end" trigger="hover" :width="200">
        <template #reference>
          <el-avatar
            :key="authStore.user?.username"
            :src="authStore.isLoggedIn ? '/images/user.png' : '/images/default.png'"
            @click="handleAvatarClick"
          />
        </template>
        <div v-if="authStore.isLoggedIn" class="user-popover">
          <p>用户名: {{ authStore.user?.username }}</p>
          <p>角色: {{ authStore.user?.role === 'admin' ? '管理员' : '普通用户' }}</p>
          <el-button size="small" @click="handleLogout">退出登录</el-button>
        </div>
        <div v-else>
          <p>未登录用户</p>
          <el-button size="small" @click="$router.push('/login')">去登录</el-button>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus';

const authStore = useAuthStore()
const router = useRouter()

const handleAvatarClick = () => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
  }
}

const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 用户点击“确定”
      const isLoggedOut = authStore.logout();
      if (isLoggedOut) {
        // 刷新页面并重定向到登录页
        window.location.reload();
        router.push('/login');
      }
    })
    .catch(() => {
      // 用户点击“取消”，什么都不做
    });
};
</script>
<style scoped lang="scss">
.header-container {
  position: fixed; // 固定定位
  top: 0;          // 紧贴顶部
  left: 0;         // 紧贴左侧
  right: 0;        // 紧贴右侧
  z-index: 1000;   // 确保页头在其他内容上方
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-popover {
  padding: 12px;
  text-align: center;

  p {
    margin: 8px 0;
    font-size: 14px;
    color: #dc2a2a;
  }

  .el-button {
    margin-top: 8px;
    width: 100%;
  }
}
</style>
