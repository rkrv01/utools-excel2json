import { defineStore } from "pinia"
import { getDbStorageItem, setDbStorageItem } from "@/utils/storage"
const JSON_FORMATT = 'JSON_FORMATT';
const AUTO_CLEAR = 'AUTO_CLEAR';
const AUTO_CLOSE = 'AUTO_CLOSE';

export const useSetting = defineStore("setting", {
    state: () => {
        function getStorageBoolean(key, defaultState) {
            const value = getDbStorageItem(key) || defaultState;
            return value === "true" || value === true ? true : false
        }
        
        return {
            jsonFormatt: getStorageBoolean(JSON_FORMATT, true),
            autoClear: getStorageBoolean(AUTO_CLEAR, false),
            autoClose: getStorageBoolean(AUTO_CLOSE, false)
        }
    },

    actions: {
        /**设置json格式化 */
        setJsonFormatt(value) {
            this.jsonFormatt = value
            setDbStorageItem(JSON_FORMATT, value)
        },

        /**设置自动清除 */
        setAutoClear(value) {
            this.autoClear = value
            setDbStorageItem(AUTO_CLEAR, value)
        },

        /**设置自动关闭 */
        setAutoClose(value) {
            this.autoClose = value
            setDbStorageItem(AUTO_CLOSE, value)
        },

        getSettingForm() {
            return {
                jsonFormatt: this.jsonFormatt,
                autoClear: this.autoClear,
                autoClose: this.autoClose
            }
        }
    }
})