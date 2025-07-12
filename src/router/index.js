import { createRouter, createWebHashHistory } from 'vue-router'
// import Index from '@/components/Index.vue'
// import countNum from '@/views/countNum.vue'
// import { useAuthStore } from '@/stores/authStore';
    const routes = [
        {
            path: '/',
            name: 'Main',
            component: () => import(/* webpackChunkName: "home" */ '@/components/Main.vue')
        },
        {
            path: '/countNum',
            name: 'countNum',
            component: () => import(/* webpackChunkName: "about" */ '@/views/countNum.vue')
        },
        {
            path: '/TaskList',
            name: 'TaskList',
            component: () => import(/* webpackChunkName: "about" */ '@/views/TaskList.vue')
        },
        {
            path: '/ChangeStyle',
            name: 'ChangeStyle',
            component: () => import(/* webpackChunkName: "about" */ '@/views/ChangeStyle.vue')
        },
        {
            path: '/LoginPanel',
            name: 'LoginPanel',
            component: () => import(/* webpackChunkName: "about" */ '@/views/LoginPanel.vue')
        },
        {
            path: '/FormModel',
            name: 'FormModel',
            component: () => import(/* webpackChunkName: "about" */ '@/views/FormModel.vue')
        },
        {
            path: '/Communication',
            name: 'Communication',
            component: () => import(/* webpackChunkName: "about" */ '@/views/Communication.vue')
        },
        {
            path: '/SlotDemo',
            name: 'SlotDemo',
            component: () => import(/* webpackChunkName: "about" */ '@/views/SlotDemo.vue')
        },
        {
            path: '/LifeHooks',
            name: 'LifeHooks',
            component: () => import(/* webpackChunkName: "about" */ '@/views/LifeHooks.vue')
        },
        {
            path: '/WatchDemo',
            name: 'WatchDemo',
            component: () => import(/* webpackChunkName: "about" */ '@/views/WatchDemo.vue')
        },
        {
            path: '/SetupReuse',
            name: 'SetupReuse',
            component: () => import(/* webpackChunkName: "about" */ '@/views/SetupReuse.vue')
        },
        {
            path: '/TelePort',
            name: 'TelePort',
            component: () => import(/* webpackChunkName: "about" */ '@/views/TelePort.vue')
        },
        {
            path: '/RouterDefend',
            name: 'RouterDefend',
            component: () => import(/* webpackChunkName: "about" */ '@/views/RouterDefend.vue')
        },
    ]
    const router = createRouter({
        history:createWebHashHistory(),
        routes,
    });

    
    export default router;