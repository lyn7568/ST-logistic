<template>
  <el-dialog
    title="选择店铺"
    :visible.sync="dialogSelectVisible"
    :close-on-click-modal="false">
    
    <div class="dialog--foot flex">
      <div class="color--btn">提交</div>
      <div class="nocolor--btn" @click="dialogFormVisible=false">取消</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogSelectVisible: false,
      shopArrs: [],
      
    }
  },
  methods: {
    async remoteOwnerName(query) {
      if (query !== '') {
        let { data } = await this.$http.post('/product/shopList', {
          name: query,
          page: 1,
          pageSize: 1000
        });
        if(data.code == 1) {
          this.shopArrs = data.result.result;
        }
      } else {
        this.shopArrs = []
      }
    }
  }
}
</script>
