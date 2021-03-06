<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('resource.resourceName')" v-model="listQuery.resourceName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('resource.resourceCode')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.resourceCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('resource.resourceName')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.resourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('resource.resourceUrl')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.resourceUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('resource.description')" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('resource.hide')" class-name="status-col" width="80">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.hide | hideFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('resource.createTime')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="scope.row.deleteStatus!= 1" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('resource.resourceName')" prop="resourceName">
          <el-input v-model="temp.resourceName"/>
        </el-form-item>
        <el-form-item :label="$t('resource.resourceCode')" prop="resourceCode">
          <el-input v-model="temp.resourceCode"/>
        </el-form-item>
        <el-form-item :label="$t('resource.hide')">
          <el-select v-model="temp.hide" class="filter-item" placeholder="$t('resource.hide')">
            <el-option v-for="item in hideOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('resource.description')">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.description" type="textarea" placeholder="Please input"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchResourceList, createResource, updateResource, deleteResource } from '@/api/system'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'ResourceList',
  directives: {
    waves
  },
  filters: {
    hideFilter(status) {
      const hideMap = {
        1: '隐藏',
        2: '显示'
      }
      return hideMap[status]
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
        resourceName: undefined,
        sort: undefined
      },
      hideOptions: [
        { key: 1, display_name: this.$t('resource.hide_1') },
        { key: 2, display_name: this.$t('resource.hide_2') }],
      temp: {
        resourceId: undefined,
        resourceCode: undefined,
        resourceName: undefined,
        description: undefined,
        locked: 2
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        resourceName: [{ required: true, message: 'resourceName is required', trigger: 'change' }],
        resourceCode: [{ required: true, message: 'resourceCode is required', trigger: 'change' }]
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
      fetchResourceList(this.listQuery).then(response => {
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        resourceId: undefined,
        resourceCode: undefined,
        resourceName: undefined,
        description: undefined,
        locked: 2
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
          createResource(this.temp).then(() => {
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
          updateResource(tempData).then(() => {
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
              message: this.$t('notify.updateSuccess'),
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      deleteResource(row.resourceId).then(response => {
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['resourceCode', 'resourceName', 'description', 'locked']
        const filterVal = ['resourceCode', 'resourceName', 'description', 'locked']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'resource-list'
        })
        this.downloadLoading = false
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
