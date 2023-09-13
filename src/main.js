
import { createApp } from 'vue'
import App from './App.vue'
import router from './views/router/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'


createApp(App).use(router).use(router).mount('#app')