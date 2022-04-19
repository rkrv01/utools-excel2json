<template>
  <n-notification-provider :max="3">
    <n-loading-bar-provider>
        <View />
    </n-loading-bar-provider>
  </n-notification-provider>
</template>

<script setup>
import View from "./View/index.vue";
// import View from "./View/Test/index.vue";
</script>
<style scoped lang="scss"></style>
