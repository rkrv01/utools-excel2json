/**utools相关业务 */
import { onMounted } from "vue"
const utools = window.utools;

export default function (sheetNames, excelvalue, exportNameValue) {

    /**初始化utools */
    function initUtoolsEvent() {
        utools.onPluginEnter(({ code, type, payload }) => {
            console.log('用户进入插件：', { code, type, payload })
            if (code === 'file') {
                // 通过读取文件的形式进入
                const { path } = payload[0];
                getCopyedFiles(path);
            }
        })
    }

    /**切换至主窗口 */
    function showMainWindow() {
        //执行该方法将会显示 uTools 主窗口，包括此时正在主窗口运行的插件 
        utools && utools.showMainWindow();
    }

    /**获取复制的文件或文件夹 */
    function getCopyedFiles(path) {
        try {
            const result = window.getExcelFileByPath(path)
            sheetNames.value = result.sheetNames;
            exportNameValue.value = result.sheetNames;
            excelvalue.value = result.sheetDatas;
        } catch (error) {
            console.log(error);
            sheetNames.value = ["error"];
            exportNameValue.value = ["error"];
            excelvalue.value = {
                error: error.toString()
            }
        }
    }

    onMounted(() => {
        console.log("useUtools onMounted");
        utools && initUtoolsEvent();
    })

    return {
        showMainWindow
    }
}