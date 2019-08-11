<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('user.userName')" v-model="listQuery.userName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.gender" :placeholder="$t('user.gender')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in genderOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select>
      <el-input :placeholder="$t('user.mobileNumber')" v-model="listQuery.mobileNumber" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <!--<el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('user.nickName')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.userName')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.gender')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.gender | genderFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.mobileNumber')" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobileNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.createTime')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime |formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.deleteStatus')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.deleteStatus | deleteStatusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="160" class-name="small-padding fixed-width">
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
        <el-form-item :label="$t('user.nickName')" prop="nickName">
          <el-input :placeholder="$t('user.nickName')" v-model="temp.nickName" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('user.userName')" prop="userName">
          <el-input :placeholder="$t('user.userName')" v-model="temp.userName" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('user.mobileNumber')" prop="mobileNumber">
          <el-input :placeholder="$t('user.mobileNumber')" v-model="temp.mobileNumber" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('user.password')" prop="password">
          <el-input :placeholder="$t('user.password')" v-model="temp.password" type="password" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item :label="$t('user.gender')" prop="gender">
          <el-select :placeholder="$t('user.gender')" v-model="temp.gender" class="filter-item" >
            <el-option v-for="item in genderOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('user.deleteStatus')" prop="deleteStatus">
          <el-select :placeholder="$t('user.deleteStatus')" v-model="temp.deleteStatus" class="filter-item" >
            <el-option v-for="item in deleteStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
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
import { fetchUserList, createUser, updateUser, deleteUser } from '@/api/system'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { formatDate } from '@/utils/date'

export default {
  name: 'UserList',
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
    genderFilter(gender) {
      const genderMap = {
        1: '男',
        2: '女',
        3: '保密'
      }
      return genderMap[gender]
      // return genderKeyValue[gender]
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
        userName: undefined,
        gender: undefined,
        mobileNumber: undefined,
        sort: undefined
      },
      genderOptions: [
        { key: 1, display_name: this.$t('user.gender_male') },
        { key: 2, display_name: this.$t('user.gender_female') },
        { key: 3, display_name: this.$t('user.gender_secret') }
      ],
      deleteStatusOptions: [
        { key: 1, display_name: this.$t('form.deleteStatus_deleted') },
        { key: 2, display_name: this.$t('form.deleteStatus_undelete') }
      ],
      showReviewer: false,
      temp: {
        userId: undefined,
        userName: undefined,
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
      fetchUserList(this.listQuery).then(response => {
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
    // handleModifyStatus(row, status) {
    //   this.$message({
    //     message: '操作成功',
    //     type: 'success'
    //   })
    //   row.status = status
    // },
    resetTemp() {
      this.temp = {
        userId: undefined,
        userName: undefined,
        nickName: undefined,
        mobileNumber: undefined,
        password: undefined,
        gender: 0,
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
          createUser(this.temp).then(() => {
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
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateUser(tempData).then(() => {
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
      deleteUser(row.userId).then(response => {
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
        const tHeader = ['nickName', 'userName', 'gender', 'mobileNumber', 'createTime']
        const filterVal = ['nickName', 'userName', 'gender', 'mobileNumber', 'createTime']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'user-list'
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
