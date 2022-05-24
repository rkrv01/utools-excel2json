<template>
  <n-notification-provider :max="3">
    <n-loading-bar-provider>
      <View :theme-overrides="themeOverrides" />
    </n-loading-bar-provider>
  </n-notification-provider>
</template>

<script setup>

import View from "./View/index.vue";


/**主题配置 */
const themeOverrides = {
  common: {
    primaryColor: "#25b39e",
  },
};
</script>
