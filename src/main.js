import { createApp } from 'vue'
import App from './App/index.vue'
import  "normalize.css"
import  "./assets/style.scss"
//ElementUIPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')