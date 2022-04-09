import { createApp } from 'vue'
import App from './App/index.vue'
import "normalize.css"
import "./assets/style.scss"
//ElementUIPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'

/**代码高亮 */
import 'highlight.js/styles/stackoverflow-light.css'
// import hljs from 'highlight.js/lib/core';
// import json from 'highlight.js/lib/languages/json';
// import hljsVuePlugin from "@highlightjs/vue-plugin";
// hljs.registerLanguage('json', json);
// hljs.registerLanguage('javascript', javascript);

const app = createApp(App)

app.use(ElementPlus)
// app.use(hljsVuePlugin)
app.mount('#app')