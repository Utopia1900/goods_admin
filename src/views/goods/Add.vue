<template>
  <div class="animated fadeIn">
    <b-col md="12">
      <b-card>
        <b-form-group
          label="产品名称:"
          label-for="name"
          :label-cols="2"
        >
          <b-form-input id="name" v-model.trim="name" type="text" placeholder="请填写产品名称"></b-form-input>
        </b-form-group>
        <b-form-group
          label="产品描述:"
          label-for="desc"
          :label-cols="2"
        >
          <b-form-input id="desc" v-model.trim="desc" type="text" placeholder="请填写产品描述"></b-form-input>
        </b-form-group>
        <b-form-group
          label="设置价格:"
          label-for="price"
          :label-cols="2"
        >
          <b-form-input id="price" v-model.trim="price" type="text" placeholder="请设置产品价格"></b-form-input>
        </b-form-group>
        <b-form-group
          label="缩略图:"
          label-for="headImgUrl"
          :label-cols="2"
        >
          <div class="pic-container">
             <img :src="headImgUrl" class="upload-img"/>
            <input type="file" id="uppic" name="headImgUrl" accept="image/gif,image/jpeg,image/jpg,image/png"
                   @change="changeImage($event, 'headImg')" ref="headImgUrl" class="uppic" />
          </div>
        </b-form-group>
        <b-form-group
          label="产品图:"
          label-for="imgUrl"
          :label-cols="2"
        >
          <div class="pic-container">
             <img :src="imgUrl" class="upload-img"/>
            <input type="file" id="uppic" name="imgUrl" accept="image/gif,image/jpeg,image/jpg,image/png"
                   @change="changeImage($event, 'img')" ref="avatarInput" class="uppic" />
          </div>
        </b-form-group>
        <div slot="footer">
          <b-button type="submit" size="sm" variant="primary" @click="add"><i class="fa fa-dot-circle-o"></i> 新增</b-button>
          <b-button type="reset" size="sm" variant="danger" @click="reset"><i class="fa fa-ban"></i> 重置</b-button>
        </div>
      </b-card>
    </b-col>
  </div>
</template>

<script>
  export default {
    name: 'add',
    data(){
      return {
        name: '',
        desc: '',
        price: '',
        headImgUrl: null,
        imgUrl: null
      }
    },
    methods: {
      changeImage (e, type) {
        var file = e.target.files[0]
        var reader = new FileReader()
        var that = this
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          switch (type) {
            case 'img':
              console.log('dsdsds')
              that.imgUrl = this.result
              break
            case 'headImg':
              that.headImgUrl = this.result
              break
          }
        }
      },
      add () {
        console.log('add')
      },
      reset () {
        console.log('reset')
      }
    }
  }
</script>

<style scoped>
.uppic{
  height: 3rem;
  width: 6rem;
  margin: 0 auto;
  opacity: 0;
  z-index: 999999;
}
  .upload-img {
    position: absolute;
    width: auto;
    height: 150px;
  }
  .pic-container {
    /*height: 6rem;*/
    /*width: 6rem;*/
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    width: 160px;
    height: 160px;
    border: 1px solid #ededed;
    background:url('../../assets/add.png') center center no-repeat;
  }
</style>
