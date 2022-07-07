<template>
   <n-notification-provider :max="3">
    <n-loading-bar-provider>
      <View :theme-overrides="themeOverrides" />
    </n-loading-bar-provider>
  </n-notification-provider>
</template>

<script setup lang="ts">
import View from "./View/index.vue";


/**主题配置 */
const themeOverrides = {
  common: {
    primaryColor: "#25b39e",
  },
};

</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
