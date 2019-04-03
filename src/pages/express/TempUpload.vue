
<template>
  <div class="StaffAdd-page">
    <MyTitle text = "批量导入快递公司模板文件"></MyTitle>
    <div class="page--body">
      <h2 class="upload--title">模板下载:</h2>
      <a :href="download" download class="link upload--section">模板文件.xlsx</a>

      <h2 class="upload--title">模板修改:</h2>
      <el-upload
        class="upload-demo upload--section"
        drag
        name="file1"
        :action="upload"
        :show-file-list="false"
        :on-success="uploadSuccess"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TempUpload',
  data () {
    return {
      download: window.cfg.baseurl + '/logistics/file/downLoad.do?fileName=templet.xlsx',
      upload: window.cfg.baseurl + '/logistics/expressCompany/uploadAndSave.do',
    }
  },
  methods: {
    uploadSuccess() {
      this.$message({ type: 'success', message: '上传文件成功' })
    }
  },
  created() {

  }
}
</script>

<style scoped lang="scss">
.page--body {
  background: #fff;
  padding: 24px;
}
.link {
  display: block;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 48px;
}
.upload--title {
  margin-bottom: 12px;
  font-size: 20px;
}
.upload--section {
  margin-left: 20px;
}
</style>
