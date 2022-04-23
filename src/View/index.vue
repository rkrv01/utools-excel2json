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
        <div class="mb-5px flex justify-between">
          <div class="options-left flex items-center">
            <label class="ml-10px">
              json格式化
              <n-switch
                v-model:value="isFormatter"
                :theme-overrides="themeOverrides"
                :disabled="!jsonValue"
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
          <div class="options-right flex items-center">
            <!-- <span>导出指定表</span> -->
            <n-select
              class="ml-10px w-300px"
              clearable
              multiple
              placeholder="指定表名转换"
              v-model:value="exportNameValue"
              :options="exportNameOptions"
              v-show="exportNameOptions.length"
            />
          </div>
        </div>
        <!-- 输出json代码 -->
        <!-- 压缩单行超过一万字符的代码不高亮显示 -->
        <pre
          v-if="!isFormatter && jsonValue.length > 10000"
          class="json-container flex-1 overflow-y-auto"
          >{{ jsonValue }}</pre
        >
        <HighLightJs
          v-else
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
import useUtools from "./useUtools";
import useShowJson from "./useShowJson";

// 自动格式化
const isFormatter = ref(true);
// 导出表名
const exportNameValue = ref([]);

const { HighLightJs } = useHeightLight();
const { copyBtnText, initClipboard } = useCopy();

const { runFileRead, sheetNames, excelvalue, renderFileByNode } =
  useReadExcel(exportNameValue);

const { showMainWindow } = useUtools(
  sheetNames,
  excelvalue,
  exportNameValue,
  renderFileByNode
);

const { jsonValue } = useShowJson(isFormatter, excelvalue, exportNameValue);

// 可选表名
const exportNameOptions = computed(() => {
  return sheetNames.value.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
});

/**主题配置 */
const themeOverrides = {
  common: {
    primaryColor: "#25b39e",
  },
};

/**文件上传变化回调 */
function fileChangeHandler(data) {
  // 跳回主窗口
  showMainWindow();
  // 文件校验及转换
  runFileRead(data);
}

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
