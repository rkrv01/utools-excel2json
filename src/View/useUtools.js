/**utools相关业务 */
import { onMounted } from "vue"
const utools = window.utools;

export default function () {

    function initUtoolsEvent() {
        utools.onPluginEnter(({ code, type, payload }) => {
            console.log('用户进入插件 sssk', code, type, payload)
        })
    }

    /**切换至主窗口 */
    function showMainWindow() {
        //执行该方法将会显示 uTools 主窗口，包括此时正在主窗口运行的插件 
        utools && utools.showMainWindow();
    }

    onMounted(() => {
        console.log("useUtools onMounted");
        utools && initUtoolsEvent();
    })

    return {
        showMainWindow
    }
}