<template>
  <div class="animated fadeIn">
    <b-col md="12">
      <div style="padding: 20px; border: 1px solid #ccc;">
        <b-form-group
          label="名称:"
          label-for="name"
          label-align-sm="left"
          :label-cols="1"
        >
          <b-form-input id="name" v-model.trim="name" ref="name" type="text" autofocus="autofocus"
                        autocomplete="off"></b-form-input>
        </b-form-group>
        <b-form-group
          label="描述:"
          label-for="desc"
          label-align-sm="left"
          :label-cols="1"
        >
          <b-form-input id="desc" v-model.trim="desc" type="text"></b-form-input>
        </b-form-group>
        <b-form-group
          label="零售价格:"
          label-for="retailPrice"
          label-align-sm="left"
          :label-cols="1"
        >
          <b-form-input id="retailPrice" v-model.trim="retailPrice" type="text"></b-form-input>
        </b-form-group>
        <b-form-group
          label="设置级别价:"
          label-for="price"
          label-align-sm="left"
          :label-cols="1"
        >
          <b-button variant="success" @click="openAgencyDialog">点击设置</b-button>
          <b-modal id="price_modal" centered title="设置级别价">
            <p class="my-4" v-if="agencyList.length !==0">
              <b-table hover :items="agencyList" :fields="fields" class="responsive">
                <template slot="sale_price" slot-scope="row">
                  <input type="number" class="price_input" v-model="row.item.sale_price"/>
                </template>
              </b-table>
            </p>
            <p v-else>
              请先到【代理商管理】模块中添加代理级别
            </p>
            <div slot="modal-footer" class="w-100">
              <b-btn size="md" class="float-right" variant="danger"
                     @click="closeAgencyDialog">
                取消
              </b-btn>
              <b-btn size="md" class="float-right" variant="primary" @click="ok">
                确定
              </b-btn>
            </div>
          </b-modal>
        </b-form-group>

        <b-form-group
          label="产品图:"
          label-for="imgUrl"
          label-align-sm="left"
          :label-cols="1"
        >
          <!--<b-form-file
            v-model="imgUrl"
            ref="file-input"
            class="mb-2"
            @change="changeImage($event, 'img')"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            placeholder="选择图片上传..."
          ></b-form-file>-->
          <b-form-input id="imgUrl" v-model.trim="imgUrl" type="text"></b-form-input>
          <div ref="image_holder" id="image_holder">

          </div>
        </b-form-group>
        <b-form-group
          label="缩略图:"
          label-for="headImgUrl"
          label-align-sm="left"
          :label-cols="1"
        >
          <!-- <b-form-file
             v-model="headImgUrl"
             ref="file-input"
             class="mb-2"
             @change="changeImage($event, 'headImg')"
             accept="image/gif,image/jpeg,image/jpg,image/png"
             placeholder="选择图片上传..."
           ></b-form-file>-->
          <b-form-input id="headImgUrl" v-model.trim="headImgUrl" type="text"></b-form-input>
          <div ref="headimage_holder" id="headimage_holder">

          </div>
        </b-form-group>

        <b-form-group
          label="详情图:"
          label-for="detailUrl"
          label-align-sm="left"
          :label-cols="1"
        >
          <!--<b-form-file
            v-model="detailUrl"
            ref="file-input"
            class="mb-2"
            @change="changeImage($event, 'detail')"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            placeholder="选择图片上传..."
          ></b-form-file>-->
          <b-form-input id="detailUrl" v-model.trim="detailUrl" type="text"></b-form-input>
          <div ref="detail_holder" id="detail_holder">

          </div>
        </b-form-group>
        <b-alert
          variant="info"
          dismissible
          :show="hasError"
          @dismissed="hasError=false"
        >{{errmsg}}
        </b-alert>
        <div slot="footer" style="text-align: center">
          <b-button type="submit" size="sm" variant="primary" @click="add"><i class="fa fa-dot-circle-o"></i> 新增
          </b-button>
          <b-button type="reset" size="sm" variant="danger" @click="reset"><i class="fa fa-ban"></i> 重置
          </b-button>
        </div>

      </div>
    </b-col>
  </div>
