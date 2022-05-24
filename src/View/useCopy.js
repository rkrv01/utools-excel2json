/**复制业务 */
import Clipboard from "clipboard";
import { useNotification } from "naive-ui";
import { storeToRefs } from "pinia"
import { useSetting } from "@/stores/setting"


export default function (clearResult, hideMainWindow) {
    const defaultText = "复制结果";
    const copyBtnText = ref(defaultText);
    const notification = useNotification();

    /**初始化复制 */
    function initClipboard() {
        const clipboard = new Clipboard(".copy-text-btn");
        clipboard.on("success", function () {
            copyCallback()
        });
        clipboard.on("error", function () {
            console.log("复制失败");
        });
    }

    /**复制成功回调 */
    function copyCallback() {
        const {
            autoClear,
            autoClose
        } = storeToRefs(useSetting())
        copyBtnText.value = "已复制";
        notification.success({
            content: "复制成功",
            duration: 1000
        });
        if (autoClear.value) {
            console.log("清除结果..");
            clearResult()
        }
        if (autoClose.value) {
            console.log("关闭窗口..");
            hideMainWindow()
        }

        setTimeout(() => {
            copyBtnText.value = defaultText;
        }, 10000);
    }

    return {
        copyBtnText,
        initClipboard
    }
}