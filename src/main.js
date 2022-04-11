import { createApp } from 'vue'
import App from './App/index.vue'
import "normalize.css"
import "./assets/style.scss"
import 'virtual:windi.css'

const app = createApp(App)

app.mount('#app')