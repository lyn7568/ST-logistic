<template>
  <div class="tableClass">
    <el-table
      ref="tableBody"
      border
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
        :prop="item.prop ? item.prop : ''"
        :label="item.tit ? item.tit : ''"
        :width="item.width ? item.width : ''"
        align="center"
        :className="item.active"
      >
        <template slot-scope="scope">
          <div v-if="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
          <div v-if="item.operate && typeof scope.row === 'object'">
            <el-button
              type="text"
              v-for="operate in tableObject.oFun"
              :key="operate.index"
              @click="$emit(operate.event, scope.row)"
            >{{operate.text}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-center foot--pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="tableObject.pageNo"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="tableObject.pageSize"
        layout="prev, pager, next, jumper"
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
    handleSizeChange(val) {
      this.$emit('pageSizeFun', val)
    },
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
