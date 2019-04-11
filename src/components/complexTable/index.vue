<template>
  <div class="tableClass">
    <el-table
      ref="tableBody"
      border
      stripe
      :data="tableObject.data"
      :row-class-name="tableRowClassName"
      :header-row-class-name="tableThClassName"
    >
      <!-- <el-table-column v-if="tableObject.checked"
        type="selection"
        width="55"
        disabled="true"
        @select-all="$emit('selectAllFun', e)"
        @selection-change="$emit('checkedChangeFun', e)">
      </el-table-column> -->
      <el-table-column  v-if="!tableObject.checked"
        type="index"
        align = "center"
        :index = "(i) => i >=9 ? (i + 1) : `0${ i + 1 }`"
        label = "序号"
        width="80">
      </el-table-column>
      <el-table-column
        v-for="item in tableObject.arr"
        :key="item.index"
        :prop="item.prop || ''"
        :label="item.tit || ''"
        :width="item.width || ''"
        :fixed="item.fixed|| false"
        align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.hasOwnProperty(item.prop)">
            <div v-if="item.classifyName">{{scope.row[item.prop] | classifyName }}</div>
            <div v-else-if="item.shopName">{{scope.row[item.prop] | shopName }}</div>
            <div v-else-if="item.sType">{{scope.row[item.prop] | sType }}</div>
            <div v-else-if="item.ifUse">{{scope.row[item.prop] | ifUse }}</div>
            <div v-else-if="item.wType">{{scope.row[item.prop] | wType }}</div>
            <div v-else-if="item.aType">{{scope.row[item.prop] | aType }}</div>
            <div v-else-if="item.lType">{{scope.row[item.prop] | lType }}</div>
            <div v-else-if="item.ISType">{{scope.row[item.prop] | ISType }}</div>
            <el-tag v-else-if="item.sTag" :type="tagType(scope.row[item.prop], true)">{{tagType(scope.row[item.prop])}}</el-tag>
            <el-radio v-else-if="item.radio" :label="scope.row[item.prop]" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
            <div v-else>{{scope.row[item.prop]}}</div>
          </template>
          <template v-if="item.operate && typeof scope.row === 'object'">
            <template v-if="tableObject.hFun">
              <el-button
                type="text"
                v-show="scope.row.status===0 || scope.row.status===2"
                v-for="operate in tableObject.hFun"
                :key="operate.index"
                @click="$emit(operate.event, scope.row, scope.$index)"
              >{{operate.text}}</el-button>
            </template>
            <template v-if="tableObject.oFun">
              <el-button
                type="text"
                v-for="operate in tableObject.oFun"
                :key="operate.index"
                @click="$emit(operate.event, scope.row, scope.$index)"
              >{{operate.text}}</el-button>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-center foot--pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="tableObject.pageNo"
        layout="prev, pager, next, jumper, ->"
        :total="tableObject.total"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  name: 'complexTable',
  props: {
    tableObject: {
      type: Object
    },
    templateRadioFather: {}
  },
  data() {
    return {
      templateRadio: ''
    };
  },
  watch: {
    templateRadioFather(val) {
      this.templateRadio = val
    }
  },
  created() {
    this.templateRadio = this.templateRadioFather
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('pageCurFun', val);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return 'even-row';
      } else {
        return 'odd-row';
      }
    },
    tableThClassName({ row, rowIndex }) {
      return 'even-row';
    },
    tagType(val, f) {
      switch(val) {
        case 0:
          return f ? 'warning' : '待审批'
        case 1:
          return f ? 'success' : '已通过'
        case 2:
          return f ? 'danger' : '未通过'
      }
    },
    getTemplateRow(index, row) {
      this.$emit('getChangeRadio', row)
      this.$emit('getTemplateRowInfo', row)
    }
  }
};
</script>
