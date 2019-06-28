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
            <tempalte slot="imgUrl" slot-scope="row">
              <span><img :src=row.item.imgUrl alt="img"></span>
            </tempalte>
            <template slot="action" slot-scope="row">
              <span><b-button variant="success" @click="setProductStatus(1, row.item.id)">下架</b-button></span>
              <span><b-button variant="danger" @click="openPurcaseModal(row.item)">采购</b-button></span>
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
              <span><b-button variant="success" @click="setProductStatus(0, row.item.id)">上架</b-button></span>
              <span><b-button variant="danger" @click="openPurcaseModal(row.item)">采购</b-button></span>
            </template>
          </b-table>
        </div>
      </b-tab>
    </b-tabs>
    <b-alert
      variant="info"
      dismissible
      :show="hasError"
      @dismissed="hasError=false"
    >{{errmsg}}
    </b-alert>
    <b-modal id="restock_modal" centered title="填写采购信息">
      <p v-if="selectedGood">
        <b-list-group>
          <b-list-group-item><span>商品名：</span>{{selectedGood.name}}</b-list-group-item>
          <b-list-group-item><span>成本价(元/件)：</span>
            <input type="text" v-model.trim="costPrice" />
          </b-list-group-item>
          <b-list-group-item>
            <span>选择采购数量(件)：</span>
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
        <b-btn size="md" class="float-right" variant="primary" @click="purchase(selectedGood)">
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
        goodsList: [],
        num: 0,
        selectedGood: null,
        hasError: false,
        errmsg: '',
        productId: null,
        costPrice: '',
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
            key: 'retailPrice',
            label: '零售价',
            class: 'retailPrice'
          },
          {
            key: 'price',
            label: '级别价',
            class: 'price'
          },
          {
            key: 'inventory',
            label: '库存(件)',
            class: 'inventory'
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
            _this.goodsList = data
          } else {

          }
        }).catch(e => {
          console.error(e)
        })
      },
      setProductStatus (status, productId) {
        let options = {
          url: '/setProductStatus',
          method: 'POST',
          data: JSON.stringify({ status, token, productId })
        }
        this.$http(options).then(res => {
          let data = res.data
          if (!data.errcode) {
            if (status === 0) {
              this.errmsg = '上架成功'
            } else if (status === 1) {
              this.errmsg = '下架成功'
            }
            this.goodsList = this.goodsList.filter(item => {
              return item.id !== productId
            })
          } else {
            this.errmsg = data.errmsg
          }
          this.hasError = true
          setTimeout(() => {
            this.hasError = false
            this.errmsg = ''
          }, 1500)
        }).catch(e => {
          console.error(e)
        })
      },
      openPurcaseModal (good) {
        this.num = 0
        this.costPrice = ''
        this.selectedGood = good
        this.$root.$emit('bv::show::modal', 'restock_modal')
      },
      purchase (selectedGood) {
        if (this.num === 0) return alert('请选择采购数量')
        if(!this.costPrice) return alert('请填写成本价')
        let formData = {
          token,
          productId: selectedGood.id,
          costPrice: this.costPrice,
          num: this.num,
          entryDate: '20190630'
        }
        let options = {
          url: '/purchase',
          method: 'post',
          data: JSON.stringify(formData)
        }

        this.$http(options).then(res => {
          var data = res.data
          if (!data.errcode) {
            this.errmsg = '采购成功'
            this.hideRestockModal()
            selectedGood.inventory += this.num
            this.hasError = true
            setTimeout(() => {
              this.hasError = false
              this.errmsg = ''
            }, 1500)
          } else {
            alert(data.errmsg)
          }
        }).catch(e => {
          console.error(e)
        })
      },
      hideRestockModal () {
        this.$root.$emit('bv::hide::modal', 'restock_modal')
      },
      addNum () {
        this.num++
      },
      reduceNum () {
        if (this.num === 0) return
        this.num--
      }
    },
    created () {
      this.getGoodsList(0)
    }
  }
</script>
<style scoped>
  .list-group-item span {
    width: 150px;
    display: inline-block;
    color: #676565;
  }

  .num_input {
    width: 45px;
    height: 25px;
    margin: 0;
    display: inline-block;
    text-indent: 5px;
  }

  .num_button {
    font-size: 15px;
    display: inline-block;
    height: 27px;
    width: 27px;
    background-color: #e7e7e7;
    text-align: center;
    line-height: 27px;
    outline: none;
  }

  .num_button:hover {
    cursor: pointer;
  }

  .num_button:active {
    background-color: #666;
    color: #fff;

  }
</style>
