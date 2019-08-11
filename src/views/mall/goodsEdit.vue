<template>
  <div class="goodsDetail-container">
    <el-form ref="goods" :model="goods" >

      <div class="goodsInfo-container">
        <el-row>
          <el-col :span="10">
            <el-form-item label-width="45px" label="名称:" class="goodsInfo-container-item">
              <el-input :rows="1" v-model="goods.goodsName" type="text" placeholder="请输入名称"/>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label-width="80px" label="编码:" class="goodsInfo-container-item">
              <el-input :rows="1" v-model="goods.goodsCode" type="text" placeholder="请输入编码"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label-width="45px" label="单价:" class="goodsInfo-container-item">
              <el-input :rows="1" v-model="goods.unitPrice" type="number" placeholder="请输入单价"/>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label-width="80px" label="单位:" class="goodsInfo-container-item">
              <el-input :rows="1" v-model="goods.unit" type="text" placeholder="请输入单位"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label-width="45px" label="商户:" class="goodsInfo-container-item">
              <el-input :rows="1" v-model="goods.tenantId" type="text" placeholder="请输入商户"/>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label-width="80px" label="发布时间:" class="goodsInfo-container-item">
              <el-date-picker v-model="goods.createTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label-width="45px" label="摘要:" class="goodsInfo-container-item">
              <el-input :rows="1" v-model="goods.brief" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
            </el-form-item>
          </el-col>

        </el-row>
      </div>

      <!--<div style="margin-bottom: 20px;">-->
      <!--<Upload v-model="goods.listPictureUrl" />-->
      <!--</div>-->

      <!--<div style="margin-bottom: 20px;">-->
      <!--<Upload v-model="goods.primaryPictureUrl" />-->
      <!--</div>-->

      <!--<div class="editor-container">-->
      <!--<Tinymce ref="editor" :height="400" v-model="goods.content" />-->
      <!--</div>-->

    </el-form>

  </div>

</template>

<script>
import { fetchGoodsDetail } from '@/api/mall'
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'

const defaultForm = {
  goodsName: '',
  content: ''
}

export default {
  name: 'GoodsEdit',
  components: { Tinymce, Upload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      goods: Object.assign({}, defaultForm),
      loading: false
    }
  },
  computed: {

  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      fetchGoodsDetail(id).then(response => {
        this.goods = response.data.goods
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .goodsDetail-container {
    position: relative;
    .goodsInfo-container {
      padding: 40px 45px 20px 50px;
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .goodsInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
</style>
