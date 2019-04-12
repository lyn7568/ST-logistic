<template>
  <el-dialog
    title="入库审批操作"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false">
    <form-lists :formItem="formItem" :formModel="formObj" ref="showForm"></form-lists>
    <el-row :gutter="10" style="margin-bottom: 0.5rem">
      <el-col :span="4" align="right">
        审批理由
      </el-col>
      <el-col :span="18">
        <el-input type="textarea" :rows="5" v-model="inReason" :maxlength="2000"></el-input>
      </el-col>
    </el-row>
    <div class="dialog--foot flex">
      <div class="color--btn" @click="commitStatus(1)">审批通过</div>
      <div class="color--btn" @click="commitStatus(2)">审批不通过</div>
      <div class="nocolor--btn" @click="dialogFormVisible=false">取消</div>
    </div>
  </el-dialog>
</template>

<script>
import formLists from '@/components/Formlists'
export default {
  data () {
    return {
      dialogFormVisible: false,
      formItem: [
        {
          prop: 'orderNumber',
          tit: '入库单号',
          onlyShow: true
        },
        {
          prop: 'batch',
          tit: '批次',
          onlyShow: true
        },
        {
          prop: 'productName',
          tit: '货物名称',
          onlyShow: true
        },
        {
          prop: 'ckq',
          tit: '仓库/库区/库位',
          onlyShow: true
        },
        {
          prop: 'supplierName',
          tit: '供应商',
          onlyShow: true
        },
        {
          prop: 'supplierNumber',
          tit: '供应商编号',
          onlyShow: true
        },
        {
          prop: 'supplierPhone',
          tit: '供应商联系方式',
          onlyShow: true
        },
        {
          prop: 'type',
          tit: '入库类型',
          ISType: true,
          onlyShow: true
        },
        {
          prop: 'operationAmount',
          tit: '入库数量',
          onlyShow: true
        }
      ],
      formObj: {},
      inReason: ''
    }
  },
  components: {
    formLists
  },
  methods: {
    openDiag(val) {
      var that = this
      if (val) {
        this.objId = val.id
        val.ckq = val.warehouseName + '/' + val.areaName + '/' + val.locationName
        this.formObj = val
      }
      setTimeout(() => {
        that.dialogFormVisible = true
      }, 1)
    },
    commitStatus(val) {
      var params = {
        id: this.objId,
        status: val,
        reason: this.inReason
      };
      this.$http.post('/operation/changeComeStatus', params)
      .then(({ data }) => {
        this.showMsg(data);
        if(data.code == 1) {
          this.inReason = ''
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
