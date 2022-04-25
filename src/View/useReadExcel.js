/**体积优化 读取excel转化为json */
import { read as XLSXRead, utils as XLSXUtils } from "xlsx";

import { useNotification, useLoadingBar } from "naive-ui";

export default function (exportNameValue) {

    // 源信息
    const excelvalue = ref(null);
    // sheets信息
    const sheetNames = ref([])
    // 通知
    const notification = useNotification();
    // 加载进度
    const loadingBar = useLoadingBar()

    /**文件上传变化回调 */
    function runFileRead(data) {
        const { file } = data.file;
        const verifyRes = fileVerification(file);
        if (verifyRes) {
            notification.error({
                content: verifyRes.content,
                meta: verifyRes.meta,
                duration: 3000
            });
        } else {
            renderFile(file)
        }
    }

    /**解析前校验 */
    function fileVerification(file) {
        const { size, name } = file;
        // 格式验证
        const reg = /\.xlsx$|\.xls$/;
        if (!reg.test(name)) {
            return {
                content: "文件格式错误",
                meta: `仅支持转换.xls或.xlsx格式的文件`
            }
        }


        // 最大文件限制（兆）
        const maxSizeM = 30;
        const maxSize = maxSizeM * 1024 * 1024;
        if (size > maxSize) {
            return {
                content: "文件过大",
                meta: `文件大小不可超过${maxSizeM}MB`
            }
        };


    }

    /** web读取文件信息 */
    function renderFile(file) {
        //是否将文件读取为二进制字符串
        const rABS = false;
        const reader = new FileReader();
        if (rABS) {
            /**
             * 用于启动读取指定的 Blob 或 File 内容。当读取操作完成时，readyState 变成 DONE（已完成），
             * 并触发 loadend (en-US) 事件，同时 result 属性中将包含一个 ArrayBuffer 对象以表示所读取文件的数据。
             */
            reader.readAsArrayBuffer(file);
        } else {
            /**
             * 读取指定的 Blob 或 File 对象，当读取完成的时候，readyState  会变成DONE（已完成），
             * 并触发 loadend (en-US) 事件，同时 result 属性将包含所读取文件原始二进制格式。
             * TODO: 该方法已从 FileAPI 标准移除，请使用 FileReader.readAsArrayBuffer() 代替。
             */
            reader.readAsBinaryString(file);
        }

        // 导入时
        reader.onprogress = e => {
            loadingBar.start()
        };

        // 导入完成
        reader.onload = e => {
            try {
                const data = e.target.result;
                excelvalue.value = getSheetDatas(data, rABS)
                // excelvalue.value = integrationSheetData(sheetDatas);
                loadingBar.finish()
            } catch (error) {
                console.error(error);
                notification.error({
                    title: "转换失败",
                    meta: "转换的文件有误,请检查文件后重新转换",
                    duration: 3000
                });
                loadingBar.error()
            }
        }
    }

    /**node读取文件信息 */
    function renderFileByNode(rbuf) {
        console.log("mode读取文件信息:",rbuf);
        excelvalue.value = getSheetDatas(rbuf, true)
        console.log("导入excel信息完成:", excelvalue.value);
    }

    /**读取excel各sheets数据 */
    function getSheetDatas(data,rABS = false) {
        let excelInfo;
        if (rABS) {
            // excelInfo = XLSXRead(btoa(fixdata(data)), {
            //     // 手动转化
            //     type: "base64"
            // });
            excelInfo = XLSXRead(data)
        } else {
            excelInfo = XLSXRead(data, {
                type: "binary"
            });
        }

        const { Sheets, SheetNames } = excelInfo;

        let sheetDatas = {};
        sheetNames.value = SheetNames;
        exportNameValue.value = SheetNames;
        // 查询全部数据
        SheetNames.forEach(name => {
            const data = XLSXUtils.sheet_to_json(
                Sheets[name]
            );
            sheetDatas[name] = data
        });
        return sheetDatas;
    }

    /**清空转换结果 */
    function clearResult(){
        // 清空json原始数据
        excelvalue.value = null
        // 清空可选择表名
        sheetNames.value = [];
        // 清空已选择表名
        exportNameValue.value = []
    }

    return {
        sheetNames,
        excelvalue,
        runFileRead,
        renderFileByNode,
        clearResult
    }
}