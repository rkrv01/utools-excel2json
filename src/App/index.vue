<template>
  <div class="p-20px h-100vh box-border">
    <div class="app-card w-full h-full">
      <div class="card-header">
        <div class="uploader-container">
          <n-upload action="http://127.0.0.1:3000" accept=".xls,.xlsx">
            <n-upload-dragger>
              <div class="mb-8px">
                <n-icon size="30" :depth="3">
                  <archive-icon />
                </n-icon>
              </div>
              <n-text class="text-size-[16px]">
                点击或者拖动文件到该区域来上传
              </n-text>
              <n-p depth="3" class="mt-8px">
                支持上传.xls 或 .xlsx格式的文件
              </n-p>
            </n-upload-dragger>
          </n-upload>
        </div>
      </div>
      <n-divider />
      <div class="result h-full flex flex-col">
        <p class="mb-5px">
          输出结果
          <n-button
            size="small"
            strong
            secondary
            type="info"
            class="copy-text-btn ml-10px"
            :data-clipboard-text="jsonValue"
          >
            {{ copyBtnText }}
          </n-button>
        </p>
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
import useToJson from "./useToJson";

const { HighLightJs } = useHeightLight();
const { copyBtnText, initClipboard } = useCopy();
const { jsonValue } = useToJson();

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
  box-shadow: 0 0 12px 0px rgba($color: #000000, $alpha: .25);
  
  .result {
    flex: 1;
    overflow: hidden;
  }
}
//上传文件容器
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
