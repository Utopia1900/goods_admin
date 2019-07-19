<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <div style="display:flex; flex-direction:row; padding: 15px;">
          姓名：
          <input type="text" v-model.trim="name" />
          电话：
          <input type="text" v-model.trim="mobile"/>
          昵称：
          <input type="text" v-model.trim="nickname">
          <button @click="getCustomers(1)">点击查询</button>
        </div>
        <b-card v-if="customerList.length===0">
          <span class="fa fa-info">暂无相关客户</span>
        </b-card>
        <b-card v-else>
          <b-table hover :items="customerList" :fields="fields" class="responsive">


          </b-table>
          <b-col md="6" class="my-1">
            <b-pagination
              :total-rows="total"
              :per-page="perPage"
              v-model="currentPage"
              class="my-0"
            />
          </b-col>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: 'CustomerList',
    data(){
      return {
        name:'',
        mobile:'',
        nickname:'',
        customerList:[],
        perpage: 10,
        total: 1,
        currentPage: 1,
        fields:[
          {
            key: "id",
            label:"ID"
          },
          {
            key: "name",
            label:"姓名"
          },
          {
            key: "nickname",
            label:"微信昵称"
          },
          {
            key: "province",
            label:"所在省份"
          },
          {
            key: "city",
            label: "所在城市"
          },
          {
            key: 'birthday',
            label: "生日"
          }
        ]
      }
    },
    methods:{
      getCustomers(page){
        const token = window.sessionStorage.getItem('token')
        let formData = {token,page}
        if(this.name !=='') formData.name = this.name
        if(this.mobile !== '') formData.mobile = this.mobile
        if(this.nickname !=='') formData.nickname = this.nickname
        let options = {
          url:"/customer",
          method:"POST",
          data:JSON.stringify(formData)
        }
        this.currentPage = page
        this.$http(options).then(res=>{
          var data = res.data
          if(!data.errcode) {
            this.customerList = data.rows
            this.total = data.total
          } else {
            console.log(data.errmsg)
            alert(data.errmsg)
          }
        }).catch(e => {
          console.error(e)
        })
      }
    },
    created(){
      this.getCustomers(1)
    },
    watch:{
      currentPage: function(val) {
      this.customerList = this.getCustomers(val);
    },
    }
  }
</script>

<style scoped>

</style>
