<template>
  <div class="animated fadeIn">
    <b-tabs>
      <b-tab title="在售" @click="getGoodsList(0)">
        <div v-if="goodsList.length ===0 ">
          <span class="fa fa-info">
           列表中没有数据！！
          </span>
        </div>
        <div v-else>
          <b-table hover :items="goodsList" :fields="fields" class="responsive">
            <template slot="action" slot-scope="row">
              <span><b-button variant="success" @click="setProductStatus(0, row.item.id)">下架</b-button></span>
            </template>
          </b-table>
        </div>
      </b-tab>
      <b-tab title="库房中" @click="getGoodsList(1)">
        <div v-if="goodsList.length ===0 ">
          <span class="fa fa-info">
           列表中没有数据！！
          </span>
        </div>
        <div v-else>
          <b-table hover :items="goodsList" :fields="fields" class="responsive">
            <template slot="action" slot-scope="row">
              <span><b-button variant="success" @click="setProductStatus(1, row.item.id)">上架</b-button></span>
              <span><b-button variant="danger" @click="purchase(row.item)">补货</b-button></span>
            </template>
          </b-table>
        </div>
      </b-tab>
    </b-tabs>

    <b-modal id="restock_modal" centered title="填写进货信息">
      <p v-if="selectedGood">
        <b-list-group>
          <b-list-group-item><span>商品名：</span>{{selectedGood.name}}</b-list-group-item>
          <b-list-group-item><span>成本价(元/件)：</span>{{selectedGood.costPrice}}</b-list-group-item>
          <b-list-group-item>
            <span>选择进货数量(件)：</span>
            <span>
               <i class="num_button fa fa-minus" @click="reduceNum"></i>
               <i><input type="text" class="num_input" v-model="num"/></i>
               <i class="num_button fa fa-plus" @click="addNum"></i>
             </span>
          </b-list-group-item>
        </b-list-group>
      </p>
      <div slot="modal-footer" class="w-100">
        <b-btn size="md" class="float-right" variant="danger"
               @click="hideRestockModal">
          取消
        </b-btn>
        <b-btn size="md" class="float-right" variant="primary" @click="">
          确定
        </b-btn>
      </div>
    </b-modal>

  </div>
</template>

<script>
  let token = window.sessionStorage.getItem('token')
  export default {
    name: 'goods',
    data: () => {
      return {
        goodsList: [{ id: '1', name: '产品1', desc: '产品1是一款好产品', costPrice: '111' },
          { id: '2', name: '产品2', desc: '产品2是一款好产品', costPrice: '222' },
          { id: '3', name: '产品3', desc: '产品3是一款好产品', costPrice: '333' }],
        num: 0,
        selectedGood: null,
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
      getGoodsList (type) {
        let _this = this
        let options = {
          url: '/getProduct',
          method: 'POST',
          data: JSON.stringify({ type, token }),
        }
        this.$http(options).then(res => {
          let data = res.data
          if (!data.errcode) {

          } else {

          }
        }).catch(e => {
          console.error(e)
        })
      },
      setProductStatus (status, productId) {
        let _this = this
        let options = {
          url: '/setProductStatus',
          method: 'POST',
          data: JSON.stringify({ status, token, productId })
        }
        this.$http(options).then(res => {
          let data = res.data
          if (!data.errcode) {

          } else {

          }
        }).catch(e => {
          console.error(e)
        })
      },
      purchase (good) {
        this.num = 0
        this.selectedGood = good
        this.$root.$emit('bv::show::modal', 'restock_modal')
        let _this = this
        let formData = {
          token,
          productId: good.productId,
          costPrice: good.costPrice,
          num: this.num
        }
        let options = {
          url: '/pirchase',
          method: 'POST',
          data: JSON.stringify(formData)
        }
      },
      hideRestockModal(){
        this.num = 0
        this.selectedGood = null
        this.$root.$emit('bv::hide::modal', 'restock_modal')
      },
      showRestockModal(good){
        this.num = 0
        this.selectedGood = good
        this.$root.$emit('bv::show::modal', 'restock_modal')
      },
      addNum(){
        this.num ++
      },
      reduceNum(){
        if(this.num==0){
          return
        }
        this.num --
      }
    },
    created () {
      this.getGoodsList(0)
    }
  }
</script>
<style scoped>
  .list-group-item span{
    width: 150px;
    display: inline-block;
    color: #676565;
  }
  .num_input{
    width: 45px;
    height: 25px;
    margin: 0;
    display: inline-block;
    text-indent: 5px;
  }
  .num_button{
    font-size: 15px;
    display: inline-block;
    height: 27px;
    width: 27px;
    background-color: #e7e7e7;
    text-align: center;
    line-height: 27px;
    outline: none;
  }
  .num_button:hover{
    cursor: pointer;
  }
  .num_button:active{
    background-color: #666;
    color: #fff;

  }
</style>
