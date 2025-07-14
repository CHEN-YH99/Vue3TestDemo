
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css'
import router from './router'
import store from './stores/vuexCount'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
