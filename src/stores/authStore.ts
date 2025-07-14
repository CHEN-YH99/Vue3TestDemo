import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ username: string; role?: string; avatar?: string } | null>(null);

  // 确保 isLoggedIn 是计算属性
  const isLoggedIn = computed(() => !!user.value);

  // 登录方法
  const login = async (username: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userData = users.find((u: any) => u.username === username);
        if (!userData) {
          resolve({ success: false, message: '用户名未注册' });
          return;
        }
        if (userData.password !== password) {
          resolve({ success: false, message: '密码错误' });
          return;
        }
        // 登录成功时，设置用户信息和默认头像
        user.value = { 
          username, 
          role: 'user',
          avatar: '/images/user.png' // 默认头像路径
        };
        resolve({ success: true, message: '登录成功' });
      }, 1000);
    });
  };

   // 注册方法
  const register = async (username: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some((u: any) => u.username === username)) {
          resolve({ success: false, message: '用户名已存在' });
          return;
        }

        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        resolve({ success: true, message: '注册成功' });
      }, 1000);
    });
  };

  // 可选：初始化方法（如果路由守卫需要）
  const initialize = async () => {
    // 例如：检查本地存储的 token
    const token = localStorage.getItem('token');
    if (token) {
      user.value = { username: 'admin' }; // 模拟用户数据
    }
    return !!token;
  };

  // 登出方法
  const logout = () => {
    user.value = null;
    localStorage.removeItem('token'); // 如果有 token
    localStorage.removeItem('lastRegisteredUsername'); // 可选：清除自动填充的用户名
    return true; // 返回退出成功状态
  };

  return { user, login, register, initialize, logout, isLoggedIn };
});
