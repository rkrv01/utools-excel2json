/**json信息展示 */

export default function (isFormatter, excelvalue, exportNameValue) {
    // 过滤数据
    const filterData = computed(() => {
        const showNames = exportNameValue.value;
        let result = {};
        if (showNames.length === 0) {
            return null
        } else if (showNames.length === 1) {
            return excelvalue.value[showNames[0]]
        } else {
            showNames.forEach(key => {
                result[key] = excelvalue.value[key];
            })
        }
        return result;
    })
    //json字符串
    const jsonStr = computed(() => {
        return filterData.value ? JSON.stringify(filterData.value, null, 2) : ''
    });

    // json压缩字符串
    const jsonStrMin = computed(() => {
        return filterData.value ? JSON.stringify(filterData.value, null, 0) : ''
    });

    // json值信息
    const jsonValue = computed(() => {
        return isFormatter.value ? jsonStr.value : jsonStrMin.value
    });

    return {
        jsonValue,
    }
}