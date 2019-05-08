<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('goods.goodsName')" v-model="listQuery.goodsName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.status" :placeholder="$t('goods.status')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select>
      <el-input :placeholder="$t('goods.goodsCode')" v-model="listQuery.goodsCode" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('goods.goodsCode')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.goodsName')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.status')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status">{{ scope.row.status| statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.brief')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brief }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.createTime')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime |formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('goods.deleteStatus')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.deleteStatus ">{{ scope.row.deleteStatus | deleteStatusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleExamine(scope.row)">{{ $t('goods.examine') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('goods.goodsName')" prop="goodsName">
          <el-input :placeholder="$t('goods.goodsName')" v-model="temp.goodsName" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('goods.goodsCode')" prop="goodsCode">
          <el-input :placeholder="$t('goods.goodsCode')" v-model="temp.goodsCode" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('goods.status')" prop="status">
          <el-select :placeholder="$t('goods.status')" v-model="temp.status" class="filter-item" >
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('goods.deleteStatus')" prop="deleteStatus">
          <el-select :placeholder="$t('goods.deleteStatus')" v-model="temp.deleteStatus" class="filter-item" >
            <el-option v-for="item in deleteStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="dialogStatus=='examine'" type="primary" @click="examineData">{{ $t('table.confirm') }}</el-button>
        <!--<el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>-->
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchGoodsList, createGoods, updateGoods, examineGoods, deleteGoods } from '@/api/mall'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { formatDate } from '@/utils/date'

export default {
  name: 'GoodsList',
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
      const statusMap = {
        0: '编辑',
        1: '待审核',
        2: '审核未通过',
        3: '正在销售',
        4: '下架',
        5: '售完'
      }
      return statusMap[status]
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
        goodsName: undefined,
        gender: undefined,
        mobileNumber: undefined,
        sort: undefined
      },
      statusOptions: [
        { key: 0, display_name: this.$t('goods.status_0') },
        { key: 1, display_name: this.$t('goods.status_1') },
        { key: 2, display_name: this.$t('goods.status_2') },
        { key: 3, display_name: this.$t('goods.status_3') },
        { key: 4, display_name: this.$t('goods.status_4') },
        { key: 5, display_name: this.$t('goods.status_5') }
      ],
      deleteStatusOptions: [
        { key: 1, display_name: this.$t('form.deleteStatus_deleted') },
        { key: 0, display_name: this.$t('form.deleteStatus_nodelete') }
      ],
      showReviewer: false,
      temp: {
        goodsId: undefined,
        goodsName: undefined,
        nickName: undefined,
        mobileNumber: undefined,
        password: undefined,
        gender: 0,
        deletStatus: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('form.update'),
        create: this.$t('form.create')
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
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
      fetchGoodsList(this.listQuery).then(response => {
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
        goodsId: undefined,
        goodsName: undefined,
        mobileNumber: undefined,
        status: 0,
        deleteStatus: 0
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
          createGoods(this.temp).then(() => {
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
          updateGoods(tempData).then(() => {
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
    handleExamine(row) {
      this.temp = Object.assign({}, row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'examine'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    examineData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp)
          examineGoods(tempData).then(() => {
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
      deleteGoods(row.goodsId).then(response => {
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
        const tHeader = ['goodsName', 'goodsCode', 'status', 'mobileNumber', 'createTime']
        const filterVal = ['goodsName', 'goodsCode', 'status', 'mobileNumber', 'createTime']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'goods-list'
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
