<template>
    <!-- 设置界面 -->
    <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" size="medium" :style="{
            maxWidth: '640px'
        }">

        <n-form-item label="JSON格式化" path="jsonFormatt">
            <n-switch v-model:value="model.jsonFormatt" @update:value="changeFormHandler($event, 'jsonFormatt')" />
        </n-form-item>

        <n-form-item label="自动清空" path="autoClear">
            <n-switch v-model:value="model.autoClear" @update:value="changeFormHandler($event, 'autoClear')" />
        </n-form-item>

        <n-form-item label="自动关闭" path="autoClose">
            <n-switch v-model:value="model.autoClose" @update:value="changeFormHandler($event, 'autoClose')" />
        </n-form-item>

    </n-form>
</template>

<script setup>
import { useSetting } from "@/stores/setting"

const store = useSetting()

const model = ref({
    jsonFormatt: false,
    autoClear: false,
    autoClose: false
})

const rules = {}

function initData() {
    console.log("initData()",store.getSettingForm());
    model.value = store.getSettingForm();
}

function changeFormHandler(value, name) {
    switch (name) {
        case "jsonFormatt": {
            store.setJsonFormatt(value)
            break;
        }

        case "autoClear": {
            store.setAutoClear(value)
            break;
        }

        case "autoClose": {
            store.setAutoClose(value)
            break;
        }

        default:
            break
    }
}

onMounted(() => {
    console.log(" onMounted()");
})

defineExpose({
    initData
})

</script>
<style scoped lang='scss'>
</style>
