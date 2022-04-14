<template>
    <div class="p-20px h-100vh box-border">
      <div class="app-card w-full h-full">
        <div class="card-header">
          <div class="uploader-container">
            <n-upload
              accept=".xls,.xlsx"
              :default-upload="false"
              :show-file-list="false"
              :on-change="fileChangeHandler"
              :theme-overrides="themeOverrides"
            >
              <n-upload-dragger>
                <div class="mb-8px">
                  <n-icon size="30" :depth="3">
                    <archive-icon />
                  </n-icon>
                </div>
                <n-text class="text-size-[16px]">
                  点击或者拖动文件到该区域
                </n-text>
                <n-p depth="3" class="mt-8px">
                  支持转换.xls 或 .xlsx格式的文件
                </n-p>
              </n-upload-dragger>
            </n-upload>
          </div>
        </div>

        <n-divider />

        <div class="result h-full flex flex-col">
          <div class="mb-5px flex items-center">
            <label class="ml-10px">
              json格式化
              <n-switch
                v-model:value="isFormatter"
                :theme-overrides="themeOverrides"
                :disabled="!jsonValue"
                @update:value="switchFormatterStateHadnler"
              />
            </label>
            <n-button
              size="small"
              strong
              secondary
              type="info"
              class="copy-text-btn ml-50px"
              :data-clipboard-text="jsonValue"
              :disabled="!jsonValue"
            >
              {{ copyBtnText }}
            </n-button>

          </div>
          <!-- 输出json代码 -->
          <HighLightJs
            language="json"
            :code="jsonValue"
            class="json-container flex-1 overflow-y-auto"
          />
        </div>
      </div>
    </div>
</template>

<script setup>
import { FileExcelTwotone as ArchiveIcon } from "@vicons/antd";

import useCopy from "./useCopy";
import useHeightLight from "./useHeightLight";
import useReadExcel from "./useReadExcel";
const { HighLightJs } = useHeightLight();
const { copyBtnText, initClipboard } = useCopy();

const {
  isFormatter,
  jsonValue,
  fileChangeHandler,
  switchFormatterStateHadnler,
} = useReadExcel();

/**主题配置 */
const themeOverrides = {
  common: {
    primaryColor: "#25b39e",
  },
};


onMounted(() => {
  initClipboard();
});
</script>

<style scoped lang="scss">
// 卡片样式
.app-card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 0 12px 0px rgba($color: #000000, $alpha: 0.25);

  .result {
    flex: 1;
    overflow: hidden;
  }
}
//转换文件容器
.uploader-container {
  :deep() {
    .n-upload-trigger {
      width: 100%;
      .n-upload-dragger {
        padding: 10px;
      }
    }
  }
}

.json-container {
  background-color: #fafafa;
  color: #666;
  font-size: 14px;
  line-height: 1.5em;
  box-sizing: border-box;

  // height: 400px;
  // overflow-y: auto;
}
</style>
