<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card v-if="goodsList.length === 0">
          <span class="fa fa-info">
           暂无数据!
          </span>
        </b-card>
        <b-card v-else >
          <b-table hover :items="goodsList" :fields="fields" class="responsive">
            <template slot="action" slot-scope="row">
              <span><b-button variant = "primary" @click = "updateGood(row.item.id)">修改</b-button></span>
              <span><b-button variant = "primary" @click = "deleteGood(row.item.id)">删除</b-button></span>
            </template>
          </b-table>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: 'goods',
    data: ()=>{
      return {
        goodsList: [],
        totalRows: 0,
        perPage: 10,
        currentPage: 1,
        fields: [
          {
            key: 'name',
            label: '产品名称',
            class: 'name'
          },
          {
            key: 'desc',
            label: '描述',
            class: 'desc'
          },
          {
            key: 'imgUrl',
            label: '图片',
            class: 'imgUrl'
          },
          {
            key: 'price',
            label: '价格',
            class: 'price'
          },
          {
            key: 'oriPrice',
            label: '折扣价',
            class: 'oriPrice'
          },
          {
            key: 'action',
            label: '操作',
            class: 'action'
          }
        ]
      }
    },
    methods: {
      getGoodsList () {
        this.goodsList = [
          {id: '1111', name: '产品1', desc:'产品1是一款好产品', price: '111'},
          {id: '222222', name: '产品2', desc:'产品2是一款好产品', price: '222'},
          {id: '333333', name: '产品3', desc:'产品3是一款好产品', price: '333'},
         ]
        this.totalRows = 1
      },
      updateGood(id) {
        console.log('updateGood id', id)
      },
      deleteGood(id) {
        console.log('deleteGood id', id)
      }
    },
    created() {
      this.getGoodsList()
    },
    watch: {
      currentPage: function (val) {
        // code here with page change
      }
    }
  }
</script>
<style>
  table.responsive{
    width: 100%;
    margin: 0 auto;
    border: 1px solid #cccccc;
    border-collapse:collapse;
    /**
    box-shadow: 0 0 10px 0 rgba(0,0,0,5);
    **/
  }
  table.responsive th,table.responsive td{
    border: 1px solid #cccccc;
    padding: .5em 1em;
    text-align: center;
  }
  /*设置表头背景色*/
  table.responsive th{
    background-color: #ffffff;
  }
</style>
