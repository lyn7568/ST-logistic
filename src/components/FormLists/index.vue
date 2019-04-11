<template>
  <el-form
    :model="formModel"
    ref="formObj"
    :rules="rulesObj"
    class="demo-ruleForm"
  >
    <el-row :gutter="25">
      <el-col :span="item.span||24" v-for="item in formItem" :key="item.index">
        <el-form-item v-if="item.prop" :label="item.tit" :prop="item.prop">
          <el-input
            v-if="item.textarea"
            type="textarea"
            :rows="4"
            v-model="formModel[item.prop]"
            :placeholder="`请填写${item.tit}`"
            :maxlength="item.num||''"
          ></el-input>
          <el-date-picker
            v-else-if="item.date"
            type="datetime"
            v-model="formModel[item.prop]"
            default-time="12:00:00"
            :format="'yyyy-MM-dd HH:mm:ss'"
            :value-format="'yyyy-MM-dd HH:mm:ss'"
            placeholder="选择日期">
          </el-date-picker>
          <el-checkbox
            v-else-if="item.checkbox"
            v-model="formModel[item.prop]"
            :checked="!formModel[item.prop]"
            @change="changeChecked">
          </el-checkbox>
          <el-select
            v-else-if="item.select"
            v-model="formModel[item.prop]"
            :placeholder="item.tit"
            @change="changeSelected">
            <el-option
              v-for="sel in item.select"
              :key="sel.id"
              :label="sel.name"
              :value="sel.id">
            </el-option>
          </el-select>
          <el-input-number
            v-else-if="item.number"
            v-model="formModel[item.prop]"
            :min="1">
          </el-input-number>
          <el-cascader
            v-else-if="item.cascader"
            :options="item.cascader"
            :props="{
              value: 'id',
              label: 'name',
              children: 'result'
            }"
            clearable
            v-model="formModel[item.prop]"
            :placeholder="'请选择'+item.tit">
          </el-cascader>
          <div v-else-if="item.onlyShow">
            <template v-if="item.ISType">{{formModel[item.prop] | ISType}}</template>
            <template v-else-if="item.OSType">{{formModel[item.prop] | OSType}}</template>
            <template v-else>{{formModel[item.prop]}}</template>
          </div>
          <el-input
            v-else-if="item.dbclick"
            readonly
            v-model="formModel[item.prop]"
            :placeholder="`请双击选择${item.tit}`"
            @dblclick.native="$emit(item.dbclick, '')"
          ></el-input>
          <el-input
            v-else
            v-model="formModel[item.prop]"
            :placeholder="`请填写${item.tit}`"
            :maxlength="item.num||''"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
  var requiredTip = function(str) {
    return `请填写${str}`
  }
  export default {
    props: {
      formModel: {
        type: Object
      },
      formItem: {
        type: Array
      }
    },
    data() {
      return {
       rulesObj: {}
      }
    },
    created() {
      this.pushRulesFn()
    },
    methods: {
      changeSelected(val) {
        // console.log(val)
      },
      changeChecked(val) {
        this.$emit('changeIfUse', val)
      },
      pushRulesFn() {
        var that = this
        const formItem = this.formItem
        const rulesObj = this.rulesObj
        for (let i = 0; i < formItem.length; ++i) {
          const ru = []
          if (formItem[i].required) {
            if (formItem[i].eveWay) {
              ru.push({ required: true, message: requiredTip(formItem[i].tit), trigger: 'change' })
            } else {
              ru.push({ required: true, message: requiredTip(formItem[i].tit), trigger: 'blur' })
            }
          }
          rulesObj[formItem[i].prop] = ru
        }
      }
    }
  }
</script>