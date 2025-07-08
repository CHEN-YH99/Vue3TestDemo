import { createRouter, createWebHashHistory } from 'vue-router'
// import Index from '@/components/Index.vue'
// import countNum from '@/views/countNum.vue'

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
            path: '/countNum',
            name: 'countNum',
            component: () => import(/* webpackChunkName: "about" */ '@/views/countNum.vue')
        },
    ]
    const router = createRouter({
        history:createWebHashHistory(),
        routes,
    })
    
    export default router;