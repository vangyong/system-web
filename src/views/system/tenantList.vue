<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('tenant.tenantName')" v-model="listQuery.tenantName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.status" :placeholder="$t('tenant.status')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select>
      <el-input :placeholder="$t('tenant.tenantCode')" v-model="listQuery.tenantCode" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>

    <div style="width: 100px; height: 100px" >
      <div v-for="fit in fits" :key="fit" class="block">
        <!--<span class="demonstration">{{ fit }}</span>-->
        <el-image :src="url" :fit="fit" style="width: 100px; height: 100px" />
      </div>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('tenant.tenantCode')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tenantCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tenant.tenantName')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tenantName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tenant.status')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status| statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tenant.mobileNumber')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobileNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tenant.createTime')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime |formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tenant.deleteStatus')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.deleteStatus | deleteStatusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleExamine(scope.row)">{{ $t('tenant.examine') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('tenant.tenantName')" prop="tenantName">
          <el-input :placeholder="$t('tenant.tenantName')" v-model="temp.tenantName" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('tenant.mobileNumber')" prop="mobileNumber">
          <el-input :placeholder="$t('tenant.mobileNumber')" v-model="temp.mobileNumber" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('tenant.status')" prop="status">
          <el-select :placeholder="$t('tenant.status')" v-model="temp.status" class="filter-item" >
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('tenant.deleteStatus')" prop="deleteStatus">
          <el-select :placeholder="$t('tenant.deleteStatus')" v-model="temp.deleteStatus" class="filter-item" >
            <el-option v-for="item in deleteStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>

        <div :label="$t('tenant.certificate')" style="width: 200px;height: 200px">
          <!--<el-table :data="temp.certificates" style="width: 100%">-->
          <!--<el-table-column prop="certificateId" label="证件id" width="120"/>-->
          <!--<el-table-column prop="certificateName" label="证件类型" width="120"/>-->
          <!--<el-table-column prop="certificateUrl" label="预览" width="120"/>-->
          <!--</el-table>-->

          <div v-for="fit in certificates" :key="fit.certificateId" style="width: 200px;height: 200px">
            <!--<span class="demonstration">{{ fit.certificateName }}</span>-->
            <el-image :src="url" style="height: 100px;width: 100px"/>
          </div>

        </div>

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
import { fetchTenantList, createTenant, updateTenant, examineTenant, deleteTenant, fetchCertificateByTenant } from '@/api/system'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { formatDate } from '@/utils/date'
import { fileDownload } from '@/utils/global'

export default {
  name: 'TenantList',
  directives: {
    waves
  },
  filters: {
    deleteStatusFilter(status) {
      const deleteStatusMap = {
        1: '已删除',
        2: '未删除'
      }
      return deleteStatusMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        1: '待审核',
        2: '审核未通过',
        3: '正常经营',
        4: '暂停经营',
        5: '注销'
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
        tenantName: undefined,
        status: undefined,
        mobileNumber: undefined,
        sort: undefined
      },
      statusOptions: [
        { key: 1, display_name: this.$t('tenant.status_1') },
        { key: 2, display_name: this.$t('tenant.status_2') },
        { key: 3, display_name: this.$t('tenant.status_3') },
        { key: 4, display_name: this.$t('tenant.status_4') },
        { key: 5, display_name: this.$t('tenant.status_5') }
      ],
      deleteStatusOptions: [
        { key: 1, display_name: this.$t('form.deleteStatus_deleted') },
        { key: 2, display_name: this.$t('form.deleteStatus_undelete') }
      ],
      showReviewer: false,
      temp: {
        tenantId: undefined,
        tenantName: undefined,
        deleteStatus: 2,
        certificates: []
      },
      certificates: [{
        certificateName: '身份证正面',
        certificateUrl: 'http://127.0.0.1:8000/v1/filecenter/download/1195681697258147840'
      }],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
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
      fetchTenantList(this.listQuery).then(response => {
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
        tenantId: undefined,
        tenantName: undefined,
        mobileNumber: undefined,
        status: 2,
        deleteStatus: 2
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
          createTenant(this.temp).then(() => {
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
          updateTenant(tempData).then(() => {
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
            this.handleFilter()
          })
        }
      })
    },
    handleExamine(row) {
      this.temp = Object.assign({}, row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.getCertificateList(row.tenantId)
      this.dialogStatus = 'examine'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getCertificateList(tenantId) {
      fetchCertificateByTenant(tenantId).then((res) => {
        if (res.data) {
          const certificateList = []
          for (const v of res.data) {
            v.certificateUrl = fileDownload + '/' + v.certificateUrl
            certificateList.push(v)
          }
          this.temp.certificates = res.data
          console.log(this.temp.certificates)
        }
      })
    },
    examineData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp)
          examineTenant(tempData).then(() => {
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
            this.handleFilter()
          })
        }
      })
    },
    handleDelete(row) {
      deleteTenant(row.tenantId).then(response => {
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
        const tHeader = ['tenantName', 'tenantCode', 'status', 'mobileNumber', 'createTime']
        const filterVal = ['tenantName', 'tenantCode', 'status', 'mobileNumber', 'createTime']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'tenant-list'
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

<style rel="stylesheet/scss" lang="scss">
  .block {
    padding: 30px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    display: inline-block;
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    vertical-align: top;
  }

</style>
