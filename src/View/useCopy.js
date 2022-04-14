/**复制业务 */
import Clipboard from "clipboard";
import { ref } from "vue";
import { useNotification } from "naive-ui";
export default function () {
    const defaultText = "复制结果";
    const copyBtnText = ref(defaultText);
    const notification = useNotification();

    /**初始化复制 */
    function initClipboard() {
        const clipboard = new Clipboard(".copy-text-btn");
        clipboard.on("success", function () {
            copyBtnText.value = "已复制";
            notification.success({
                content: "复制成功",
                duration: 1000
            });
            setTimeout(() => {
                copyBtnText.value = defaultText;
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