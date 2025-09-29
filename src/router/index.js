import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { ElMessage } from 'element-plus';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/components/Main.vue'),
    // meta: { requiresAuth: true } // 需要登录
  },
  {
    path: '/countNum',
    name: 'countNum',
    component: () => import('@/views/countNum.vue') // 允许未登录访问
  },
  {
    path: '/TaskList',
    name: 'TaskList',
    component: () => import('@/views/TaskList.vue') // 允许未登录访问
  },
  {
    path: '/ChangeStyle',
    name: 'ChangeStyle',
    component: () => import('@/views/ChangeStyle.vue') // 允许未登录访问
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { guestOnly: true } // 仅未登录可访问
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { guestOnly: true } // 仅未登录可访问
  },
  // 其他需要登录的路由
  {
    path: '/FormModel',
    name: 'FormModel',
    component: () => import('@/views/FormModel.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/Communication',
    name: 'Communication',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Communication.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/SlotDemo',
    name: 'SlotDemo',
    component: () => import(/* webpackChunkName: "about" */ '@/views/SlotDemo.vue'),
    meta: { requiresAuth: true }
},
  {
    path: '/LifeHooks',
    name: 'LifeHooks',
    component: () => import(/* webpackChunkName: "about" */ '@/views/LifeHooks.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/WatchDemo',
    name: 'WatchDemo',
    component: () => import(/* webpackChunkName: "about" */ '@/views/WatchDemo.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/SetupReuse',
    name: 'SetupReuse',
    component: () => import(/* webpackChunkName: "about" */ '@/views/SetupReuse.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/TelePort',
    name: 'TelePort',
    component: () => import(/* webpackChunkName: "about" */ '@/views/TelePort.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/RouterDefend',
    name: 'RouterDefend',
    component: () => import(/* webpackChunkName: "about" */ '@/views/RouterDefend.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/LoginPanel',
    name: 'LoginPanel',
    component: () => import(/* webpackChunkName: "about" */ '@/views/LoginPanel.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/vuexCount',
    name: 'VuexCount',
    component: () => import(/* webpackChunkName: "about" */ '@/views/VuexCount.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/changecolor',
    name: 'ChangeColor',
    component: () => import(/* webpackChunkName: "about" */ '@/views/changeColor.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/arrayhandle',
    name: 'ArrayHandle',
    component: () => import(/* webpackChunkName: "about" */ '@/views/修改数组处理方法.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/arrayoperations',
    name: 'ArrayOperations',
    component: () => import(/* webpackChunkName: "about" */ '@/views/不修改数组方法.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  await authStore.initialize(); // 确保用户状态初始化

  // 未登录用户尝试访问需登录的路由 → 弹出提示并跳转到登录页
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    ElMessage.warning('请先登录！');
    return '/login';
  }

  // 已登录用户尝试访问仅限未登录的路由（如登录页）→ 跳转到首页
  if (to.meta.guestOnly && authStore.isLoggedIn) {
    return '/';
  }
});

export default router;