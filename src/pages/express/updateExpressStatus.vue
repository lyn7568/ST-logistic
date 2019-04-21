<template>
  <el-dialog
    title="修改快递状态"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false">
    <form-lists :formItem="formItem" :formModel="formObj" ref="showForm"></form-lists>
    <div class="dialog--foot flex">
      <div class="color--btn" @click="commitStatus">确定</div>
      <div class="nocolor--btn" @click="dialogFormVisible=false">取消</div>
    </div>
  </el-dialog>
</template>

<script>
import formLists from '@/components/Formlists'
import { statusbyOrderArr } from '@/util/dict'
export default {
  data () {
    return {
      dialogFormVisible: false,
      formItem: [
        {
          prop: 'status',
          tit: '状态',
          select: statusbyOrderArr
        }
      ],
      formObj: {
        status: '' 
      }
    }
  },
  components: {
    formLists
  },
  methods: {
    openDiag(val) {
      var that = this
      if (val) {
        this.objId = val.orderId
        this.formObj = val
      }
      setTimeout(() => {
        that.dialogFormVisible = true
      }, 1)
    },
    commitStatus() {
      var params = {
        orderId: this.objId,
        status: this.formObj.status
      };
      this.$http.post('/logistics/express/exchangeExpressOrderInfo', params)
      .then(({ data }) => {
        this.showMsg(data);
        if(data.code == 1) {
          this.dialogFormVisible = false
          this.$parent.resetInfo()
          this.successCb(data.message);
        } else {
          this.$message({
            message: data.message,
            type: data.code == 1 ? 'success' : 'error'
          });
        }
      })
    }
  }
}
</script>
