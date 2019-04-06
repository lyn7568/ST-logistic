<template>
  <el-form :inline="true" :model="formObject.model" :ref="formObject.ref || ''" :rules="formObject.rules || {}" class="formClass">
    <el-form-item v-for="item in formObject.arr" :key="item.index" :prop="item.prop || ''">
      <el-select
        v-if="item.select"
        v-model="formObject.model[item.prop]"
        :placeholder="'请选择'+item.tit">
        <el-option
          v-for="sel in item.select"
          :key="sel.id"
          :label="sel.name"
          :value="sel.id">
        </el-option>
      </el-select>
      <el-cascader
        v-else-if="item.cascader"
        :options="item.cascader"
        :props="{
          value: 'id',
          label: 'name',
          children: 'result'
        }"
        change-on-select
        clearable
        v-model="formObject.model[item.prop]"
        :placeholder="'请选择'+item.tit">
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
  }
};
</script>

<style>
  .formClass{
    width: 100%;
  }
</style>
