import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

interface User {
  username: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
  expiresAt: number;
}

// 导出一个名为 useAuthStore 的函数，用于定义一个名为 auth 的 store
export const useAuthStore = defineStore('auth', () => {
  // 定义一个名为 user 的 ref，用于存储用户信息，初始值为 null
  const user = ref<User | null>(null);
  // 定义一个名为 isLoggedIn 的 computed，用于判断用户是否已登录，初始值为 false
  const isLoggedIn = computed(() => !!user.value);

  // 初始化时从 localStorage 恢复用户状态
  const initAuth = () => {
    // 从 localStorage 获取用户信息
    const savedUser = localStorage.getItem('user');
    // 如果 localStorage 中有用户信息
    if (savedUser) {
      // 将用户信息解析为 User 类型
      const parsedUser = JSON.parse(savedUser) as User;
      // 如果用户信息中的过期时间大于当前时间
      if (parsedUser.expiresAt > Date.now()) {
        // 将用户信息赋值给 user
        user.value = parsedUser;
      } else {
        // 否则，从 localStorage 中移除用户信息
        localStorage.removeItem('user');
      }
    }
  };

  // 登录逻辑
  const login = async (username: string, password: string) => {
    try {
      // 模拟 API 调用
      const response = await new Promise<{ data: User }>((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              username,
              email: `${username}@example.com`,
              role: username === 'admin' ? 'admin' : 'user',
              token: 'fake-jwt-token',
              expiresAt: Date.now() + 3600 * 1000, // 1 小时后过期
            },
          });
        }, 1000);
      });

      // 将用户信息赋值给 user
      user.value = response.data;
      // 将用户信息存储到 localStorage 中
      localStorage.setItem('user', JSON.stringify(response.data));
      // 显示登录成功的消息
      ElMessage.success('登录成功');
    } catch (error) {
      // 显示登录失败的消息
      ElMessage.error('登录失败');
      // 抛出错误
      throw error;
    }
  };

  // 退出逻辑
  const logout = () => {
    // 将 user 赋值为 null
    user.value = null;
    // 从 localStorage 中移除用户信息
    localStorage.removeItem('user');
    // 显示已退出登录的消息
    ElMessage.success('已退出登录');
  };

  // 检查权限
  const hasRole = (role: User['role']) => {
    // 返回用户是否具有指定角色的计算属性
    return computed(() => user.value?.role === role).value;
  };

  // 初始化
  initAuth();

  // 返回 user、isLoggedIn、login、logout、hasRole
  return { user, isLoggedIn, login, logout, hasRole };
});
