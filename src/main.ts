import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import "normalize.css"
import "./assets/var.scss";
import "./assets/style.scss"
import 'virtual:windi.css'


createApp(App).use(createPinia()).mount('#app')
