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
        // 保存3天的登录状态
        const expirationDate = new Date();
        // console.log(expirationDate);
        expirationDate.setDate(expirationDate.getDate() + 3); // 3天后过期
        const authData = {
          user: user.value,
          expiresAt: expirationDate.getTime()
        };
        
        localStorage.setItem('authData', JSON.stringify(authData));
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

  const initialize = async () => {
    const authDataStr = localStorage.getItem('authData');
    if (authDataStr) {
      try {
        const authData = JSON.parse(authDataStr);
        const now = new Date().getTime();
        
        // 检查是否过期
        if (authData.expiresAt > now) {
          // 未过期，恢复用户状态
          user.value = authData.user;
          return true;
        } else {
          // 已过期，清除存储的数据
          localStorage.removeItem('authData');
        }
      } catch (e) {
        console.error('解析登录信息失败', e);
        localStorage.removeItem('authData');
      }
    }
    return false;
  };

  // 登出方法
  const logout = () => {
    user.value = null;
    localStorage.removeItem('authData'); // 清除登录状态
    localStorage.removeItem('lastRegisteredUsername'); // 可选：清除自动填充的用户名
    return true; // 返回退出成功状态
  };

  return { user, login, register, initialize, logout, isLoggedIn };
});
