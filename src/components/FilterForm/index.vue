<template>
  <el-form :inline="true" :model="formObject.model" :ref="formObject.ref || ''" :rules="formObject.rules || {}" class="formClass">
    <el-form-item v-for="item in formObject.arr" :key="item.index" :prop="item.prop || ''">
      <el-select
        v-if="item.selectSearch"
        v-model="formObject.model[item.prop]"
        :placeholder="'请选择'+item.tit"
        @focus="remoteMethod">
        <el-option
          v-for="sel in backInfoArr"
          :key="sel.id"
          :label="sel.name"
          :value="sel.id">
        </el-option>
      </el-select>
      <el-select
        v-else-if="item.select"
        clearable
        v-model="formObject.model[item.prop]"
        :placeholder="'请选择'+item.tit">
        <el-option
          v-for="sel in item.select"
          :key="sel.id"
          :label="item.name ? sel[item.name] :sel.name"
          :value="sel.id">
        </el-option>
      </el-select>
      <el-cascader
        v-else-if="item.cascader"
        :options="cascaderList"
        :props="{
          value: 'id',
          label: 'name',
          children: 'result'
        }"
        clearable change-on-select
        v-model="formObject.model[item.prop]"
        :placeholder="'请选择'+item.tit"
        @focus="remoteCascader">
      </el-cascader>
      <el-input v-else clearable v-model="formObject.model[item.prop]" :placeholder="'请填写'+ item.tit"></el-input>
    </el-form-item>
    <el-form-item style="float:right" v-for="operate in formObject.oFun" :key="operate.index">
      <div class="list--btn color--btn" @click="$emit(operate.event)">{{operate.name}}</div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    formObject: {
      type: Object
    }
  },
  data() {
    return {
      loadingC: false,
      backInfoArr: [],
      cascaderList: []
    }
  },
  watch: {
    backInfoArr(val) {
      this.backInfoArr = val
    },
    cascaderList(val) {
      this.cascaderList = val
    }
  },
  methods: {
    remoteMethod() {
      if (this.backInfoArr.length) {
        return
      }
      this.$emit('remoteSearchSort', '')
    },
    remoteCascader() {
      if (this.cascaderList.length) {
        return
      }
      this.$emit('remoteSearchCascader', '')
    }
  }
};
</script>

<style>
  .formClass{
    width: 100%;
  }
</style>
