/**深色模式 */
export default function () {
    const isDark = ref(false);

    /**暗色模式监听 */
    function whatchDarkMode() {
        let prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            // 搞事情
            isDark.value = true
        }
    }

    onMounted(() => {
        whatchDarkMode()
    })

    return {
        isDark
    }
}