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
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  },
  methods: {
    formatNumber (value) {
      return (Number(value) / 100).toFixed(2)
    }
  },
  created () {
    this.nav = nav.items
  }
}
</script>
<style>
  .left_label{
    padding-right: 50px;
  }
</style>
