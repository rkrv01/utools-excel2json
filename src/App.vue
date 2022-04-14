<template>
  <n-notification-provider :max="3">
     <n-message-provider>
      <View />
    </n-message-provider>
  </n-notification-provider>
</template>

<script setup>
import View from "./View/index.vue";
</script>
<style scoped lang="scss"></style>
