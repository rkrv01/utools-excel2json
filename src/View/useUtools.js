/**utools相关业务 */
import { onMounted } from "vue"
const utools = window.utools;

export default function (sheetNames, excelvalue, exportNameValue, renderFileByNode) {

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

    /**隐藏主窗口 */
    function hideMainWindow() {
        //执行该方法将会隐藏 uTools 主窗口，包括此时正在主窗口运行的插件，分离的插件不会被隐藏。 
        utools && utools.hideMainWindow();
    }

    /**获取复制的文件或文件夹 */
    function getCopyedFiles(path) {
        try {
            // 方案一： 直接赋值node解析的excel信息，缺：需要node再引入一次xlsx 应用增大
            // const result = window.getExcelFileByPath(path)
            // sheetNames.value = result.sheetNames;
            // exportNameValue.value = result.sheetNames;
            // excelvalue.value = result.sheetDatas;

            // 方案二： 拿到node读取的buffer 交由web 解析excel
            const rbuf = window.getFileBufferByPath(path)
            renderFileByNode(rbuf)
        } catch (error) {
            console.log(error);
            sheetNames.value = ["error"];
            exportNameValue.value = ["error"];
            excelvalue.value = {
                error: error.toString()
            }
        }
    }

    /**前往json编辑器 */
    function toJsonEdit(jsonData){
        //content 为string类型
        utools && utools.redirect('Json', jsonData)
    }

    onMounted(() => {
        utools && initUtoolsEvent();
    })

    return {
        showMainWindow,
        hideMainWindow,
        toJsonEdit
    }
}