</template>

<script>
  export default {
    name: 'add',
    data () {
      return {
        name: '',
        desc: '',
        price: {},
        retailPrice: '',
        headImgUrl: null,
        imgUrl: null,
        detailUrl: null,
        agencyList: [],
        hasError: false,
        errmsg: '',
        fields: [
          {
            key: 'id',
            label: '级别'
          },
          {
            key: 'name',
            label: '级别名称'
          },
          {
            key: 'sale_price',
            label: '级别价(元)'
          }
        ]
      }
    },
    methods: {
      changeImage (e, type) {
        if (typeof FileReader == 'undefined') {
          return alert('您的浏览器不支持FileReader')
        }
        var that = this
        var fileLength = e.target.files.length
        if (fileLength > 0) {
          for (var i = 0; i < fileLength; i++) {
            var reader = new FileReader()
            reader.onload = function (e) {
              var img = document.createElement('IMG')
              img.src = this.result
              if (type == 'img') {
                that.$refs['image_holder'].appendChild(img)
              } else if (type == 'headImg') {
                that.$refs['headimage_holder'].appendChild(img)
              } else if (type == 'detail') {
                that.$refs['detail_holder'].appendChild(img)
              }
            }
            reader.readAsDataURL(e.target.files[i])
          }
        }
      },
      openAgencyDialog () {
        this.$root.$emit('bv::show::modal', 'price_modal')
      },
      closeAgencyDialog () {
        this.$root.$emit('bv::hide::modal', 'price_modal')
      },
      getAgencyLevel () {
        const token = window.sessionStorage.getItem('token')
        let _this = this
        let options = {
          method: 'POST',
          data: JSON.stringify({ token }),
          url: '/getAgencyLevel'
        }
        this.$http(options).then(res => {
          let data = res.data
          if (!data.errcode) {
            // code here
            _this.agencyList = data
          } else {
            // error msg code
          }
        }).catch(e => {
          console.error(e)
        })
      },
      ok () {
        let _this = this
        let agencyList = this.agencyList
        const priceList = agencyList.filter(function (item) {
          return item.sale_price
        })
        for (var i = 0; i < priceList.length; i++) {
          this.price[priceList[i].id] = parseInt(priceList[i].sale_price).toFixed(2)
        }
        this.$root.$emit('bv::hide::modal', 'price_modal')
        // var price = this.agencyList.
      },
      add () {
        let name = this.name
        let desc = this.desc
        let retailPrice = this.retailPrice
        let imgUrl = this.imgUrl
        let detailUrl = this.detailUrl
        let headImgUrl = this.headImgUrl
        let price = this.price
        if (name === '' || desc === '' || retailPrice === '' || !imgUrl || !detailUrl || !headImgUrl) {
          return alert('请完整填写商品信息')
        }
        const token = window.sessionStorage.getItem('token')
        let formData = { token, name, desc, retailPrice, imgUrl, detailUrl, headImgUrl, price }
        let options = {
          method: 'post',
          data: JSON.stringify(formData),
          url: '/addProduct'
        }
        this.$http(options).then(res => {
          var data = res.data
          if (!data.errcode) {
            this.errmsg = '添加成功'
          } else {
            this.errmsg = data.errmsg
          }
          this.hasError = true
        }).catch(e => {
          console.error(e)
        })
      },
      reset () {
        this.name = ''
        this.desc = ''
        this.retailPrice = ''
        this.imgUrl = ''
        this.detailUrl = ''
        this.headImgUrl = ''
        this.price = {}
        this.$refs.name.focus()
      }
    },
    created () {
      this.getAgencyLevel()
    }
  }
</script>

<style>
  #headimage_holder, #image_holder {
    width: 100%;
    height: 200px;
  }

  #headimage_holder img, #image_holder img, #detail_holder img {
    display: inline-block;
    padding: 10px;
    background-color: #ccc;
    margin: 5px;
    height: 180px;
    width: 160px;
  }

  .price_input {
    width: 80px;
    outline: none;
    font-size: 13px;
    text-indent: 5px;
  }
</style>
