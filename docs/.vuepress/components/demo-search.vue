<template>
  <div>
    <h2>默认表格</h2>
    <wy-search :fetch="queryData" v-model="tableData">
      <el-table
        :data="tableData">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </wy-search>
    <h2>简单搜索</h2>
    <wy-search :model="form" :fetch="queryData" v-model="tableData1">
      <template slot="simple">
        <el-form-item>
          <el-input v-model="form.keywords"></el-input>
        </el-form-item>
      </template>
      <el-table
        :data="tableData1">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </wy-search>
    <h2>高级搜索</h2>
    <wy-search :model="form2" :fetch="queryData" v-model="tableData2">
      <template slot="simple">
        <el-form-item>
          <el-input v-model="form2.keywords"></el-input>
        </el-form-item>
      </template>
      <template slot="advanced">
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-input v-model="form2.keywords"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-input v-model="form2.other"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-table
        :data="tableData1">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </wy-search>
    <h2>自定义表单搜索</h2>
    <wy-search :model="form3" :fetch="queryData" v-model="tableData3">
      <el-form slot="form" :model="form3">
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-input v-model="form3.keywords3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-input v-model="form3.other3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableData3">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </wy-search>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      form: {
        keywords: ''
      },
      form2: {
        keywords: '',
        other: ''
      },
      form3: {
        keywords3: '',
        other3: ''
      }
    }
  },
  methods: {
    queryData (params) {
      console.log(params)
      const data = [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
      return new Promise(resolve => {
        resolve({
          data,
          pageSize: 20,
          pageNo: 1,
          total: 4
        })
      })
    }
  },
}
</script>
