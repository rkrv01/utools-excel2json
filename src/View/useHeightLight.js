/**代码高亮 */
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import("highlight.js/styles/atom-one-light.css");
hljs.registerLanguage('json', json);
// 样式文件

export default function () {
    // 高亮组件
    const HighLightJs = hljsVuePlugin.component;

    return {
        HighLightJs
    }
}

