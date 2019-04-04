
<template>
  <div class="Add-page">
    <MyTitle text = "仓库列表"></MyTitle>
    <div class="staff-manage white1">
      <div class="flex between search--wrap">
        <div>
          <el-input v-model="searchText" placeholder="请输入内容" clearable class="search--input"></el-input>
        </div>
        <div class = "flex between list--btn__wrap">
          <div class="list--btn color--btn">搜索</div>
          <div class="list--btn color--btn" @click="addEvent">添加</div>
        </div>
      </div>
      <tree-table :data="tableData" :columns="columns" :operatingList="operatingList"
       @editEvent="editEvent" @deleteEvent="deleteEvent"
       border/>
    </div>
    <EditStore ref="editstore"></EditStore>
  </div>
</template>

<script>
import treeTable from "@/components/TreeTable"
import EditStore from '@/components/modals/EditStore'
export default {
  components: {
    treeTable,
    EditStore
  },
  data() {
    return {
      searchText: '',
      columns: [
        {
          label: '名称',
          key: 'name',
          expand: true,
          align: 'left'
        },
        {
          label: 'ID',
          key: 'id'
        },
        {
          label: '操作',
          operate: true
        }
      ],
      operatingList: [
        {
          text: '编辑',
          event: 'editEvent'
        },
        {
          text: '删除',
          event: 'deleteEvent'
        }
      ],
      tableData: [
        {
          id: 1,
          name: "1号仓库",
          pid: 0
        },
        {
          id: 2,
          name: "2号仓库",
          pid: 0,
          children: [
            {
              id: 3,
              pid: 2,
              name: "库区1",
              children: [
                {
                  id: 4,
                  pid: 3,
                  name: "货位1"
                },
                {
                  id: 5,
                  pid: 3,
                  name: "货位2"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    addEvent() {
      this.$refs.editstore.openDialog()
    },
    editEvent(obj) {
      this.$refs.editstore.openDialog(obj)
    },
    deleteEvent(obj) {
      // this.$confirm('确定删除该条内容？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   center: true
      // }).then(() => {
      //   this.$http.get(deleteUrl, { id: obj.id }, response => {
      //     if (response.success) {
      //       if (response.data) {
      //         this.draftList()
      //         this.$message({
      //           message: '删除成功',
      //           type: 'success'
      //         })
      //       } else {
      //         this.$http.get(inquireContentUrl, { id: this.id }, (response) => {
      //           if (response.success && response.data) {
      //             const info = response.data
      //             if (!info.actived) {
      //               this.$message({
      //                 message: '该内容已被删除',
      //                 type: 'warning'
      //               })
      //             }
      //           }
      //         })
      //       }
      //     }
      //   })
      // }).catch(() => {
      // })
    },
  }
}
</script>

<style scoped lang='scss'>

</style>
