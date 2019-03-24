<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <img src="static/img/avatars/6.jpg" class="img-avatar" alt="avator">
        </template>
        <b-dropdown-item @click="logout"><i class="fa fa-lock"></i> 退出</b-dropdown-item>
      </b-nav-item-dropdown>
</template>
<script>
  export default {
    name: 'header-dropdown',
    data: () => {
      return { itemsCount: 42 }
    },
    methods: {
      logout () {
        window.sessionStorage.clear()
        this.$router.replace('/')
      }
    }
  }
</script>

