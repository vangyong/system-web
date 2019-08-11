<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('category.categoryName')" v-model="listQuery.categoryName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('category.categoryName')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('category.status')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('category.rank')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.rank }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('category.iconUrl')" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.iconUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('category.parentId')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parentId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('category.description')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('category.createTime')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime |formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('category.categoryName')" prop="categoryName">
          <el-input :placeholder="$t('category.categoryName')" v-model="temp.categoryName" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('category.status')" prop="status">
          <el-select :placeholder="$t('category.status')" v-model="temp.status" class="filter-item" >
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('category.rank')" prop="rank">
          <el-input :placeholder="$t('category.rank')" v-model="temp.rank" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('category.iconUrl')" prop="iconUrl">
          <el-input :placeholder="$t('category.iconUrl')" v-model="temp.iconUrl" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('category.parentId')" prop="parentId">
          <el-input :placeholder="$t('category.parentId')" v-model="temp.parentId" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('category.channelId')" prop="channelId">
          <el-input :placeholder="$t('category.channelId')" v-model="temp.channelId" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('category.description')" prop="description">
          <el-input :placeholder="$t('category.description')" v-model="temp.description" style="width: 200px;" class="filter-item"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="dialogStatus=='update'" type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCategoryPage, createCategory, updateCategory, deleteCategory } from '@/api/mall'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { formatDate } from '@/utils/date'

const statusOptions = [
  { key: 0, display_name: '弃用' },
  { key: 1, display_name: '使用' }
]

const statusKeyValue = statusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'CategoryList',
  directives: {
    waves
  },
  filters: {
    deleteStatusFilter(status) {
      const deleteStatusMap = {
        0: '未删除',
        1: '已删除'
      }
      return deleteStatusMap[status]
    },
    statusFilter(status) {
      return statusKeyValue[status]
    },
    formatDate(time) {
      const dateTime = new Date(time)
      const dateFormated = formatDate(dateTime, 'yyyy-MM-dd hh:mm')
      return dateFormated
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        categoryName: undefined,
        sort: undefined
      },
      statusOptions: [
        { key: 0, display_name: this.$t('category.status_0') },
        { key: 1, display_name: this.$t('category.status_1') }
      ],
      showReviewer: false,
      temp: {
        categoryId: undefined,
        categoryName: undefined,
        iconUrl: undefined,
        description: undefined,
        status: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: this.$t('form.create'),
        update: this.$t('form.update')
      },
      rules: {
        status: [{ required: true, message: 'status is required', trigger: 'change' }],
        categoryName: [{ required: true, message: 'categoryName is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchCategoryPage(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetTemp() {
      this.temp = {
        categoryId: undefined,
        categoryName: undefined,
        iconUrl: undefined,
        description: undefined,
        status: 1
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createCategory(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('notify.success'),
              message: this.$t('notify.createSuccess'),
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp)
          updateCategory(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: this.$t('notify.success'),
              message: this.$t('notify.editSuccess'),
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleDelete(row) {
      deleteCategory(row.categoryId).then(response => {
        var deleteStatus = response.data.deleteStatus
        if (deleteStatus === 1) {
          this.$notify({
            title: this.$t('notify.success'),
            message: this.$t('notify.deleteSuccess'),
            type: 'success',
            duration: 2000
          })
          this.handleFilter()
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
