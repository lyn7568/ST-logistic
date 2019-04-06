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
      <el-table-column
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
        align="center"
        :className="item.active"
      >
        <template slot-scope="scope">
          <template v-if="scope.row[item.prop]">
            <div v-if="item.classifyName">{{scope.row[item.prop] | classifyName }}</div>
            <div v-else-if="item.shopName">{{scope.row[item.prop] | shopName }}</div>
            <div v-else-if="item.sType">{{scope.row[item.prop] | sType }}</div>
            <div v-else-if="item.wType">{{scope.row[item.prop] | wType }}</div>
            <div v-else-if="item.aType">{{scope.row[item.prop] | aType }}</div>
            <div v-else-if="item.lType">{{scope.row[item.prop] | lType }}</div>
            <div v-else>{{scope.row[item.prop]}}</div>
          </template>
          <template v-if="item.operate && typeof scope.row === 'object'">
            <el-button
              type="text"
              v-for="operate in tableObject.oFun"
              :key="operate.index"
              @click="$emit(operate.event, scope.row)"
            >{{operate.text}}</el-button>
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
    }
  },
  data() {
    return {
    };
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
    }
  }
};
</script>
