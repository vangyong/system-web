<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('coupon.couponName')" v-model="listQuery.couponName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" :placeholder="$t('coupon.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('coupon.couponName')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.couponName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('coupon.type')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('coupon.money')" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('coupon.minMoney')" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.minMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('coupon.maxMoney')" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.maxMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('coupon.sendStartDate')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sendStartDate |formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('coupon.sendEndDate')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sendEndDate |formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('coupon.useStartDate')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.useStartDate |formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('coupon.useEndDate')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.useEndDate |formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="160" class-name="small-padding fixed-width">
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
        <el-form-item :label="$t('coupon.couponName')" prop="couponName">
          <el-input :placeholder="$t('coupon.couponName')" v-model="temp.couponName" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('coupon.type')" prop="type">
          <el-select :placeholder="$t('coupon.type')" v-model="temp.type" class="filter-item" >
            <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('coupon.money')" prop="money">
          <el-input :placeholder="$t('coupon.money')" v-model="temp.money" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('coupon.minMoney')" prop="minMoney">
          <el-input :placeholder="$t('coupon.minMoney')" v-model="temp.minMoney" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('coupon.maxMoney')" prop="maxMoney">
          <el-input :placeholder="$t('coupon.maxMoney')" v-model="temp.maxMoney" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('coupon.sendStartDate')" prop="sendStartDate">
          <el-input :placeholder="$t('coupon.sendStartDate')" v-model="temp.sendStartDate" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('coupon.sendEndDate')" prop="sendEndDate">
          <el-input :placeholder="$t('coupon.sendEndDate')" v-model="temp.sendEndDate" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('coupon.useStartDate')" prop="sendStartDate">
          <el-input :placeholder="$t('coupon.useStartDate')" v-model="temp.useStartDate" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('coupon.useEndDate')" prop="useEndDate">
          <el-input :placeholder="$t('coupon.useEndDate')" v-model="temp.useEndDate" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('coupon.minGoodsMoney')" prop="minGoodsMoney">
          <el-input :placeholder="$t('coupon.minGoodsMoney')" v-model="temp.minGoodsMoney" style="width: 200px;" class="filter-item"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="dialogStatus=='update'" type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="dialogStatus=='examine'" type="primary" @click="examineData">{{ $t('table.confirm') }}</el-button>
        <!--<el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>-->
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCouponList, createCoupon, updateCoupon, deleteCoupon } from '@/api/mall'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { formatDate } from '@/utils/date'

const typeOptions = [
  { key: 1, display_name: '全场通用' },
  { key: 2, display_name: '店铺专用' },
  { key: 3, display_name: '商品专用' }
]

const typeKeyValue = typeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'CouponList',
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
    typeFilter(status) {
      return typeKeyValue[status]
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
        couponName: undefined,
        sort: undefined
      },
      typeOptions: [
        { key: 1, display_name: this.$t('coupon.type_1') },
        { key: 2, display_name: this.$t('coupon.type_2') }
      ],
      showReviewer: false,
      temp: {
        couponId: undefined,
        couponName: undefined,
        type: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: this.$t('form.create'),
        update: this.$t('form.update'),
        examine: this.$t('form.examine')
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        couponName: [{ required: true, message: 'couponName is required', trigger: 'blur' }]
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
      fetchCouponList(this.listQuery).then(response => {
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
        couponId: undefined,
        couponName: undefined,
        type: 1
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
          createCoupon(this.temp).then(() => {
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
          updateCoupon(tempData).then(() => {
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
      deleteCoupon(row.couponId).then(response => {
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
        const tHeader = ['couponName', 'money', 'type', 'tenantId']
        const filterVal = ['couponName', 'money', 'type', 'tenantId']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'coupon-list'
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
