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
          <b-form-input id="name" v-model.trim="name" type="text" autofocus="autofocus"
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
          label="价格:"
          label-for="price"
          label-align-sm="left"
          :label-cols="1"
        >
          <b-button variant="success" @click="$root.$emit('bv::show::modal', 'price_modal')">点击设置</b-button>
          <b-modal id="price_modal" centered title="设置价格">
            <p class="my-4">
              <b-table hover :items="agencyList" :fields="fields" class="responsive">
                <template slot="retail_price" slot-scope="row">
                  <input type="number" class="price_input" v-model="row.item.retail_price"/>
                </template>
                <template slot="sale_price" slot-scope="row">
                  <input type="number" class="price_input" v-model="row.item.sale_price"/>
                </template>
              </b-table>
            </p>
            <div slot="modal-footer" class="w-100">
              <b-btn size="md" class="float-right" variant="danger"
                     @click="$root.$emit('bv::hide::modal', 'price_modal')">
                取消
              </b-btn>
              <b-btn size="md" class="float-right" variant="primary" @click="ok">
                确定
              </b-btn>
            </div>
          </b-modal>
        </b-form-group>

        <b-form-group
          label="缩略图:"
          label-for="headImgUrl"
          label-align-sm="left"
          :label-cols="1"
        >
          <b-form-file
            v-model="headImgUrl"
            ref="file-input"
            class="mb-2"
            @change="changeImage($event, 'headImg')"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            placeholder="选择图片上传..."
          ></b-form-file>
          <div ref="headimage_holder" id="headimage_holder">

          </div>
        </b-form-group>
        <b-form-group
          label="产品图:"
          label-for="imgUrl"
          label-align-sm="left"
          :label-cols="1"
        >
          <b-form-file
            v-model="imgUrl"
            ref="file-input"
            class="mb-2"
            @change="changeImage($event, 'img')"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            placeholder="选择图片上传..."
          ></b-form-file>
          <div ref="image_holder" id="image_holder">

          </div>
        </b-form-group>
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
        price: '',
        headImgUrl: null,
        imgUrl: null,
        agencyList: [
          {name: '代理级别0'},
          {name: '代理级别1'},
          {name: '代理级别2'}
        ],
        fields: [
          {
            key: 'name',
            label: '级别'
          },
          {
            key: 'retail_price',
            label: '零售价(元)'
          },
          {
            key: 'sale_price',
            label: '销售价(元)'
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
              }
            }
            reader.readAsDataURL(e.target.files[i])
          }
        }
      },
      ok () {
        return alert('确定提交吗?')
      },
      add () {
        console.log(this.imgUrl.name)
      },
      reset () {
        console.log('reset')
      }
    }
  }
</script>

<style>
  #headimage_holder, #image_holder {
    width: 100%;
    height: 200px;
  }

  #headimage_holder img, #image_holder img {
    display: inline-block;
    padding: 10px;
    background-color: #ccc;
    margin: 5px;
    height: 180px;
    width: 160px;
  }
  .price_input {
    width: 80px;outline: none;font-size: 13px;text-indent: 5px;
  }
</style>
