/**复制业务 */
import Clipboard from "clipboard";
import { ref } from "vue";

export default function () {
    const copyBtnText = ref("一键复制");

    /**初始化复制 */
    function initClipboard() {
        const clipboard = new Clipboard(".copy-text-btn");
        clipboard.on("success", function () {
            copyBtnText.value = "已复制";
            setTimeout(() => {
                copyBtnText.value = "一键复制";
            }, 10000);
        });
        clipboard.on("error", function () {
            console.log("复制失败");
        });
    }

    return {
        copyBtnText,
        initClipboard
    }
}