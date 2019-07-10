<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid-bak">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import nav from '../_nav'
import { Header as AppHeader, Sidebar, Breadcrumb } from '../components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    Breadcrumb
  },
  data () {
    return {
      nav: [],
      userInfo: {}
    }
  },
  computed: {
    list () {
      return this.$route.matched
    }
  },
  methods:{
     getAgencyLevel () {
        const token = window.sessionStorage.getItem('token')
        let options = {
          method: 'POST',
          data: JSON.stringify({ token }),
          url: '/getAgencyLevel'
        }
        this.$http(options).then(res => {
          let data = res.data
          if (!data.errcode) {
            if(data.length > 0){
              let obj = {}
              for(let i =0; i< data.length; i++){
                obj[data[i].id] = data[i].name
              }
              window.sessionStorage.setItem('agency', JSON.stringify(obj))
            }
          } else {
            // error code here
          }
        }).catch(e => {
          console.error(e)
        })
      } 
  },
  created () {
    this.nav = nav.items
    this.getAgencyLevel()
  }
}
</script>
<style>
  .left_label{
    padding-right: 50px;
  }
</style>
