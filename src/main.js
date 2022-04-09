import { createApp } from 'vue'
import App from './App/index.vue'
import "normalize.css"
import "./assets/style.scss"
//ElementUIPlus
import 'element-plus/dist/index.css'
import 'virtual:windi.css'

const app = createApp(App)

app.mount('#app')