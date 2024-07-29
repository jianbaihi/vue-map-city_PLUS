import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


export const app = createApp(App)
// 导入vant组件的文件
import { IndexBar, IndexAnchor,Cell } from 'vant';
import 'vant/lib/index.css';

app.use(IndexBar);
app.use(IndexAnchor);
app.use(Cell);


app.use(createPinia())
app.use(router)

app.mount('#app')
