/**代码高亮 */
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
// 样式文件
import("highlight.js/styles/atom-one-light.css");

export default function () {
    // 高亮组件
    const HighLightJs = hljsVuePlugin.component;

    return {
        HighLightJs
    }
}

