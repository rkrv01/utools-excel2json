<template>
  <el-container class="p-20px h-100vh box-border">
    <el-card class="app-card w-full h-full">
      <template #header>
        <!-- <el-button type="primary">上传excel</el-button> -->
        <el-upload
          class="uploader-container"
          drag
          action="http://127.0.0.1:3000"
          multiple
          accept=".xls,.xlsx"
        >
          <div
            class="el-upload__text h-full flex flex-col justify-center items-center"
          >
            <el-icon :size="30">
              <upload-filled />
            </el-icon>
            <p>拖拽文件在这或 <em>点击上传</em></p>
          </div>
        </el-upload>
      </template>
      <div class="result h-full flex flex-col">
        <p class="mb-5px">
          输出结果
          <el-button
            size="small"
            type="primary"
            class="copy-text-btn ml-10px"
            :data-clipboard-text="jsonValue"
            >{{ copyBtnText }}</el-button
          >
        </p>
        <HighLightJs
          language="json"
          :code="jsonValue"
          class="json-container flex-1 overflow-y-auto"
        />
      </div>
    </el-card>
  </el-container>
</template>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { onMounted } from "vue";

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
  :deep() {
    display: flex;
    flex-direction: column;
    .el-card__body {
      flex: 1;
      overflow: hidden;
    }
  }
}
//上传文件容器
.uploader-container {
  :deep() {
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        width: 100%;
        height: 100px;
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
