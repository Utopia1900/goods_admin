<template>
  <div class="animated fadeIn">
    <b-col sm="12">
      <div v-if="testData.length === 0">
        <span class="fa fa-info">
          暂无数据!
        </span>
      </div>
      <div v-else>
        <b-table hover :items="testData" :fields="fields" class="responsive">
          <template slot="action" slot-scope="row">
             <span><b-button variant="success" @click="showRestockModal(row.item)">进货</b-button></span>
          </template>
        </b-table>
      </div>
    </b-col>
    <b-modal id="restock_modal" centered title="填写进货信息">
      <p v-if="selectedGood">
         <b-list-group>
           <b-list-group-item><span>商品名：</span>{{selectedGood.name}}</b-list-group-item>
           <b-list-group-item><span>成本价(元/件)：</span>{{selectedGood.cost_price}}</b-list-group-item>
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
  export default {
    name: 'Inventory',
    data(){
      return {
        num: 0,
        selectedGood: null,
        testData:[
          {
            id: '1',
            name: '产品1',
            cost_price: 111,
            inventory: 7
          },
          {
            id: '2',
            name: '产品2',
            cost_price: 222,
            inventory: 19
          },
          {
            id: '3',
            name: '产品3',
            cost_price: 333,
            inventory: 20
          }
        ],
        fields: [
          {
            key: 'name',
            label: '商品名'
          },
          // {
          //   key: 'cost_price',
          //   label: '成本价(元/件)'
          // },
          {
            key: 'inventory',
            label: '库存数量(件)'
          },
          {
            key: 'action',
            label: '操作'
          }
        ]
      }
    },
    methods: {
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
