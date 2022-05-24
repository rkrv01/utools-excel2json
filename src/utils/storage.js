/** 本地数据存储 */

const utools = window.utools

/** 数据存储某一项 */
export function getDbStorageItem(key) {
  if (utools) {
    return utools.dbStorage.getItem(key)
  } else {
    return window.localStorage.getItem(key)
  }
}

/** 数据读取某一项 */
export function setDbStorageItem(key, value) {
  if (utools) {
    return utools.dbStorage.setItem(key, value)
  } else {
    return window.localStorage.setItem(key, value)
  }
}
