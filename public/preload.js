const XLSX = require('./xlsx/xlsx.js');
/* 根据磁盘路径读取excel文件 */
window.getExcelFileByPath = function (path) {
    let sheetNames = [];
    let sheetDatas = {};
    const excelInfo = XLSX.readFile(path);
    const { Sheets, SheetNames } = excelInfo;

    sheetNames = SheetNames;

    // 查询全部数据
    sheetNames.forEach(name => {
        const data = XLSX.utils.sheet_to_json(
            Sheets[name]
        );
        sheetDatas[name] = data
    });

    return {
        sheetNames,
        sheetDatas
    };
}

