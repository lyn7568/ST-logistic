
<template>
  <div class="Add-page">
    <MyTitle text = "新增货物"></MyTitle>
    <el-form 
      :model="ruleForm" 
      :rules="rules" 
      ref="ruleForm" 
      class="demo-ruleForm white">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop="number">
        <el-input v-model="ruleForm.number" maxlength="520"></el-input>
      </el-form-item>
      <el-form-item label="所属分类" prop="classificationId">
        <el-select filterable v-model="ruleForm.classificationId" placeholder="请选择所属分类">
          <el-option
            v-for="item in $root.classifications"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属店铺" prop="shopId">
        <el-select filterable v-model="ruleForm.shopId" placeholder="请选择所属店铺">
          <el-option
            v-for="item in $root.shops"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input v-model="ruleForm.price" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="standard">
        <el-input type="textarea" :rows="6" v-model="ruleForm.standard" maxlength="3000"></el-input>
      </el-form-item>
      <el-form-item label="产地" prop="place">
        <el-input v-model="ruleForm.place" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="amount">
        <el-input-number v-model="ruleForm.amount" @change="handleAmountChange" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="图片" prop="fileIds">
      </el-form-item>
      <el-form-item label="存放位置">
        <el-cascader :options="options" filterable ></el-cascader>
      </el-form-item>
      <el-form-item>
        <div class='submit--btn hover' @click="submitForm('ruleForm')">立即新增</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        number: '',
        classificationId: '',
        shopId: '',
        price: '',
        amount: 0
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        classificationId: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        shopId: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }]
    }
  },
  methods: {
    handleAmountChange(val) {
      this.ruleForm.amount = val
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add();
        } else {
          this.showWarn('参数不正确')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async add() {
      let ruleForm = this.ruleForm;
      let params = {
        name: ruleForm.name,
        number: ruleForm.number,
        classificationId: ruleForm.classificationId,
        shopId: ruleForm.shopId,
        price: ruleForm.price,
        amount: ruleForm.amount
      }

      let res = await this.$http.post('/logistics/user/save.do', params);
      let { data } = res;

      if(data.code == 1) {
        this.resetForm('ruleForm');
        this.successCb(data.message);
      } else {
        this.$message({
          message: data.message,
          type: data.code == 1 ? 'success' : 'error'
        });
      }
    }
  },
  created() {
    // this.getClassificationss();
    // this.getShops()
  }
}
</script>

<style scoped lang='scss'>

</style>
